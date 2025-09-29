# Implementation Plan: Interactive Bistro Menu Display

**Branch**: `001-build-an-aplication` | **Date**: 2025-09-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-build-an-aplication/spec.md`

## Execution Flow (/plan command scope)

```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from file system structure or context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code or `AGENTS.md` for opencode).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:

- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary

Build an interactive bistro menu application with customer-facing display and admin portal. Customers can browse menu items organized by category, search by name/ingredients/category, and view recipes. Admin staff can manage menu items, recipes, and categories. The application will use Next.js with TypeScript for the frontend, Supabase for data and image storage, and shadcn/ui components for a classy bistro aesthetic.

## Technical Context

**Language/Version**: TypeScript (latest), Node.js 18+  
**Primary Dependencies**: Next.js 14+ (App Router), React 18+, shadcn/ui, Supabase client, Tailwind CSS  
**Storage**: Supabase (PostgreSQL database + Storage for images)  
**Testing**: Vitest for unit tests, Playwright for E2E tests, React Testing Library for component tests  
**Target Platform**: Web (modern browsers), responsive design for mobile/tablet/desktop
**Project Type**: Web application (Next.js full-stack with Supabase backend)  
**Performance Goals**: Menu load <2-3 seconds, search results <500ms, sub-second navigation  
**Constraints**: Debounced search (300ms), single location support, English only, standard web accessibility  
**Scale/Scope**: Single bistro, ~50-100 menu items, ~10-20 categories, 5-10 admin users, unlimited customers

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### I. User-Centric Design ✅

- Customer menu browsing with intuitive search/filter meets user needs
- Admin portal provides straightforward CRUD operations
- Minimal training required for both customer and admin interfaces

### II. Data Integrity ⚠️ DEVIATION

- **Spec does not require nutritional information** (constitution requires complete nutritional data)
- **No historical record tracking specified** (constitution requires change history)
- Ingredient lists supported but accuracy enforcement not specified
- **Justification**: Initial MVP focuses on menu display; nutritional data can be added in future iteration

### III. Test-First Development ✅

- Plan includes contract tests before implementation
- Integration tests for user scenarios
- Edge case testing for search, empty states, etc.

### IV. Performance & Scalability ⚠️ PARTIAL

- **Menu load target is 2-3 seconds** (constitution requires sub-second)
- Search and filtering will be efficient with Supabase indexes
- **Single location only** (constitution mentions multi-location support)
- **Justification**: 2-3 second load acceptable for initial version; can optimize later. Single location is explicit scope decision.

### V. Compliance & Standards ⚠️ DEVIATION

- **Standard web accessibility only** (constitution requires WCAG 2.1 AA minimum)
- Dietary standards supported via ingredient search
- Food labeling regulations not explicitly addressed
- **Justification**: User explicitly chose standard practices over WCAG 2.1 AA compliance

### Development Standards ✅

- TypeScript provides strong typing and code quality
- 80%+ code coverage target maintained
- Integration tests for menu workflows
- Performance benchmarks for load/search times

## Project Structure

### Documentation (this feature)

```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)

<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```
# Next.js App Router Structure
app/
├── (customer)/              # Customer-facing routes
│   ├── page.tsx            # Menu display (default route)
│   ├── recipe/[id]/        # Recipe detail pages
│   └── layout.tsx          # Customer layout
├── admin/                   # Admin portal routes
│   ├── menu-items/         # Menu item management
│   ├── recipes/            # Recipe management
│   ├── categories/         # Category management
│   └── layout.tsx          # Admin layout with auth
├── api/                     # API routes (if needed beyond Supabase)
├── layout.tsx              # Root layout
└── globals.css             # Global styles

components/
├── ui/                      # shadcn/ui components
├── customer/               # Customer-facing components
│   ├── menu-item-card.tsx
│   ├── search-bar.tsx
│   ├── category-filter.tsx
│   └── recipe-view.tsx
└── admin/                   # Admin components
    ├── menu-item-form.tsx
    ├── recipe-form.tsx
    └── category-form.tsx

lib/
├── supabase/               # Supabase client and utilities
│   ├── client.ts
│   ├── server.ts
│   └── types.ts            # Generated types
├── hooks/                   # Custom React hooks
└── utils/                   # Utility functions

tests/
├── e2e/                     # Playwright E2E tests
│   ├── customer-menu.spec.ts
│   ├── search.spec.ts
│   └── admin-crud.spec.ts
├── integration/             # Integration tests
└── unit/                    # Unit tests for utilities

