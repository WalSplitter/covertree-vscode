import * as vscode from 'vscode';
import * as path from 'path';
import { parseCoverageSummary, getFileCoverage, getOverallPct } from './coverageParser';
import { CoverageSummary, CoverageStatus, FileCoverage } from './types';

const WATCHED_EXTENSIONS = /\.(ts|tsx|js|jsx|mjs|cjs)$/;
const TEST_FILE = /\.(test|spec)\.(ts|tsx|js|jsx|mjs|cjs)$/i;
const CONFIG_FILE = /\.(config|rc)\.(ts|tsx|js|jsx|mjs|cjs)$/i;

export class CoverTreeProvider implements vscode.FileDecorationProvider, vscode.Disposable {
  private readonly _onDidChangeFileDecorations = new vscode.EventEmitter<
    vscode.Uri | vscode.Uri[] | undefined
  >();
  readonly onDidChangeFileDecorations = this._onDidChangeFileDecorations.event;

  private coverage: CoverageSummary | null = null;
  private readonly failedFiles = new Set<string>();
  private watcher: vscode.FileSystemWatcher | undefined;
  private threshold: number;
  private readonly statusBar: vscode.StatusBarItem;
  private disposed = false;

  constructor(private readonly workspaceRoot: string) {
    this.threshold = this.getThreshold();
    this.statusBar = vscode.window.createStatusBarItem(
      `covertree.${path.basename(workspaceRoot)}`,
      vscode.StatusBarAlignment.Left,
      10
    );
    this.statusBar.command = 'covertree.refresh';
    this.refresh();
    this.startWatching();
  }

  // ── Public API ────────────────────────────────────────────────────────────

  refresh(): void {
    this.threshold = this.getThreshold();
    this.coverage = parseCoverageSummary(this.getCoverageFilePath());
    this._onDidChangeFileDecorations.fire(undefined);
    this.updateStatusBar();
  }

  markTestFailure(absoluteFilePath: string): void {
    this.failedFiles.add(absoluteFilePath);
    this._onDidChangeFileDecorations.fire(vscode.Uri.file(absoluteFilePath));
  }

  clearTestFailures(): void {
    const affected = [...this.failedFiles].map((f) => vscode.Uri.file(f));
    this.failedFiles.clear();
    this._onDidChangeFileDecorations.fire(affected);
  }

  // ── FileDecorationProvider ────────────────────────────────────────────────

  provideFileDecoration(uri: vscode.Uri): vscode.FileDecoration | undefined {
    if (!WATCHED_EXTENSIONS.test(uri.fsPath)) {
      return undefined;
    }
    if (TEST_FILE.test(uri.fsPath) || CONFIG_FILE.test(uri.fsPath)) {
      return undefined;
    }

    const { status, coverage } = this.resolveStatus(uri.fsPath);
    const detail = coverage
      ? `\nLines: ${coverage.lines.pct}% | Fn: ${coverage.functions.pct}% | Branches: ${coverage.branches.pct}% | Stmts: ${coverage.statements.pct}%`
      : '';

    switch (status) {
      case 'none':
        return {
          badge: '🔘',
          tooltip: 'CoverTree: No coverage data',
          propagate: false,
        };
      case 'passing':
        return {
          badge: '🟢',
          tooltip: `CoverTree: Coverage ≥ ${this.threshold}%${detail}`,
          propagate: false,
        };
      case 'warning':
        return {
          badge: '🟡',
          tooltip: `CoverTree: Coverage below ${this.threshold}%${detail}`,
          propagate: false,
        };
      case 'failing':
        return {
          badge: '❌',
          tooltip: `CoverTree: Test failures detected${detail}`,
          propagate: false,
        };
    }
  }

  // ── Private ───────────────────────────────────────────────────────────────

  private resolveStatus(fsPath: string): { status: CoverageStatus; coverage: FileCoverage | null } {
    if (this.failedFiles.has(fsPath)) {
      return { status: 'failing', coverage: null };
    }
    if (!this.coverage) {
      return { status: 'none', coverage: null };
    }

    const fileCoverage = getFileCoverage(this.coverage, fsPath);
    if (!fileCoverage) {
      return { status: 'none', coverage: null };
    }

    const status = getOverallPct(fileCoverage) >= this.threshold ? 'passing' : 'warning';
    return { status, coverage: fileCoverage };
  }

  private updateStatusBar(): void {
    if (!this.coverage) {
      this.statusBar.text = '$(shield) --';
      this.statusBar.tooltip = 'CoverTree: No coverage data — click to refresh';
    } else {
      const pct = getOverallPct(this.coverage.total);
      this.statusBar.text = `$(shield) ${pct.toFixed(1)}%`;
      this.statusBar.tooltip = `CoverTree: Overall coverage ${pct.toFixed(1)}% — click to refresh`;
    }
    this.statusBar.show();
  }

  private getCoverageFilePath(): string {
    const configured = vscode.workspace
      .getConfiguration('covertree')
      .get<string>('coverageFile', 'coverage/coverage-summary.json');

    return path.isAbsolute(configured) ? configured : path.join(this.workspaceRoot, configured);
  }

  private getThreshold(): number {
    return vscode.workspace.getConfiguration('covertree').get<number>('threshold', 75);
  }

  private startWatching(): void {
    const configuredPath = this.getCoverageFilePath();
    const relativePath = path.relative(this.workspaceRoot, configuredPath);
    const pattern = new vscode.RelativePattern(this.workspaceRoot, relativePath);
    this.watcher = vscode.workspace.createFileSystemWatcher(pattern);
    this.watcher.onDidChange(() => this.refresh());
    this.watcher.onDidCreate(() => this.refresh());
    this.watcher.onDidDelete(() => {
      this.coverage = null;
      this._onDidChangeFileDecorations.fire(undefined);
      this.updateStatusBar();
    });
  }

  dispose(): void {
    if (this.disposed) {
      return;
    }
    this.disposed = true;
    this.watcher?.dispose();
    this.statusBar.dispose();
    this._onDidChangeFileDecorations.dispose();
  }
}
