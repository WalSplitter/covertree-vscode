export interface CoverageMetric {
  total: number;
  covered: number;
  skipped: number;
  pct: number;
}

export interface FileCoverage {
  lines: CoverageMetric;
  functions: CoverageMetric;
  statements: CoverageMetric;
  branches: CoverageMetric;
}

export interface CoverageSummary {
  total: FileCoverage;
  [absoluteFilePath: string]: FileCoverage;
}

/** Visual state of a file in the explorer. */
export type CoverageStatus = 'none' | 'passing' | 'failing';
