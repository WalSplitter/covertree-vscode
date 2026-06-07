# Graph Report - . (2026-06-07)

## Corpus Check

- Corpus is ~15,826 words - fits in a single context window. You may not need a graph.

## Summary

- 355 nodes · 444 edges · 44 communities (22 shown, 22 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.87)
- Token cost: 6,200 input · 1,850 output

## Community Hubs (Navigation)

- [[_COMMUNITY_Extension Configuration Properties|Extension Configuration Properties]]
- [[_COMMUNITY_Extension Manifest|Extension Manifest]]
- [[_COMMUNITY_Summary Coverage Parser|Summary Coverage Parser]]
- [[_COMMUNITY_Detail Coverage Parser|Detail Coverage Parser]]
- [[_COMMUNITY_Icon Generation|Icon Generation]]
- [[_COMMUNITY_TypeScript Build Config|TypeScript Build Config]]
- [[_COMMUNITY_Claude Skill Templates|Claude Skill Templates]]
- [[_COMMUNITY_Coverage Tree View|Coverage Tree View]]
- [[_COMMUNITY_Coverage Threshold & Docs|Coverage Threshold & Docs]]
- [[_COMMUNITY_Navigation & Multi-root|Navigation & Multi-root]]
- [[_COMMUNITY_Code Formatting|Code Formatting]]
- [[_COMMUNITY_Architecture Decision Records|Architecture Decision Records]]
- [[_COMMUNITY_Explorer Badge States|Explorer Badge States]]
- [[_COMMUNITY_Coverage Metrics Display|Coverage Metrics Display]]
- [[_COMMUNITY_Build Scripts|Build Scripts]]
- [[_COMMUNITY_Gutter Marker Rendering|Gutter Marker Rendering]]
- [[_COMMUNITY_Incomplete Coverage UX|Incomplete Coverage UX]]
- [[_COMMUNITY_Complete Coverage UX|Complete Coverage UX]]
- [[_COMMUNITY_Extension Icon|Extension Icon]]
- [[_COMMUNITY_Tool Permissions|Tool Permissions]]
- [[_COMMUNITY_Local Tool Settings|Local Tool Settings]]
- [[_COMMUNITY_PNG Drawing Primitives|PNG Drawing Primitives]]
- [[_COMMUNITY_Dev Environment Config|Dev Environment Config]]
- [[_COMMUNITY_Release Workflow|Release Workflow]]
- [[_COMMUNITY_VS Code Launch Config|VS Code Launch Config]]
- [[_COMMUNITY_VS Code Tasks|VS Code Tasks]]
- [[_COMMUNITY_CI Pipeline|CI Pipeline]]
- [[_COMMUNITY_PNG Encoding|PNG Encoding]]
- [[_COMMUNITY_Code Quality CI|Code Quality CI]]
- [[_COMMUNITY_Monorepo ADR|Monorepo ADR]]
- [[_COMMUNITY_GitHub Docs|GitHub Docs]]
- [[_COMMUNITY_PR Template|PR Template]]
- [[_COMMUNITY_Bug Report Template|Bug Report Template]]
- [[_COMMUNITY_Feature Request Template|Feature Request Template]]
- [[_COMMUNITY_Coverage Activation Event|Coverage Activation Event]]
- [[_COMMUNITY_Jest Activation Event|Jest Activation Event]]
- [[_COMMUNITY_Vitest Activation Event|Vitest Activation Event]]
- [[_COMMUNITY_Gutter Markers Config|Gutter Markers Config]]
- [[_COMMUNITY_Coverage Threshold Config|Coverage Threshold Config]]
- [[_COMMUNITY_Coverage Tool Config|Coverage Tool Config]]
- [[_COMMUNITY_Prettier Config|Prettier Config]]
- [[_COMMUNITY_File Watcher|File Watcher]]
- [[_COMMUNITY_Compile Task|Compile Task]]
- [[_COMMUNITY_Watch Task|Watch Task]]

## God Nodes (most connected - your core abstractions)

1. `CoverageTreeProvider` - 21 edges
2. `CoverTreeProvider` - 17 edges
3. `compilerOptions` - 16 edges
4. `GutterProvider` - 14 edges
5. `Quick Start Command Template` - 12 edges
6. `activate()` - 11 edges
7. `CoverageSummary` - 11 edges
8. `scripts` - 10 edges
9. `getDetailFileCoverage()` - 8 edges
10. `FileCoverage` - 8 edges

## Surprising Connections (you probably didn't know these)

- `Explorer Badges Feature` --conceptually_related_to--> `CoverTreeProvider` [INFERRED]
  README.md → src/coverageProvider.ts
- `coverage-final.json` --conceptually_related_to--> `GutterProvider` [INFERRED]
  README.md → src/gutterProvider.ts
