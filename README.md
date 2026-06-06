# CoverTree

[![CI](https://github.com/mgrosshauser/covertree-vscode/actions/workflows/ci.yml/badge.svg)](https://github.com/mgrosshauser/covertree-vscode/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![VS Code](https://img.shields.io/badge/VS%20Code-^1.85.0-blue.svg)](https://code.visualstudio.com/)

VS Code extension that shows Jest code coverage indicators next to files in the Explorer.

## Indicators

| Badge | Meaning |
|-------|---------|
| `○` grey | No coverage data for this file |
| `●` green | Coverage ≥ threshold (default: 75%) |
| `✗` red | Coverage below threshold **or** test failures |

## Requirements

Your project must run Jest with the `json-summary` coverage reporter enabled:

```json
// jest.config.js
{
  "coverageReporters": ["json-summary", "text"]
}
```

Then generate coverage data:

```bash
npx jest --coverage
```

This produces `coverage/coverage-summary.json`, which CoverTree reads.

## Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `covertree.threshold` | `75` | Minimum coverage % for green indicator |
| `covertree.coverageFile` | `coverage/coverage-summary.json` | Path to Jest summary JSON |
| `covertree.include` | `["**/*.ts","**/*.tsx","**/*.js","**/*.jsx"]` | File patterns to decorate |
| `covertree.exclude` | `["**/node_modules/**","**/out/**","**/dist/**","**/coverage/**"]` | Patterns to skip |

## Commands

- **CoverTree: Refresh Coverage** (`covertree.refresh`) — Reload coverage data from disk.

## Development

```bash
npm install        # install deps
npm run compile    # compile TypeScript → out/
npm run watch      # watch mode
npm run lint       # lint src/
npm run type-check # type check only
```

Press `F5` in VS Code to launch the Extension Development Host.

## How It Works

1. On activation, reads `coverage/coverage-summary.json` from workspace root
2. Registers a `FileDecorationProvider` for `.ts/.tsx/.js/.jsx` files
3. Watches for file changes — decorations update automatically
4. Uses `covertree.threshold` to decide pass/fail per file
5. Command `covertree.refresh` forces a re-read

## License

MIT
