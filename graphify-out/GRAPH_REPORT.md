# Graph Report - .  (2026-06-06)

## Corpus Check
- Corpus is ~35,634 words - fits in a single context window. You may not need a graph.

## Summary
- 483 nodes · 517 edges · 52 communities (36 shown, 16 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.82)
- Token cost: 12,800 input · 2,950 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Claude Slash Commands|Claude Slash Commands]]
- [[_COMMUNITY_Dev Patterns and Concepts|Dev Patterns and Concepts]]
- [[_COMMUNITY_Frontend Dependencies|Frontend Dependencies]]
- [[_COMMUNITY_Monorepo Decision Record|Monorepo Decision Record]]
- [[_COMMUNITY_Root Package Config|Root Package Config]]
- [[_COMMUNITY_API App Dependencies|API App Dependencies]]
- [[_COMMUNITY_Root TypeScript Config|Root TypeScript Config]]
- [[_COMMUNITY_Backend App Dependencies|Backend App Dependencies]]
- [[_COMMUNITY_Base TypeScript Config|Base TypeScript Config]]
- [[_COMMUNITY_Shared Types Package|Shared Types Package]]
- [[_COMMUNITY_Monorepo Scripts|Monorepo Scripts]]
- [[_COMMUNITY_Express Middleware Pipeline|Express Middleware Pipeline]]
- [[_COMMUNITY_Code Formatting Config|Code Formatting Config]]
- [[_COMMUNITY_Backend Dev Dependencies|Backend Dev Dependencies]]
- [[_COMMUNITY_API Dev Dependencies|API Dev Dependencies]]
- [[_COMMUNITY_Backend TypeScript Config|Backend TypeScript Config]]
- [[_COMMUNITY_Dependency Automation|Dependency Automation]]
- [[_COMMUNITY_Shared Type Interfaces|Shared Type Interfaces]]
- [[_COMMUNITY_Shared Types Build Config|Shared Types Build Config]]
- [[_COMMUNITY_Frontend TypeScript Config|Frontend TypeScript Config]]
- [[_COMMUNITY_Security Architecture|Security Architecture]]
- [[_COMMUNITY_Backend Architecture Patterns|Backend Architecture Patterns]]
- [[_COMMUNITY_Infrastructure and Deployment|Infrastructure and Deployment]]
- [[_COMMUNITY_Claude AI Settings|Claude AI Settings]]
- [[_COMMUNITY_Desktop App Patterns|Desktop App Patterns]]
- [[_COMMUNITY_CI Security Pipeline|CI Security Pipeline]]
- [[_COMMUNITY_CLI Tools|CLI Tools]]
- [[_COMMUNITY_Shared Library Design|Shared Library Design]]
- [[_COMMUNITY_Background Job Workers|Background Job Workers]]
- [[_COMMUNITY_Error Handling|Error Handling]]
- [[_COMMUNITY_UI Components|UI Components]]
- [[_COMMUNITY_Contribution Workflow|Contribution Workflow]]
- [[_COMMUNITY_WebSocket Service|WebSocket Service]]
- [[_COMMUNITY_Git Branching Strategy|Git Branching Strategy]]
- [[_COMMUNITY_Modularity Principle|Modularity Principle]]
- [[_COMMUNITY_Scalability Principle|Scalability Principle]]
- [[_COMMUNITY_TypeScript Adoption|TypeScript Adoption]]
- [[_COMMUNITY_Railway Deployment|Railway Deployment]]
- [[_COMMUNITY_Prettier Root Config|Prettier Root Config]]
- [[_COMMUNITY_Shared Utilities|Shared Utilities]]
- [[_COMMUNITY_Build Automation|Build Automation]]
- [[_COMMUNITY_User Creation Type|User Creation Type]]
- [[_COMMUNITY_Login Request Type|Login Request Type]]
- [[_COMMUNITY_User Update Type|User Update Type]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 21 edges
2. `compilerOptions` - 20 edges
3. `scripts` - 16 edges
4. `GitHub Copilot Development Guidelines` - 13 edges
5. `Skill: Backend & Microservices Development` - 13 edges
6. `Quick Start Command Template` - 12 edges
7. `scripts` - 11 edges
8. `scripts` - 11 edges
9. `scripts` - 11 edges
10. `Base Project Template` - 11 edges

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
- **Express Request Handling Pipeline** — src_index_app, routes_health_healthrouter, middleware_not_found_notfound, middleware_error_handler_errorhandler [INFERRED 0.95]
- **React Application Bootstrap Chain** — components_main_main, src_app_app, web_frontend_vite_config [INFERRED 0.90]
- **Express-based Backend Applications** — api_package, web_backend_package, src_index_app, utils_logger_logger [INFERRED 0.85]
- **Monorepo Tooling Foundation (npm workspaces + ESLint + TypeScript)** — package_root_npm_workspaces, eslint_config_eslint_configuration, tsconfig_base, tsconfig_base_path_aliases [INFERRED 0.85]
- **Shared Type System (types package + path aliases + shared principle)** — types_package_shared_types, tsconfig_base_path_aliases, concept_shared_types_principle, types_src_iapiresponse, types_src_iuser [EXTRACTED 0.95]
- **Claude Command Registry (all slash command templates)** — commands_quick_start, commands_feature, commands_api, commands_backend, commands_web, commands_tests, commands_shared, commands_bug, commands_refactor, commands_perf, commands_desktop, commands_tools [EXTRACTED 0.95]
- **GitHub Copilot Workflow Ecosystem (instructions + prompts + skills)** — github_copilot_instructions, github_skills_programming_skills_guide, prompts_00_quick_start, prompts_01_feature_implementation, prompts_02_bug_fixing, prompts_03_refactoring [EXTRACTED 0.95]
- **CI Quality Gates (lint, test, build, security)** — workflows_ci, concept_ci_pipeline, concept_trivy_security_scan, concept_typescript_strict_mode [EXTRACTED 0.90]
- **Backend Architecture Pattern Triad (service, repository, DI)** — concept_service_layer_pattern, concept_repository_pattern, concept_dependency_injection [INFERRED 0.85]
- **Monorepo npm Workspaces Decision Cluster** — adr_001_monorepo_npm_workspaces, claude_adr001_npm_workspaces, setup_adr001_npm_workspaces_setup, readme_npm_workspaces_monorepo [EXTRACTED 1.00]
- **Security Features Implementation Cluster** — security_jwt_auth, security_input_validation, readme_security_features, architecture_security_architecture [INFERRED 0.85]
- **Docker Local Development Services Cluster** — docker_compose_postgres_service, docker_compose_redis_service, getting_started_environment_postgres_setup [EXTRACTED 1.00]

## Communities (52 total, 16 thin omitted)

### Community 0 - "Claude Slash Commands"
Cohesion: 0.06
Nodes (38): API Endpoint Command Template, Backend & Microservices Command Template, Bug Debug & Fix Command Template, Desktop Application Command Template, Feature Implementation Command Template, Performance Optimization Command Template, Quick Start Command Template, Refactor Command Template (+30 more)

### Community 1 - "Dev Patterns and Concepts"
Cohesion: 0.12
Nodes (38): Tests Command Template, AAA Test Pattern (Arrange-Act-Assert), Architecture Decision Records (ADR), BullMQ Async Job Queue Pattern, Commander.js CLI Architecture, Dependency Injection Pattern, Exponential Backoff Retry Logic, Factory Pattern (+30 more)

### Community 2 - "Frontend Dependencies"
Cohesion: 0.05
Nodes (37): dependencies, axios, react, react-dom, react-router-dom, zustand, description, devDependencies (+29 more)

### Community 3 - "Monorepo Decision Record"
Cohesion: 0.07
Nodes (31): Lerna + npm Workspaces Alternative (Rejected), ADR-001: Monorepo with npm Workspaces (docs/adr), Polyrepo Alternative (Rejected), Yarn/pnpm Workspaces Alternative (Rejected), Active Architecture Decision Records Index, ADR-002: TypeScript Strict Mode, ADR-003: RESTful API Design, ADR Template Document (+23 more)

### Community 4 - "Root Package Config"
Cohesion: 0.06
Nodes (30): author, dependencies, cors, jsdom, description, devDependencies, eslint, eslint-config-prettier (+22 more)

### Community 5 - "API App Dependencies"
Cohesion: 0.07
Nodes (28): dependencies, cors, dotenv, express, helmet, joi, jsonwebtoken, pg (+20 more)

### Community 6 - "Root TypeScript Config"
Cohesion: 0.07
Nodes (28): compilerOptions, allowImportingTsExtensions, allowSyntheticDefaultImports, baseUrl, esModuleInterop, ignoreDeprecations, isolatedModules, jsx (+20 more)

### Community 7 - "Backend App Dependencies"
Cohesion: 0.07
Nodes (28): dependencies, cors, dotenv, express, helmet, joi, jsonwebtoken, pg (+20 more)

### Community 8 - "Base TypeScript Config"
Cohesion: 0.08
Nodes (25): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, declarationMap, esModuleInterop, ignoreDeprecations, lib (+17 more)

### Community 9 - "Shared Types Package"
Cohesion: 0.11
Nodes (18): description, devDependencies, @types/node, typescript, engines, node, exports, main (+10 more)

### Community 10 - "Monorepo Scripts"
Cohesion: 0.12
Nodes (16): scripts, build, clean, clean-root, dev, format, format:check, install-all (+8 more)

### Community 11 - "Express Middleware Pipeline"
Cohesion: 0.36
Nodes (6): Express Middleware Chain Pattern, errorHandler(), notFound(), healthRouter, app, logger

### Community 12 - "Code Formatting Config"
Cohesion: 0.17
Nodes (11): arrowParens, bracketSpacing, endOfLine, jsxSingleQuote, printWidth, quoteProps, semi, singleQuote (+3 more)

### Community 13 - "Backend Dev Dependencies"
Cohesion: 0.17
Nodes (12): devDependencies, eslint, rimraf, tsx, @types/cors, @types/express, @types/node, typescript (+4 more)

### Community 14 - "API Dev Dependencies"
Cohesion: 0.18
Nodes (11): devDependencies, eslint, rimraf, tsx, @types/express, @types/node, typescript, @typescript-eslint/eslint-plugin (+3 more)

### Community 15 - "Backend TypeScript Config"
Cohesion: 0.20
Nodes (9): compilerOptions, lib, outDir, paths, rootDir, exclude, extends, include (+1 more)

### Community 16 - "Dependency Automation"
Cohesion: 0.22
Nodes (8): automerge, dependencyDashboard, extends, packageRules, semanticCommits, vulnerabilityAlerts, assignees, labels

### Community 17 - "Shared Type Interfaces"
Cohesion: 0.22
Nodes (8): IApiResponse, IAuthPayload, ICreateUserRequest, ILoginRequest, ILoginResponse, IPaginatedResponse, IUpdateUserRequest, IUser

### Community 18 - "Shared Types Build Config"
Cohesion: 0.22
Nodes (8): compilerOptions, declaration, declarationMap, outDir, rootDir, exclude, extends, include

### Community 19 - "Frontend TypeScript Config"
Cohesion: 0.22
Nodes (8): compilerOptions, jsx, lib, paths, exclude, extends, include, @/*

### Community 20 - "Security Architecture"
Cohesion: 0.33
Nodes (7): API Service Application, JWT Auth Middleware Pattern, Security Architecture Layers, Built-In Security Features, Input Validation Security, JWT Authentication Security, Shared Logger Library (Winston)

### Community 21 - "Backend Architecture Patterns"
Cohesion: 0.47
Nodes (6): Web Application Data Flow, Dependency Injection Pattern, Repository Pattern, Service Layer Pattern, Code Quality Development Standards, Testing Coverage Requirements

### Community 22 - "Infrastructure and Deployment"
Cohesion: 0.40
Nodes (5): PostgreSQL Docker Service, PostgreSQL Local Development Setup, VS Code Configuration for Project, AWS ECS Deployment Option, Database Migration Tool

### Community 23 - "Claude AI Settings"
Cohesion: 0.50
Nodes (3): permissions, allow, deny

### Community 24 - "Desktop App Patterns"
Cohesion: 0.50
Nodes (4): Electron Desktop Application Template, Electron IPC Communication Pattern, Tauri Desktop Application Template, Desktop Application Project Type

### Community 25 - "CI Security Pipeline"
Cohesion: 0.67
Nodes (3): CI Pipeline (lint, test, build, security), Trivy Vulnerability Scanner, CI GitHub Actions Workflow

### Community 26 - "CLI Tools"
Cohesion: 0.67
Nodes (3): CLI Tools Project Type, Code Generator Tool, Commander.js CLI Framework Pattern

### Community 27 - "Shared Library Design"
Cohesion: 0.67
Nodes (3): Shared Libraries Project Type, IUser Domain Model Interface, Shared TypeScript Types Library

## Ambiguous Edges - Review These
- `Repository Pattern (data access abstraction)` → `Monorepo Shared Package Patterns`  [AMBIGUOUS]
  .github/skills/06-shared-development.md · relation: semantically_similar_to

## Knowledge Gaps
- **322 isolated node(s):** `allow`, `deny`, `printWidth`, `tabWidth`, `useTabs` (+317 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Repository Pattern (data access abstraction)` and `Monorepo Shared Package Patterns`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **Why does `compilerOptions` connect `Base TypeScript Config` to `Claude Slash Commands`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `allow`, `deny`, `printWidth` to the rest of the system?**
  _331 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Claude Slash Commands` be split into smaller, more focused modules?**
  _Cohesion score 0.06072874493927125 - nodes in this community are weakly interconnected._
- **Should `Dev Patterns and Concepts` be split into smaller, more focused modules?**
  _Cohesion score 0.11948790896159317 - nodes in this community are weakly interconnected._
- **Should `Frontend Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05263157894736842 - nodes in this community are weakly interconnected._
- **Should `Monorepo Decision Record` be split into smaller, more focused modules?**
  _Cohesion score 0.07311827956989247 - nodes in this community are weakly interconnected._