supabase/
├── migrations/              # Database migrations
└── seed.sql                 # Seed data for development
```

**Structure Decision**: Next.js 14+ App Router with full-stack architecture. Supabase handles all backend concerns (database, auth, storage), eliminating need for separate backend. Customer and admin routes separated using route groups. shadcn/ui components in `/components/ui`, feature-specific components organized by domain (customer/admin).

## Phase 0: Outline & Research

1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:

   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts

_Prerequisites: research.md complete_

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/bash/update-agent-context.sh windsurf`
     **IMPORTANT**: Execute it exactly as specified above. Do not add or remove any arguments.
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/\*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach

_This section describes what the /tasks command will do - DO NOT execute during /plan_

**Task Generation Strategy**:

- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Follow TDD approach: tests before implementation
- Group by domain: Infrastructure → Database → API → UI → Admin

**Task Categories**:

1. **Project Setup** (5 tasks)
   - Initialize Next.js project with TypeScript
   - Configure Supabase client and environment
   - Set up shadcn/ui components
   - Configure testing frameworks (Playwright, Vitest)
   - Set up ESLint, Prettier, Git hooks

2. **Database & Migrations** (4 tasks)
   - Create Supabase migrations for schema
   - Apply RLS policies
   - Create storage bucket for images
   - Seed test data

3. **Type Generation & Models** (2 tasks) [P]
   - Generate TypeScript types from Supabase schema
   - Create validation schemas (Zod)

4. **Customer Menu - Tests First** (8 tasks)
   - E2E test: Browse menu by category
   - E2E test: Search by name/description
   - E2E test: Search by ingredient
   - E2E test: Filter by category
   - E2E test: View recipe details
   - E2E test: Handle empty states
   - Implement menu display components
   - Implement search functionality

5. **Admin Portal - Tests First** (10 tasks)
   - E2E test: Admin authentication
   - E2E test: Create menu item
   - E2E test: Edit menu item
   - E2E test: Delete menu item
   - E2E test: Create recipe
   - E2E test: Manage categories
   - Implement admin authentication
   - Implement menu item CRUD
   - Implement recipe CRUD
   - Implement category management

6. **Styling & UX** (3 tasks)
   - Apply bistro aesthetic styling
   - Implement responsive layouts
   - Add loading states and animations

7. **Performance & Optimization** (3 tasks)
   - Implement image optimization
   - Add search debouncing
   - Configure ISR for menu pages

8. **Validation & Documentation** (2 tasks)
   - Run quickstart validation
   - Update README with deployment instructions

**Ordering Strategy**:

- Setup tasks first (blocking)
- Database before application code
- Tests before implementation (TDD)
- Customer features before admin (higher priority)
- Styling after functionality
- Performance optimization after core features
- Mark [P] for tasks that can run in parallel

**Estimated Output**: 35-40 numbered, ordered tasks in tasks.md

**Dependency Graph**:

```
Setup → Database → Types → Tests → Implementation → Styling → Performance → Validation
```

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation

_These phases are beyond the scope of the /plan command_

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking

_Fill ONLY if Constitution Check has violations that must be justified_

| Violation                   | Why Needed                        | Simpler Alternative Rejected Because                               |
| --------------------------- | --------------------------------- | ------------------------------------------------------------------ |
| No nutritional data         | MVP focuses on menu display first | Adding nutritional tracking would delay launch; can be added in v2 |
| 2-3 second load time        | Acceptable for initial version    | Sub-second requires CDN/caching infrastructure beyond MVP scope    |
| Standard accessibility only | User explicitly chose this scope  | WCAG 2.1 AA compliance requires additional testing/tooling budget  |

## Progress Tracking

_This checklist is updated during execution flow_

**Phase Status**:

- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [x] Phase 3: Tasks generated (/tasks command) - 67 tasks created
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:

- [x] Initial Constitution Check: PASS (with documented deviations)
- [x] Post-Design Constitution Check: PASS (deviations justified in Complexity Tracking)
- [x] All NEEDS CLARIFICATION resolved (via research.md)
- [x] Complexity deviations documented

**Artifacts Generated**:

- [x] research.md - Technology decisions and rationale
- [x] data-model.md - Database schema and entities
- [x] contracts/supabase-api.md - API contracts and specifications
- [x] quickstart.md - User scenario validation guide
- [x] tasks.md - 67 ordered, actionable implementation tasks
- [x] .windsurf/rules/specify-rules.md - Agent context updated

---

_Based on Constitution v2.1.1 - See `/memory/constitution.md`_
