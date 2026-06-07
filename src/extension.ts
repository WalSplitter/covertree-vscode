import * as vscode from 'vscode';
import { CoverTreeProvider } from './coverageProvider';
import { GutterProvider } from './gutterProvider';

export function activate(context: vscode.ExtensionContext): void {
  const coverageProviders = new Map<string, CoverTreeProvider>();
  const gutterProviders = new Map<string, GutterProvider>();
  const decoSubscriptions = new Map<string, vscode.Disposable>();

  function addFolder(folder: vscode.WorkspaceFolder): void {
    const root = folder.uri.fsPath;
    const coverage = new CoverTreeProvider(root);
    const gutter = new GutterProvider(root, context);
    const decoSub = vscode.window.registerFileDecorationProvider(coverage);
    coverageProviders.set(root, coverage);
    gutterProviders.set(root, gutter);
    decoSubscriptions.set(root, decoSub);
  }

  function removeFolder(folder: vscode.WorkspaceFolder): void {
    const root = folder.uri.fsPath;
    coverageProviders.get(root)?.dispose();
    gutterProviders.get(root)?.dispose();
    decoSubscriptions.get(root)?.dispose();
    coverageProviders.delete(root);
    gutterProviders.delete(root);
    decoSubscriptions.delete(root);
  }

  for (const folder of vscode.workspace.workspaceFolders ?? []) {
    addFolder(folder);
  }

  function navigateUncovered(direction: 'next' | 'prev'): void {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }
    const folder = vscode.workspace.getWorkspaceFolder(editor.document.uri);
    const gutter = folder ? gutterProviders.get(folder.uri.fsPath) : undefined;
    if (!gutter) {
      vscode.window.showInformationMessage('CoverTree: No coverage data for this file.');
      return;
    }
    const lines = gutter.getUncoveredLines(editor.document.uri.fsPath);
    if (lines.length === 0) {
      vscode.window.showInformationMessage('CoverTree: No uncovered lines in this file.');
      return;
    }
    const current = editor.selection.active.line + 1; // 1-indexed
    const target =
      direction === 'next'
        ? (lines.find((l) => l > current) ?? lines[0])
        : ([...lines].reverse().find((l) => l < current) ?? lines[lines.length - 1]);
    const pos = new vscode.Position(target - 1, 0);
    editor.selection = new vscode.Selection(pos, pos);
    editor.revealRange(
      new vscode.Range(pos, pos),
      vscode.TextEditorRevealType.InCenterIfOutsideViewport
    );
  }

  context.subscriptions.push(
    vscode.commands.registerCommand('covertree.nextUncoveredLine', () => navigateUncovered('next')),
    vscode.commands.registerCommand('covertree.prevUncoveredLine', () => navigateUncovered('prev')),

    vscode.commands.registerCommand('covertree.refresh', () => {
      for (const p of coverageProviders.values()) {
        p.refresh();
      }
      for (const g of gutterProviders.values()) {
        g.refresh();
      }
      vscode.window.showInformationMessage('CoverTree: Coverage refreshed.');
    }),

    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('covertree')) {
        for (const p of coverageProviders.values()) {
          p.refresh();
        }
        for (const g of gutterProviders.values()) {
          g.refresh();
        }
      }
    }),

    vscode.workspace.onDidChangeWorkspaceFolders((e) => {
      for (const folder of e.added) {
        addFolder(folder);
      }
      for (const folder of e.removed) {
        removeFolder(folder);
      }
    }),

    new vscode.Disposable(() => {
      for (const p of coverageProviders.values()) {
        p.dispose();
      }
      for (const g of gutterProviders.values()) {
        g.dispose();
      }
      for (const s of decoSubscriptions.values()) {
        s.dispose();
      }
    })
  );
}

export function deactivate(): void {}
