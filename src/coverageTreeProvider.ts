import * as vscode from 'vscode';
import * as path from 'path';
import { parseCoverageSummary, getOverallPct } from './coverageParser';
import { CoverageSummary, CoverageStatus } from './types';

interface FileInfo {
  name: string;
  fsPath: string;
  relPath: string;
  pct: number;
  status: CoverageStatus;
  lines: number;
  functions: number;
  branches: number;
  statements: number;
}

interface FolderNode {
  name: string;
  subfolders: Map<string, FolderNode>;
  files: FileInfo[];
}

function statusIcon(status: CoverageStatus): vscode.ThemeIcon {
  switch (status) {
    case 'passing':
      return new vscode.ThemeIcon('circle-filled', new vscode.ThemeColor('testing.iconPassed'));
    case 'warning':
      return new vscode.ThemeIcon('circle-filled', new vscode.ThemeColor('list.warningForeground'));
    case 'failing':
      return new vscode.ThemeIcon('circle-filled', new vscode.ThemeColor('testing.iconFailed'));
    case 'none':
      return new vscode.ThemeIcon('circle-outline');
  }
}

export class CoverageTreeItem extends vscode.TreeItem {
  constructor(
    label: string,
    public readonly children: CoverageTreeItem[] = [],
    options?: {
      pct?: number;
      status?: CoverageStatus;
      fsPath?: string;
      tooltip?: vscode.MarkdownString | string;
    }
  ) {
    super(
      label,
      children.length > 0
        ? vscode.TreeItemCollapsibleState.Expanded
        : vscode.TreeItemCollapsibleState.None
    );

    if (options?.pct !== undefined) {
      this.description = `${options.pct.toFixed(1)}%`;
    }

    if (options?.status !== undefined) {
      this.iconPath = statusIcon(options.status);
    } else if (children.length > 0) {
      this.iconPath = vscode.ThemeIcon.Folder;
    }

    if (options?.fsPath) {
      this.command = {
        command: 'vscode.open',
        title: 'Open File',
        arguments: [vscode.Uri.file(options.fsPath)],
      };
      this.resourceUri = vscode.Uri.file(options.fsPath);
    }

    if (options?.tooltip) {
      this.tooltip = options.tooltip;
    }
  }
}

