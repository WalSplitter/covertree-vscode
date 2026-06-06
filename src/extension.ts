import * as vscode from 'vscode';
import { CoverTreeProvider } from './coverageProvider';

export function activate(context: vscode.ExtensionContext): void {
  const folders = vscode.workspace.workspaceFolders;
  if (!folders?.length) {
    return;
  }

  const workspaceRoot = folders[0].uri.fsPath;
  const provider = new CoverTreeProvider(workspaceRoot);

  context.subscriptions.push(
    vscode.window.registerFileDecorationProvider(provider),

    vscode.commands.registerCommand('covertree.refresh', () => {
      provider.refresh();
      vscode.window.showInformationMessage('CoverTree: Coverage refreshed.');
    }),

    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('covertree')) {
        provider.refresh();
      }
    }),

    provider
  );
}

export function deactivate(): void {}
