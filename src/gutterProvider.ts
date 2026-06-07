import * as vscode from 'vscode';
import * as path from 'path';
import {
  parseDetailCoverage,
  getLineCoverageMap,
  getDetailFileCoverage,
  DetailCoverage,
} from './detailParser';

export class GutterProvider implements vscode.Disposable {
  private readonly coveredType: vscode.TextEditorDecorationType;
  private readonly uncoveredType: vscode.TextEditorDecorationType;
  private readonly partialType: vscode.TextEditorDecorationType;
  private detail: DetailCoverage | null = null;
  private readonly disposables: vscode.Disposable[] = [];
  private disposed = false;

  constructor(
    private readonly workspaceRoot: string,
    context: vscode.ExtensionContext
  ) {
    this.coveredType = vscode.window.createTextEditorDecorationType({
      gutterIconPath: context.asAbsolutePath('resources/covered.svg'),
      gutterIconSize: 'contain',
      overviewRulerColor: 'rgba(78, 201, 78, 0.7)',
      overviewRulerLane: vscode.OverviewRulerLane.Left,
    });
    this.uncoveredType = vscode.window.createTextEditorDecorationType({
      gutterIconPath: context.asAbsolutePath('resources/uncovered.svg'),
      gutterIconSize: 'contain',
      overviewRulerColor: 'rgba(241, 76, 76, 0.7)',
      overviewRulerLane: vscode.OverviewRulerLane.Left,
    });
    this.partialType = vscode.window.createTextEditorDecorationType({
      gutterIconPath: context.asAbsolutePath('resources/partial.svg'),
      gutterIconSize: 'contain',
      overviewRulerColor: 'rgba(204, 167, 0, 0.7)',
      overviewRulerLane: vscode.OverviewRulerLane.Left,
    });

    const detailPath = this.getDetailFilePath();
    const relativePath = path.relative(workspaceRoot, detailPath);
    const watcher = vscode.workspace.createFileSystemWatcher(
      new vscode.RelativePattern(workspaceRoot, relativePath)
    );
    this.disposables.push(
      watcher,
      watcher.onDidChange(() => this.refresh()),
      watcher.onDidCreate(() => this.refresh()),
      watcher.onDidDelete(() => {
        this.detail = null;
        this.clearAll();
      }),
      vscode.window.onDidChangeActiveTextEditor((e) => {
        if (e) {
          this.applyToEditor(e);
        }
      }),
      vscode.workspace.onDidOpenTextDocument(() => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
          this.applyToEditor(editor);
        }
      })
    );

    this.refresh();
  }

  refresh(): void {
    if (!vscode.workspace.getConfiguration('covertree').get<boolean>('showGutterMarkers', true)) {
      this.clearAll();
      return;
    }
    this.detail = parseDetailCoverage(this.getDetailFilePath());
    for (const editor of vscode.window.visibleTextEditors) {
      this.applyToEditor(editor);
    }
  }

  private applyToEditor(editor: vscode.TextEditor): void {
    if (!this.detail) {
      this.clearEditor(editor);
      return;
    }

    const fileData = getDetailFileCoverage(this.detail, editor.document.uri.fsPath);
    if (!fileData) {
      this.clearEditor(editor);
      return;
    }

    const lineMap = getLineCoverageMap(fileData);
    const covered: vscode.Range[] = [];
    const uncovered: vscode.Range[] = [];
    const partial: vscode.Range[] = [];

    for (const [line, status] of lineMap) {
      const range = new vscode.Range(line - 1, 0, line - 1, 0);
      if (status === 'covered') {
        covered.push(range);
      } else if (status === 'uncovered') {
        uncovered.push(range);
      } else {
        partial.push(range);
      }
    }

    editor.setDecorations(this.coveredType, covered);
    editor.setDecorations(this.uncoveredType, uncovered);
    editor.setDecorations(this.partialType, partial);
  }

  private clearEditor(editor: vscode.TextEditor): void {
    editor.setDecorations(this.coveredType, []);
    editor.setDecorations(this.uncoveredType, []);
    editor.setDecorations(this.partialType, []);
  }

  private clearAll(): void {
    for (const editor of vscode.window.visibleTextEditors) {
      this.clearEditor(editor);
    }
  }

  getUncoveredLines(fsPath: string): number[] {
    if (!this.detail) {
      return [];
    }
    const fileData = getDetailFileCoverage(this.detail, fsPath);
    if (!fileData) {
      return [];
    }
    return [...getLineCoverageMap(fileData).entries()]
      .filter(([, status]) => status === 'uncovered')
      .map(([line]) => line)
      .sort((a, b) => a - b);
  }

  private getDetailFilePath(): string {
    const configured = vscode.workspace
      .getConfiguration('covertree')
      .get<string>('detailFile', 'coverage/coverage-final.json');
    return path.isAbsolute(configured) ? configured : path.join(this.workspaceRoot, configured);
  }

  dispose(): void {
    if (this.disposed) {
      return;
    }
    this.disposed = true;
    this.coveredType.dispose();
    this.uncoveredType.dispose();
    this.partialType.dispose();
    this.disposables.forEach((d) => d.dispose());
  }
}