- `Editor Gutter Markers Feature` --conceptually_related_to--> `GutterProvider` [INFERRED]
  README.md → src/gutterProvider.ts
- `Status Bar Feature` --conceptually_related_to--> `CoverTreeProvider.updateStatusBar` [INFERRED]
  README.md → src/coverageProvider.ts
- `coverage-summary.json` --conceptually_related_to--> `CoverTreeProvider.refresh` [INFERRED]
  README.md → src/coverageProvider.ts

## Import Cycles

- None detected.

## Hyperedges (group relationships)

- **Claude Command Registry (all slash command templates)** — commands_quick_start, commands_feature, commands_api, commands_backend, commands_web, commands_tests, commands_shared, commands_bug, commands_refactor, commands_perf, commands_desktop, commands_tools [EXTRACTED 0.95]
- **CI Quality Gate: lint + typecheck + build + package** — github_workflows_ci, eslint_config_js, tsconfig_json, package_json_covertree [INFERRED 0.85]
- **Monorepo npm Workspaces Decision Cluster** — adr_001_monorepo_npm_workspaces, claude_adr001_npm_workspaces, setup_adr001_npm_workspaces_setup, readme_npm_workspaces_monorepo [EXTRACTED 1.00]
- **Coverage Data Pipeline: parse → lookup → compute → display** — src_coverageparser_parsecoveragesummary, src_coverageparser_getfilecoverage, src_coverageparser_getoverallpct [INFERRED 0.90]
- **Line-Level Coverage Analysis: parse detail → lookup file → compute line map** — src_detailparser_parsedetailcoverage, src_detailparser_getdetailfilecoverage, src_detailparser_getlinecoveragemap [INFERRED 0.90]
- **Extension Provider Trio: CoverTreeProvider + GutterProvider + CoverageTreeProvider** — src_extension_covertreeprovider, src_extension_gutterprovider, src_extension_coveragetreeprovider [EXTRACTED 1.00]
- **Coverage Decoration Pipeline: Provider reads data, resolves status, decorates file** — src_coverageprovider_refresh, src_coverageprovider_resolvestatus, src_coverageprovider_providefidecoration [INFERRED 0.90]
- **Gutter Marker SVG Icons: covered, uncovered, partial decoration types** — src_gutterprovider_coveredtype, src_gutterprovider_uncoveredtype, src_gutterprovider_partialtype [EXTRACTED 1.00]
- **Tree Build Pipeline: collectFiles → groupIntoTree → renderNode** — src_coveragetreeprovider_collectfiles, src_coveragetreeprovider_groupintotree, src_coveragetreeprovider_rendernode [EXTRACTED 1.00]

## Communities (44 total, 22 thin omitted)

### Community 0 - "Extension Configuration Properties"

Cohesion: 0.05
Nodes (38): properties, title, configuration, default, description, type, default, description (+30 more)

### Community 1 - "Extension Manifest"

Cohesion: 0.06
Nodes (33): activationEvents, categories, contributes, commands, keybindings, menus, views, description (+25 more)

### Community 2 - "Summary Coverage Parser"

Cohesion: 0.14
Nodes (15): Jest coverage-summary.json (file-level data), Config: covertree.coverageFile, getFileCoverage(), getOverallPct(), parseCoverageSummary(), CoverTreeProvider, FileDecorationProvider (vscode), CoverageTreeItem (+7 more)

### Community 3 - "Detail Coverage Parser"

Cohesion: 0.18
Nodes (11): Istanbul/Jest coverage-final.json (line-level data), Windows Drive Letter Case Normalization, Config: covertree.detailFile, DetailCoverage, getDetailFileCoverage(), getLineCoverageMap(), IstanbulFileCoverage, LineCoverageStatus (+3 more)

### Community 4 - "Icon Generation"

Cohesion: 0.13
Nodes (18): BG, buf, chunk(), circle(), crc32(), CRC_TABLE, dest, fs (+10 more)

### Community 5 - "TypeScript Build Config"

Cohesion: 0.11
Nodes (18): compilerOptions, declaration, declarationMap, esModuleInterop, lib, module, noFallthroughCasesInSwitch, noUnusedLocals (+10 more)

### Community 6 - "Claude Skill Templates"

Cohesion: 0.12
Nodes (18): API Endpoint Command Template, Backend & Microservices Command Template, Bug Debug & Fix Command Template, Desktop Application Command Template, Feature Implementation Command Template, Performance Optimization Command Template, Quick Start Command Template, Refactor Command Template (+10 more)

### Community 8 - "Coverage Threshold & Docs"

Cohesion: 0.12
Nodes (17): Coverage Threshold (75% default), coverage-final.json, coverage-summary.json, CoverTree README, Explorer Badges Feature, Editor Gutter Markers Feature, Status Bar Feature, CoverTreeProvider.provideFileDecoration (+9 more)

