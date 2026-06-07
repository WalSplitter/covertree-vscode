import * as fs from 'fs';
import { CoverageSummary, FileCoverage } from './types';

/**
 * Reads and parses a Jest coverage-summary.json file.
 * Returns null if the file doesn't exist or is malformed.
 */
export function parseCoverageSummary(filePath: string): CoverageSummary | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as CoverageSummary;
  } catch {
    return null;
  }
}

/**
 * Looks up coverage data for a file by its absolute path.
 * Jest keys are absolute paths — pass fsPath from vscode.Uri.
 * On Windows, vscode.Uri.fsPath uses a lowercase drive letter while Jest
 * uses uppercase, so we try both forms.
 */
export function getFileCoverage(
  summary: CoverageSummary,
  absoluteFilePath: string
): FileCoverage | null {
  const fwd = absoluteFilePath.replace(/\\/g, '/');
  return (
    summary[absoluteFilePath] ??
    summary[fwd] ??
    summary[absoluteFilePath.replace(/^([a-z]):/, (_, d) => d.toUpperCase() + ':')] ??
    summary[absoluteFilePath.replace(/^([A-Z]):/, (_, d) => d.toLowerCase() + ':')] ??
    summary[fwd.replace(/^([a-z]):/i, (_, d) => d.toUpperCase() + ':')] ??
    null
  );
}

/**
 * Returns average coverage % across lines, functions, statements, and branches.
 * Ignores metrics where pct is NaN (e.g., 0 total → Jest reports NaN).
 */
export function getOverallPct(coverage: FileCoverage): number {
  const values = [
    coverage.lines.pct,
    coverage.functions.pct,
    coverage.statements.pct,
    coverage.branches.pct,
  ].filter((v) => !isNaN(v));

  if (values.length === 0) {
    return 0;
  }

  return values.reduce((sum, v) => sum + v, 0) / values.length;
}
