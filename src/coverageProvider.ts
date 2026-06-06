import * as vscode from 'vscode';
import * as path from 'path';
import { parseCoverageSummary, getFileCoverage, getOverallPct } from './coverageParser';
import { CoverageSummary, CoverageStatus } from './types';

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

  constructor(private readonly workspaceRoot: string) {
    this.threshold = this.getThreshold();
    this.refresh();
    this.startWatching();
  }

  // ── Public API ────────────────────────────────────────────────────────────

  refresh(): void {
    this.threshold = this.getThreshold();
    this.coverage = parseCoverageSummary(this.getCoverageFilePath());
    this._onDidChangeFileDecorations.fire(undefined);
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

    switch (this.resolveStatus(uri.fsPath)) {
      case 'none':
        return {
          badge: '○',
          tooltip: 'CoverTree: No coverage data',
          color: new vscode.ThemeColor('disabledForeground'),
          propagate: false,
        };
      case 'passing':
        return {
          badge: '●',
          tooltip: `CoverTree: Coverage ≥ ${this.threshold}%`,
          color: new vscode.ThemeColor('testing.iconPassed'),
          propagate: false,
        };
      case 'failing':
        return {
          badge: '✗',
          tooltip: `CoverTree: Coverage below ${this.threshold}% or test failures`,
          color: new vscode.ThemeColor('testing.iconFailed'),
          propagate: false,
        };
    }
  }

  // ── Private ───────────────────────────────────────────────────────────────

  private resolveStatus(fsPath: string): CoverageStatus {
    if (this.failedFiles.has(fsPath)) {
      return 'failing';
    }
    if (!this.coverage) {
      return 'none';
    }

    const fileCoverage = getFileCoverage(this.coverage, fsPath);
    if (!fileCoverage) {
      return 'none';
    }

    return getOverallPct(fileCoverage) >= this.threshold ? 'passing' : 'failing';
  }

  private getCoverageFilePath(): string {
    const configured = vscode.workspace
      .getConfiguration('covertree')
      .get<string>('coverageFile', 'coverage/coverage-summary.json');

    return path.isAbsolute(configured)
      ? configured
      : path.join(this.workspaceRoot, configured);
  }

  private getThreshold(): number {
    return vscode.workspace.getConfiguration('covertree').get<number>('threshold', 75);
  }

  private startWatching(): void {
    const pattern = new vscode.RelativePattern(
      this.workspaceRoot,
      'coverage/coverage-summary.json'
    );
    this.watcher = vscode.workspace.createFileSystemWatcher(pattern);
    this.watcher.onDidChange(() => this.refresh());
    this.watcher.onDidCreate(() => this.refresh());
    this.watcher.onDidDelete(() => {
      this.coverage = null;
      this._onDidChangeFileDecorations.fire(undefined);
    });
  }

  dispose(): void {
    this.watcher?.dispose();
    this._onDidChangeFileDecorations.dispose();
  }
}