### Community 9 - "Navigation & Multi-root"

Cohesion: 0.23
Nodes (12): Multi-root Workspace Support, Command: covertree.nextUncoveredLine, Command: covertree.prevUncoveredLine, Command: covertree.refresh, Tree View: covertree.coverageView, activate(), addFolder() (internal), CoverageTreeProvider (imported class) (+4 more)

### Community 10 - "Code Formatting"

Cohesion: 0.17
Nodes (11): arrowParens, bracketSpacing, endOfLine, jsxSingleQuote, printWidth, quoteProps, semi, singleQuote (+3 more)

### Community 11 - "Architecture Decision Records"

Cohesion: 0.24
Nodes (10): Lerna + npm Workspaces Alternative (Rejected), ADR-001: Monorepo with npm Workspaces (docs/adr), Polyrepo Alternative (Rejected), Yarn/pnpm Workspaces Alternative (Rejected), Active Architecture Decision Records Index, ADR-002: TypeScript Strict Mode, ADR-003: RESTful API Design, ADR Template Document (+2 more)

### Community 12 - "Explorer Badge States"

Cohesion: 0.33
Nodes (10): Covered Badge State (Green), Excluded Badge State (Grey), Partially Covered Badge State (Yellow/Orange), Coverage Badge Indicator, Explorer Badges Screenshot, Source TypeScript Files, src Folder Structure, Test Files (_tests_ folder) (+2 more)

### Community 13 - "Coverage Metrics Display"

Cohesion: 0.24
Nodes (10): Branches Coverage Metric, Coverage Metrics Display, src/formatters.ts Source File, Functions Coverage Metric, Gutter Markers (colored circles), Lines Coverage Metric, Tooltip Detail Screenshot, Statements Coverage Metric (+2 more)

### Community 14 - "Build Scripts"

Cohesion: 0.20
Nodes (10): scripts, build, compile, format, format:check, lint, package, publish (+2 more)

### Community 15 - "Gutter Marker Rendering"

Cohesion: 0.25
Nodes (9): covered.svg (green gutter marker icon), partial.svg (yellow gutter marker icon), GutterProvider.applyToEditor, GutterProvider.clearAll, GutterProvider.coveredType (TextEditorDecorationType), GutterProvider.getUncoveredLines, GutterProvider.partialType (TextEditorDecorationType), GutterProvider.refresh (+1 more)

### Community 16 - "Incomplete Coverage UX"

Cohesion: 0.46
Nodes (8): Green Gutter Marker (Covered Line), Partial/Incomplete Code Coverage State, Red Gutter Marker (Uncovered Line), Gutter Markers Incomplete Coverage Screenshot, stringUtils.ts Source File, TypeScript Source Code, UX: Line-Level Coverage Feedback via Color, VS Code Editor View with Gutter

### Community 17 - "Complete Coverage UX"

Cohesion: 0.53
Nodes (6): Full/Complete Code Coverage State, Green Gutter Bar (Covered Line Indicator), Sample File: math.ts with Exported Functions, Gutter Markers Complete Coverage Screenshot, TypeScript Exported Functions (add, subtract, multiply, divide, clamp), VS Code Editor with Gutter Decoration

### Community 18 - "Extension Icon"

Cohesion: 0.60
Nodes (5): Circuit / Node Graph Aesthetic, Code Coverage Concept, CoverTree Extension Icon, Green on Dark Color Scheme, Tree / Branch Visual Metaphor

### Community 19 - "Tool Permissions"

Cohesion: 0.50
Nodes (3): permissions, allow, deny

### Community 20 - "Local Tool Settings"

Cohesion: 0.50
Nodes (3): permissions, additionalDirectories, allow

### Community 21 - "PNG Drawing Primitives"

Cohesion: 0.50
Nodes (4): circle() draw circle, px() pixel setter, rect() draw rectangle, roundRect() draw rounded rectangle

### Community 23 - "Release Workflow"

Cohesion: 0.67
Nodes (3): Release GitHub Actions Workflow, softprops/action-gh-release, vsce package step

## Knowledge Gaps

- **167 isolated node(s):** `allow`, `deny`, `allow`, `additionalDirectories`, `printWidth` (+162 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `GutterProvider` connect `Detail Coverage Parser` to `Coverage Threshold & Docs`, `Gutter Marker Rendering`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `contributes` connect `Extension Manifest` to `Extension Configuration Properties`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `CoverTreeProvider` (e.g. with `Explorer Badges Feature` and `CoverageTreeProvider`) actually correct?**
  _`CoverTreeProvider` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `GutterProvider` (e.g. with `coverage-final.json` and `Editor Gutter Markers Feature`) actually correct?**
  _`GutterProvider` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `allow`, `deny`, `allow` to the rest of the system?**
  _173 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Extension Configuration Properties` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
- **Should `Extension Manifest` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
