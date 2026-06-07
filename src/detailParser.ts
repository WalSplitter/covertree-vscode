import * as fs from 'fs';

interface SourceLocation {
  start: { line: number; column: number };
  end: { line: number; column: number };
}

interface IstanbulFileCoverage {
  path: string;
  statementMap: Record<string, SourceLocation>;
  s: Record<string, number>;
  fnMap: Record<string, { name: string; decl: SourceLocation; loc: SourceLocation }>;
  f: Record<string, number>;
  branchMap: Record<string, { loc: SourceLocation; type: string; locations: SourceLocation[] }>;
  b: Record<string, number[]>;
}

export type LineCoverageStatus = 'covered' | 'uncovered' | 'partial';
export type DetailCoverage = Record<string, IstanbulFileCoverage>;

export function parseDetailCoverage(filePath: string): DetailCoverage | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as DetailCoverage;
  } catch {
    return null;
  }
}

export function getDetailFileCoverage(
  detail: DetailCoverage,
  absoluteFilePath: string
): IstanbulFileCoverage | null {
  const fwd = absoluteFilePath.replace(/\\/g, '/');
  return (
    detail[absoluteFilePath] ??
    detail[fwd] ??
    detail[absoluteFilePath.replace(/^([a-z]):/, (_, d) => d.toUpperCase() + ':')] ??
    detail[absoluteFilePath.replace(/^([A-Z]):/, (_, d) => d.toLowerCase() + ':')] ??
    detail[fwd.replace(/^([a-z]):/i, (_, d) => d.toUpperCase() + ':')] ??
    null
  );
}

export function getLineCoverageMap(
  fileData: IstanbulFileCoverage
): Map<number, LineCoverageStatus> {
  const lineMap = new Map<number, LineCoverageStatus>();

  for (const [id, loc] of Object.entries(fileData.statementMap)) {
    const hits = fileData.s[id] ?? 0;
    for (let line = loc.start.line; line <= loc.end.line; line++) {
      const current = lineMap.get(line);
      if (hits > 0) {
        if (current !== 'uncovered') {
          lineMap.set(line, 'covered');
        }
      } else {
        if (current === 'covered') {
          lineMap.set(line, 'partial');
        } else if (current === undefined) {
          lineMap.set(line, 'uncovered');
        }
      }
    }
  }

  // Mark lines with mixed branch hits as partial
  for (const [id, branchData] of Object.entries(fileData.branchMap)) {
    const hits = fileData.b[id] ?? [];
    const hasCovered = hits.some((h) => h > 0);
    const hasUncovered = hits.some((h) => h === 0);
    if (hasCovered && hasUncovered) {
      for (const loc of branchData.locations) {
        for (let line = loc.start.line; line <= loc.end.line; line++) {
          if (lineMap.get(line) === 'covered') {
            lineMap.set(line, 'partial');
          }
        }
      }
    }
  }

  return lineMap;
}