export class CoverageTreeProvider
  implements vscode.TreeDataProvider<CoverageTreeItem>, vscode.Disposable
{
  private readonly _onDidChangeTreeData = new vscode.EventEmitter<void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  private readonly coverageMap = new Map<string, CoverageSummary | null>();
  private threshold: number;
  private disposed = false;

  constructor() {
    this.threshold = this.getThreshold();
  }

  addRoot(root: string): void {
    this.coverageMap.set(root, this.readCoverage(root));
    this._onDidChangeTreeData.fire();
  }

  removeRoot(root: string): void {
    this.coverageMap.delete(root);
    this._onDidChangeTreeData.fire();
  }

  refresh(root?: string): void {
    this.threshold = this.getThreshold();
    if (root) {
      this.coverageMap.set(root, this.readCoverage(root));
    } else {
      for (const r of this.coverageMap.keys()) {
        this.coverageMap.set(r, this.readCoverage(r));
      }
    }
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: CoverageTreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: CoverageTreeItem): CoverageTreeItem[] {
    if (element) {
      return element.children;
    }

    const roots = [...this.coverageMap.keys()];
    if (roots.length === 0) {
      return [new CoverageTreeItem('No workspace folders open')];
    }

    const allEmpty = roots.every((r) => !this.coverageMap.get(r));
    if (allEmpty) {
      return [new CoverageTreeItem('No coverage data — run tests with --coverage')];
    }

    if (roots.length > 1) {
      return roots.map((root) => {
        const coverage = this.coverageMap.get(root);
        const children = coverage ? this.buildFolderItems(root, coverage) : [];
        const pct = coverage ? getOverallPct(coverage.total) : undefined;
        return new CoverageTreeItem(path.basename(root), children, {
          pct,
          status: pct !== undefined ? this.pctToStatus(pct) : 'none',
        });
      });
    }

    const root = roots[0];
    const coverage = this.coverageMap.get(root);
    if (!coverage) {
      return [new CoverageTreeItem('No coverage data — run tests with --coverage')];
    }
    return this.buildFolderItems(root, coverage);
  }

  private buildFolderItems(workspaceRoot: string, coverage: CoverageSummary): CoverageTreeItem[] {
    const files = this.collectFiles(workspaceRoot, coverage);
    const tree = this.groupIntoTree(files);
    return this.renderNode(tree);
  }

  private collectFiles(workspaceRoot: string, coverage: CoverageSummary): FileInfo[] {
    const files: FileInfo[] = [];
    for (const [filePath, fileCoverage] of Object.entries(coverage)) {
      if (filePath === 'total') {
        continue;
      }
      let relPath = path.relative(workspaceRoot, filePath);
      if (relPath.startsWith('..')) {
        relPath = path.relative(workspaceRoot.replace(/\\/g, '/'), filePath.replace(/\\/g, '/'));
      }
      if (relPath.startsWith('..')) {
        continue;
      }
      const pct = getOverallPct(fileCoverage);
      files.push({
        name: path.basename(relPath),
        fsPath: filePath,
        relPath,
        pct,
        status: this.pctToStatus(pct),
        lines: fileCoverage.lines.pct,
        functions: fileCoverage.functions.pct,
        branches: fileCoverage.branches.pct,
        statements: fileCoverage.statements.pct,
      });
    }
    return files;
  }

  private groupIntoTree(files: FileInfo[]): FolderNode {
    const root: FolderNode = { name: '', subfolders: new Map(), files: [] };
    for (const file of files) {
      const parts = file.relPath.replace(/\\/g, '/').split('/');
      let node = root;
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!node.subfolders.has(part)) {
          node.subfolders.set(part, { name: part, subfolders: new Map(), files: [] });
        }
        node = node.subfolders.get(part)!;
      }
      node.files.push(file);
    }
    return root;
  }

  private renderNode(node: FolderNode): CoverageTreeItem[] {
    const items: CoverageTreeItem[] = [];

    const sortedFolders = [...node.subfolders.values()].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    for (const subfolder of sortedFolders) {
      const children = this.renderNode(subfolder);
      const allFiles = this.allFilesIn(subfolder);
      const avgPct =
        allFiles.length > 0 ? allFiles.reduce((s, f) => s + f.pct, 0) / allFiles.length : 0;
      items.push(
        new CoverageTreeItem(subfolder.name, children, {
          pct: avgPct,
          status: this.pctToStatus(avgPct),
        })
      );
    }

    const sortedFiles = [...node.files].sort((a, b) => a.name.localeCompare(b.name));
    for (const file of sortedFiles) {
      items.push(this.makeFileItem(file));
    }

    return items;
  }

  private allFilesIn(node: FolderNode): FileInfo[] {
    const files = [...node.files];
    for (const sub of node.subfolders.values()) {
      files.push(...this.allFilesIn(sub));
    }
    return files;
  }

  private makeFileItem(file: FileInfo): CoverageTreeItem {
    const tooltip = this.buildTooltip(file.name, file.pct, {
      Lines: file.lines,
      Functions: file.functions,
      Branches: file.branches,
      Statements: file.statements,
    });
    return new CoverageTreeItem(file.name, [], {
      pct: file.pct,
      status: file.status,
      fsPath: file.fsPath,
      tooltip,
    });
  }

  private buildTooltip(
    name: string,
    overall: number,
    metrics: Record<string, number>
  ): vscode.MarkdownString {
    const colorFor = (pct: number): string => {
      if (pct >= this.threshold) {
        return '#4ec94e';
      }
      if (pct >= this.threshold * 0.75) {
        return '#cca700';
      }
      return '#f14c4c';
    };

    const rows = Object.entries(metrics)
      .map(
        ([label, pct]) =>
          `<tr>` +
          `<td style="padding-right:12px">${label}</td>` +
          `<td style="text-align:right;color:${colorFor(pct)}"><b>${pct}%</b></td>` +
          `</tr>`
      )
      .join('');

    const md = new vscode.MarkdownString(
      `<b>${name}</b> &nbsp;—&nbsp; <b style="color:${colorFor(overall)}">${overall.toFixed(1)}%</b>` +
        `<br><br><table>${rows}</table>`,
      true
    );
    md.supportHtml = true;
    return md;
  }

  private pctToStatus(pct: number): CoverageStatus {
    return pct >= this.threshold ? 'passing' : 'warning';
  }

  private readCoverage(root: string): CoverageSummary | null {
    const configured = vscode.workspace
      .getConfiguration('covertree')
      .get<string>('coverageFile', 'coverage/coverage-summary.json');
    const filePath = path.isAbsolute(configured) ? configured : path.join(root, configured);
    return parseCoverageSummary(filePath);
  }

  private getThreshold(): number {
    return vscode.workspace.getConfiguration('covertree').get<number>('threshold', 75);
  }

  dispose(): void {
    if (this.disposed) {
      return;
    }
    this.disposed = true;
    this._onDidChangeTreeData.dispose();
  }
}
