# Graph Report - .  (2026-06-06)

## Corpus Check
- 14 files · ~8,327 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 558 nodes · 636 edges · 55 communities (36 shown, 19 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 49 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_TypeScript Compiler Config|TypeScript Compiler Config]]
- [[_COMMUNITY_Backend Package Dependencies|Backend Package Dependencies]]
- [[_COMMUNITY_CLI Template Commands|CLI Template Commands]]
- [[_COMMUNITY_Extension Package Manifest|Extension Package Manifest]]
- [[_COMMUNITY_Dev Patterns & Best Practices|Dev Patterns & Best Practices]]
- [[_COMMUNITY_ADR Architecture Decisions|ADR Architecture Decisions]]
- [[_COMMUNITY_CoverTree Extension Core|CoverTree Extension Core]]
- [[_COMMUNITY_Frontend Package Dependencies|Frontend Package Dependencies]]
- [[_COMMUNITY_Express Backend Package|Express Backend Package]]
- [[_COMMUNITY_Dev Tool Dependencies|Dev Tool Dependencies]]
- [[_COMMUNITY_TypeScript Module Config|TypeScript Module Config]]
- [[_COMMUNITY_Build & Script Automation|Build & Script Automation]]
- [[_COMMUNITY_Node Package Metadata|Node Package Metadata]]
- [[_COMMUNITY_Prettier Code Formatting|Prettier Code Formatting]]
- [[_COMMUNITY_Express Middleware Chain|Express Middleware Chain]]
- [[_COMMUNITY_TypeScript Path Config|TypeScript Path Config]]
- [[_COMMUNITY_Renovate Dependency Updates|Renovate Dependency Updates]]
- [[_COMMUNITY_API Type Interfaces|API Type Interfaces]]
- [[_COMMUNITY_React TypeScript Config|React TypeScript Config]]
- [[_COMMUNITY_Architecture Quality Patterns|Architecture Quality Patterns]]
- [[_COMMUNITY_Infrastructure & Deployment|Infrastructure & Deployment]]
- [[_COMMUNITY_Claude Code Permissions|Claude Code Permissions]]
- [[_COMMUNITY_Local Settings Permissions|Local Settings Permissions]]
- [[_COMMUNITY_Desktop App Templates|Desktop App Templates]]
- [[_COMMUNITY_CI Security Pipeline|CI Security Pipeline]]
- [[_COMMUNITY_CLI Tool Templates|CLI Tool Templates]]
- [[_COMMUNITY_Shared Type Library|Shared Type Library]]
- [[_COMMUNITY_VS Code Tasks Config|VS Code Tasks Config]]
- [[_COMMUNITY_Background Job Queue|Background Job Queue]]
- [[_COMMUNITY_Custom Error Classes|Custom Error Classes]]
- [[_COMMUNITY_React DOM Render|React DOM Render]]
- [[_COMMUNITY_Git Workflow Standards|Git Workflow Standards]]
- [[_COMMUNITY_VS Code Debug Config|VS Code Debug Config]]
- [[_COMMUNITY_WebSocket Service|WebSocket Service]]
- [[_COMMUNITY_Git Flow Strategy|Git Flow Strategy]]
- [[_COMMUNITY_Modularity Principle|Modularity Principle]]
- [[_COMMUNITY_Scalability Principle|Scalability Principle]]
- [[_COMMUNITY_TypeScript Decision|TypeScript Decision]]
- [[_COMMUNITY_Railway Deployment|Railway Deployment]]
- [[_COMMUNITY_Prettier Config|Prettier Config]]
- [[_COMMUNITY_Shared Utility Functions|Shared Utility Functions]]
- [[_COMMUNITY_Build Automation Tool|Build Automation Tool]]
- [[_COMMUNITY_Create User Request|Create User Request]]
- [[_COMMUNITY_Login Request Interface|Login Request Interface]]
- [[_COMMUNITY_Update User Interface|Update User Interface]]
- [[_COMMUNITY_VS Code Watch Task|VS Code Watch Task]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 27 edges
2. `scripts` - 20 edges
3. `compilerOptions` - 20 edges
4. `CoverTreeProvider.refresh()` - 18 edges
5. `GitHub Copilot Development Guidelines` - 13 edges
6. `Skill: Backend & Microservices Development` - 13 edges
7. `Quick Start Command Template` - 12 edges
8. `scripts` - 11 edges
9. `scripts` - 11 edges
10. `scripts` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Monorepo Shared Package Patterns` --semantically_similar_to--> `Repository Pattern (data access abstraction)`  [AMBIGUOUS] [semantically similar]
  .github/skills/06-shared-development.md → .claude/commands/backend.md
- `TypeScript ESLint Integration` --semantically_similar_to--> `TypeScript Strict Mode`  [INFERRED] [semantically similar]
  eslint.config.js → tsconfig.base.json
- `Define Once Use Everywhere (shared types principle)` --rationale_for--> `npm Workspaces Definition`  [INFERRED]
  .claude/commands/shared.md → package.json
- `Shared Libraries Command Template` --references--> `IAuthPayload Interface`  [EXTRACTED]
  .claude/commands/shared.md → shared/types/src/index.ts
- `TypeScript Strict Mode` --references--> `Feature Implementation Command Template`  [INFERRED]
  tsconfig.base.json → .claude/commands/feature.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Coverage Data Pipeline: parse → lookup → percentage → decorate** — src_coverageparser_parsecoveragesummary, src_coverageparser_getfilecoverage, src_coverageparser_getoverallpct, src_coverageprovider_providefiledecoration [EXTRACTED 0.95]
- **VS Code Extension Lifecycle: activate → register provider + watcher → dispose** — src_extension_activate, src_coverageprovider_covertreeprovider, src_coverageprovider_startWatching, src_coverageprovider_dispose [EXTRACTED 0.95]
- **CI Quality Gate: lint + typecheck + build + package** — github_workflows_ci, eslint_config_js, tsconfig_json, package_json_covertree [INFERRED 0.85]

## Communities (55 total, 19 thin omitted)

### Community 0 - "TypeScript Compiler Config"
Cohesion: 0.05
Nodes (40): compilerOptions, allowImportingTsExtensions, allowSyntheticDefaultImports, baseUrl, declaration, declarationMap, esModuleInterop, ignoreDeprecations (+32 more)

### Community 1 - "Backend Package Dependencies"
Cohesion: 0.05
Nodes (40): dependencies, cors, dotenv, express, helmet, joi, jsonwebtoken, pg (+32 more)

### Community 2 - "CLI Template Commands"
Cohesion: 0.06
Nodes (38): API Endpoint Command Template, Backend & Microservices Command Template, Bug Debug & Fix Command Template, Desktop Application Command Template, Feature Implementation Command Template, Performance Optimization Command Template, Quick Start Command Template, Refactor Command Template (+30 more)

### Community 3 - "Extension Package Manifest"
Cohesion: 0.07
Nodes (37): activationEvents, author, categories, properties, title, contributes, commands, default (+29 more)

### Community 4 - "Dev Patterns & Best Practices"
Cohesion: 0.12
Nodes (38): Tests Command Template, AAA Test Pattern (Arrange-Act-Assert), Architecture Decision Records (ADR), BullMQ Async Job Queue Pattern, Commander.js CLI Architecture, Dependency Injection Pattern, Exponential Backoff Retry Logic, Factory Pattern (+30 more)

### Community 5 - "ADR Architecture Decisions"
Cohesion: 0.06
Nodes (37): Lerna + npm Workspaces Alternative (Rejected), ADR-001: Monorepo with npm Workspaces (docs/adr), Polyrepo Alternative (Rejected), Yarn/pnpm Workspaces Alternative (Rejected), Active Architecture Decision Records Index, ADR-002: TypeScript Strict Mode, ADR-003: RESTful API Design, ADR Template Document (+29 more)

### Community 6 - "CoverTree Extension Core"
Cohesion: 0.11
Nodes (20): ADR-001: npm Workspaces Monorepo, VS Code FileDecorationProvider Pattern, Jest coverage-summary.json Format, Coverage Threshold Pass/Fail Logic, Windows Drive Letter Case Normalization, ESLint Config (typescript-eslint + prettier), GitHub Actions CI Workflow, CoverTree package.json (+12 more)

### Community 7 - "Frontend Package Dependencies"
Cohesion: 0.05
Nodes (36): dependencies, axios, react, react-dom, react-router-dom, zustand, description, devDependencies (+28 more)

### Community 8 - "Express Backend Package"
Cohesion: 0.07
Nodes (28): dependencies, cors, dotenv, express, helmet, joi, jsonwebtoken, pg (+20 more)

### Community 9 - "Dev Tool Dependencies"
Cohesion: 0.08
Nodes (25): devDependencies, eslint, rimraf, tsx, @types/express, @types/node, typescript, @typescript-eslint/eslint-plugin (+17 more)

### Community 10 - "TypeScript Module Config"
Cohesion: 0.08
Nodes (25): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, declarationMap, esModuleInterop, ignoreDeprecations, lib (+17 more)

### Community 11 - "Build & Script Automation"
Cohesion: 0.10
Nodes (20): scripts, build, clean, clean-root, compile, dev, format, format:check (+12 more)

### Community 12 - "Node Package Metadata"
Cohesion: 0.11
Nodes (18): description, devDependencies, @types/node, typescript, engines, node, exports, main (+10 more)

### Community 13 - "Prettier Code Formatting"
Cohesion: 0.17
Nodes (11): arrowParens, bracketSpacing, endOfLine, jsxSingleQuote, printWidth, quoteProps, semi, singleQuote (+3 more)

### Community 14 - "Express Middleware Chain"
Cohesion: 0.38
Nodes (5): Express Middleware Chain Pattern, notFound(), healthRouter, app, logger

### Community 15 - "TypeScript Path Config"
Cohesion: 0.20
Nodes (9): compilerOptions, lib, outDir, paths, rootDir, exclude, extends, include (+1 more)

### Community 16 - "Renovate Dependency Updates"
Cohesion: 0.22
Nodes (8): automerge, dependencyDashboard, extends, packageRules, semanticCommits, vulnerabilityAlerts, assignees, labels

### Community 17 - "API Type Interfaces"
Cohesion: 0.22
Nodes (8): IApiResponse, IAuthPayload, ICreateUserRequest, ILoginRequest, ILoginResponse, IPaginatedResponse, IUpdateUserRequest, IUser

### Community 18 - "React TypeScript Config"
Cohesion: 0.22
Nodes (8): compilerOptions, jsx, lib, paths, exclude, extends, include, @/*

### Community 19 - "Architecture Quality Patterns"
Cohesion: 0.47
Nodes (6): Web Application Data Flow, Dependency Injection Pattern, Repository Pattern, Service Layer Pattern, Code Quality Development Standards, Testing Coverage Requirements

### Community 20 - "Infrastructure & Deployment"
Cohesion: 0.40
Nodes (5): PostgreSQL Docker Service, PostgreSQL Local Development Setup, VS Code Configuration for Project, AWS ECS Deployment Option, Database Migration Tool

### Community 21 - "Claude Code Permissions"
Cohesion: 0.50
Nodes (3): permissions, allow, deny

### Community 22 - "Local Settings Permissions"
Cohesion: 0.50
Nodes (3): permissions, additionalDirectories, allow

### Community 23 - "Desktop App Templates"
Cohesion: 0.50
Nodes (4): Electron Desktop Application Template, Electron IPC Communication Pattern, Tauri Desktop Application Template, Desktop Application Project Type

### Community 24 - "CI Security Pipeline"
Cohesion: 0.67
Nodes (3): CI Pipeline (lint, test, build, security), Trivy Vulnerability Scanner, CI GitHub Actions Workflow

### Community 25 - "CLI Tool Templates"
Cohesion: 0.67
Nodes (3): CLI Tools Project Type, Code Generator Tool, Commander.js CLI Framework Pattern

### Community 26 - "Shared Type Library"
Cohesion: 0.67
Nodes (3): Shared Libraries Project Type, IUser Domain Model Interface, Shared TypeScript Types Library

## Ambiguous Edges - Review These
- `Repository Pattern (data access abstraction)` → `Monorepo Shared Package Patterns`  [AMBIGUOUS]
  .github/skills/06-shared-development.md · relation: semantically_similar_to

## Knowledge Gaps
- **344 isolated node(s):** `allow`, `deny`, `printWidth`, `tabWidth`, `useTabs` (+339 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Repository Pattern (data access abstraction)` and `Monorepo Shared Package Patterns`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **Why does `devDependencies` connect `Dev Tool Dependencies` to `Extension Package Manifest`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Tool Dependencies` to `Express Backend Package`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **What connects `allow`, `deny`, `printWidth` to the rest of the system?**
  _353 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `TypeScript Compiler Config` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._
- **Should `Backend Package Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._
- **Should `CLI Template Commands` be split into smaller, more focused modules?**
  _Cohesion score 0.06072874493927125 - nodes in this community are weakly interconnected._