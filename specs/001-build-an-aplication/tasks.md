# Tasks: Interactive Bistro Menu Display

**Feature**: 001-build-an-aplication  
**Input**: Design documents from `/specs/001-build-an-aplication/`  
**Prerequisites**: plan.md, research.md, data-model.md, contracts/, quickstart.md

## Tech Stack Summary

- **Framework**: Next.js 14+ (App Router), React 18, TypeScript
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **UI**: shadcn/ui, Tailwind CSS
- **Testing**: Playwright (E2E), Vitest (unit), React Testing Library

## Path Conventions

```
app/                    # Next.js App Router pages
components/             # React components
lib/                    # Utilities and Supabase client
tests/                  # All test files
supabase/              # Database migrations
```

---

## Phase 3.1: Project Setup

- [x] **T001** Initialize Next.js 14 project with TypeScript and App Router ✅
  - Run `npx create-next-app@latest menu-maker --typescript --tailwind --app --no-src-dir`
  - Configure `tsconfig.json` with strict mode
  - Set up `next.config.js` with image domains for Supabase Storage

- [x] **T002** Configure Supabase client and environment ✅
  - Install: `npm install @supabase/supabase-js @supabase/ssr`
  - Create `lib/supabase/client.ts` for client-side Supabase client
  - Create `lib/supabase/server.ts` for server-side Supabase client
  - Create `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Add `.env.local` to `.gitignore`

- [x] **T003** [P] Set up shadcn/ui component library ✅
  - Run `npx shadcn-ui@latest init`
  - Configure `components.json` for Tailwind
  - Install initial components: `button`, `input`, `card`, `dialog`, `form`, `select`, `textarea`
  - Create `components/ui/` directory structure

- [x] **T004** [P] Configure testing frameworks ✅
  - Install Playwright: `npm install -D @playwright/test`
  - Run `npx playwright install`
  - Create `playwright.config.ts` with base URL and test directories
  - Install Vitest: `npm install -D vitest @vitejs/plugin-react`
  - Create `vitest.config.ts`
  - Install React Testing Library: `npm install -D @testing-library/react @testing-library/jest-dom`

- [x] **T005** [P] Set up code quality tools ✅
  - Install ESLint and Prettier: `npm install -D eslint prettier eslint-config-prettier`
  - Create `.eslintrc.json` with Next.js and TypeScript rules
  - Create `.prettierrc` with formatting rules
  - Add lint scripts to `package.json`: `lint`, `format`
  - Install Husky for pre-commit hooks: `npx husky-init`

---

## Phase 3.2: Database & Infrastructure

- [x] **T006** Create Supabase project and configure locally ✅
  - Create Supabase project via dashboard or CLI
  - Install Supabase CLI: `npm install -D supabase`
  - Run `npx supabase init` to create `supabase/` directory
  - Link to remote project: `npx supabase link --project-ref <ref>`

- [x] **T007** Create database schema migration ✅
  - Create `supabase/migrations/20250929000001_initial_schema.sql`
  - Add tables: `categories`, `menu_items`, `recipes` (from data-model.md)
  - Add indexes: GIN for full-text search, B-tree for foreign keys
  - Add triggers for `updated_at` timestamps
  - Add constraints: foreign keys, unique constraints, check constraints

- [x] **T008** Create RLS policies migration ✅
  - Create `supabase/migrations/20250929000002_rls_policies.sql`
  - Enable RLS on all tables
  - Add public read policies for anonymous users
  - Add admin write policies checking JWT role
  - Test policies with sample queries

- [x] **T009** Create storage bucket for menu images ✅
  - Create `supabase/migrations/20250929000003_storage_bucket.sql`
  - Create `menu-images` bucket with public read access
  - Set max file size to 5MB
  - Restrict MIME types to image/jpeg, image/png, image/webp
  - Add RLS policies for admin upload/delete

- [x] **T010** Create seed data for development ✅
  - Create `supabase/seed.sql` with sample data
  - Add 3-5 categories (Appetizers, Entrees, Desserts, Beverages, Sides)
  - Add 15-20 menu items across categories
  - Add 5-10 recipes for menu items
  - Add test admin user with role metadata
  - Include sample images (use placeholder URLs)

- [x] **T011** Apply migrations and generate TypeScript types ✅
  - Run `npx supabase db push` to apply migrations
  - Run `npx supabase gen types typescript --local > lib/supabase/types.ts`
  - Verify types match data-model.md specifications
  - Create type aliases in `lib/supabase/types.ts` for convenience

---

## Phase 3.3: Type Definitions & Validation

- [x] **T012** [P] Create Zod validation schemas ✅
  - Create `lib/validations/menu-item.ts` with `menuItemSchema`
  - Create `lib/validations/recipe.ts` with `recipeSchema` and `ingredientSchema`
  - Create `lib/validations/category.ts` with `categorySchema`
  - Export all schemas from `lib/validations/index.ts`
  - Add validation error messages

- [x] **T013** [P] Create custom React hooks for data fetching ✅
  - Create `lib/hooks/use-menu-items.ts` for fetching menu items
  - Create `lib/hooks/use-categories.ts` for fetching categories
  - Create `lib/hooks/use-recipe.ts` for fetching recipe details
  - Create `lib/hooks/use-search.ts` for debounced search
  - Add loading and error states to all hooks

---

## Phase 3.4: Customer Menu - Tests First (TDD)

**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation in Phase 3.5**

- [x] **T014** [P] E2E test: Browse menu by category ✅
  - Create `tests/e2e/customer-menu.spec.ts`
  - Test: Navigate to homepage
  - Test: Verify categories displayed in order
  - Test: Verify menu items grouped by category
  - Test: Verify each item shows name, description, image/placeholder
  - Test: Verify responsive layout on mobile/tablet/desktop
  - **Expected**: Test FAILS (page not implemented)

- [x] **T015** [P] E2E test: Search by name and description ✅
  - Create `tests/e2e/search.spec.ts`
  - Test: Type "salmon" in search box
  - Test: Wait for debounce (300ms)
  - Test: Verify results contain "salmon" in name or description
  - Test: Verify search completes within 500ms
  - Test: Clear search shows all items
  - **Expected**: Test FAILS (search not implemented)

- [x] **T016** [P] E2E test: Search by ingredient ✅
  - Add to `tests/e2e/search.spec.ts`
  - Test: Type "gluten-free" in search
  - Test: Verify results include items with gluten-free ingredients
  - Test: Test case-insensitive search
  - Test: Test partial matches
  - **Expected**: Test FAILS (ingredient search not implemented)

- [x] **T017** [P] E2E test: Filter by category ✅
  - Add to `tests/e2e/customer-menu.spec.ts`
  - Test: Select "Desserts" from category filter
  - Test: Verify only dessert items displayed
  - Test: Clear filter shows all items
  - Test: Combine filter with search
  - **Expected**: Test FAILS (filter not implemented)

- [x] **T018** [P] E2E test: View recipe details ✅
  - Add to `tests/e2e/customer-menu.spec.ts`
  - Test: Click recipe link on menu item
  - Test: Verify recipe page shows ingredients list
  - Test: Verify instructions displayed as steps
  - Test: Verify prep time shown (if available)
  - Test: Navigate back to menu
  - **Expected**: Test FAILS (recipe page not implemented)

- [x] **T019** [P] E2E test: Handle empty states ✅
  - Add to `tests/e2e/search.spec.ts`
  - Test: Search for non-existent item
  - Test: Verify "No items found" message displayed
  - Test: Verify helpful suggestion text
  - Test: Verify no broken UI
  - **Expected**: Test FAILS (empty state not implemented)

- [x] **T020** [P] Component test: MenuItemCard ✅
  - Create `tests/unit/menu-item-card.test.tsx`
  - Test: Renders with all props
  - Test: Shows placeholder when no image
  - Test: Shows recipe link only when recipe exists
  - Test: Truncates long descriptions (if implemented)
  - **Expected**: Test FAILS (component not created)

- [x] **T021** [P] Component test: SearchBar with debounce ✅
  - Create `tests/unit/search-bar.test.tsx`
  - Test: Renders input field
  - Test: Debounces input by 300ms
  - Test: Calls onSearch callback with query
  - Test: Shows loading indicator during search
  - **Expected**: Test FAILS (component not created)

---

## Phase 3.5: Customer Menu - Implementation (ONLY after tests are failing)

- [x] **T022** Create customer layout and homepage ✅
  - Create `app/(customer)/layout.tsx` with bistro-themed header
  - Create `app/(customer)/page.tsx` for menu display
  - Add global styles in `app/globals.css` for bistro aesthetic
  - Configure fonts (elegant serif for headings, sans-serif for body)
  - Add metadata for SEO

- [x] **T023** [P] Implement MenuItemCard component ✅
  - Create `components/customer/menu-item-card.tsx`
  - Display: name, description, image with Next.js Image
  - Show placeholder for missing images
  - Conditionally render recipe link
  - Style with Tailwind for elegant bistro look
  - Make tests in T020 PASS

- [x] **T024** [P] Implement SearchBar component with debounce ✅
  - Create `components/customer/search-bar.tsx`
  - Use `use-search` hook for debounced input (300ms)
  - Add search icon from Lucide
  - Show loading spinner during search
  - Style with shadcn/ui Input component
  - Make tests in T021 PASS

- [x] **T025** [P] Implement CategoryFilter component ✅
  - Create `components/customer/category-filter.tsx`
  - Fetch categories with `use-categories` hook
  - Render as dropdown or button group
  - Support "All Categories" option
  - Style with shadcn/ui Select component

- [x] **T026** Implement menu display page with search and filter ✅
  - Update `app/(customer)/page.tsx`
  - Fetch menu items with `use-menu-items` hook
  - Integrate SearchBar and CategoryFilter components
  - Group items by category
  - Render MenuItemCard for each item
  - Handle loading and error states
  - Make tests in T014, T015, T017 PASS

- [x] **T027** Implement ingredient search functionality ✅
  - Update `lib/hooks/use-search.ts` to support ingredient search
  - Query recipes table with JSONB contains
  - Merge results with name/description search
  - Make tests in T016 PASS

- [x] **T028** Implement empty state handling ✅
  - Create `components/customer/empty-state.tsx`
  - Show when search/filter returns no results
  - Display helpful message and suggestions
  - Add "Clear filters" button
  - Make tests in T019 PASS

- [x] **T029** Create recipe detail page ✅
  - Create `app/(customer)/recipe/[id]/page.tsx`
  - Fetch recipe with `use-recipe` hook
  - Display menu item name, description, image
  - Render ingredients list with amounts
  - Render instructions as numbered steps
  - Show prep time if available
  - Add back button to menu
  - Make tests in T018 PASS

- [x] **T030** Optimize images and performance ✅
  - Configure Next.js Image with Supabase Storage domains
  - Add blur placeholders for images
  - Implement lazy loading for images
  - Add loading skeletons for menu items
  - Verify menu loads within 2-3 seconds

---

## Phase 3.6: Admin Portal - Tests First (TDD)

**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation in Phase 3.7**

- [ ] **T031** [P] E2E test: Admin authentication
  - Create `tests/e2e/admin-auth.spec.ts`
  - Test: Navigate to `/admin` redirects to login
  - Test: Login with valid credentials
  - Test: Redirect to admin dashboard after login
  - Test: Invalid credentials show error
  - Test: Session persists across refreshes
  - Test: Logout clears session
  - **Expected**: Test FAILS (auth not implemented)

- [ ] **T032** [P] E2E test: Create menu item
  - Create `tests/e2e/admin-crud.spec.ts`
  - Test: Navigate to menu items section
  - Test: Click "Add New Item"
  - Test: Fill form with valid data
  - Test: Upload image
  - Test: Submit form
  - Test: Verify item appears in list
  - Test: Verify item visible in customer menu
  - **Expected**: Test FAILS (CRUD not implemented)

- [ ] **T033** [P] E2E test: Edit menu item
  - Add to `tests/e2e/admin-crud.spec.ts`
  - Test: Click edit on existing item
  - Test: Modify name and description
  - Test: Save changes
  - Test: Verify changes in list and customer menu
  - **Expected**: Test FAILS (edit not implemented)

- [ ] **T034** [P] E2E test: Delete menu item
  - Add to `tests/e2e/admin-crud.spec.ts`
  - Test: Click delete on item
  - Test: Confirm in modal
  - Test: Verify item removed from list
  - Test: Verify item not in customer menu
  - **Expected**: Test FAILS (delete not implemented)

- [ ] **T035** [P] E2E test: Create recipe
  - Add to `tests/e2e/admin-crud.spec.ts`
  - Test: Navigate to recipes section
  - Test: Select menu item without recipe
  - Test: Add multiple ingredients
  - Test: Add multiple instruction steps
  - Test: Set prep time
  - Test: Save recipe
  - Test: Verify recipe link appears in customer menu
  - **Expected**: Test FAILS (recipe CRUD not implemented)

- [ ] **T036** [P] E2E test: Manage categories
  - Add to `tests/e2e/admin-crud.spec.ts`
  - Test: Navigate to categories section
  - Test: Create new category
  - Test: Reorder categories by display_order
  - Test: Verify order in customer menu
  - Test: Cannot delete category with items
  - **Expected**: Test FAILS (category management not implemented)

---

## Phase 3.7: Admin Portal - Implementation (ONLY after tests are failing)

- [ ] **T037** Implement admin authentication middleware
  - Create `lib/auth/admin-guard.ts` to check user role
  - Create `app/admin/layout.tsx` with auth check
  - Redirect unauthenticated users to login
  - Verify JWT contains `role: 'admin'`
  - Add admin navigation sidebar

- [ ] **T038** Create admin login page
  - Create `app/admin/login/page.tsx`
  - Use shadcn/ui Form components
  - Call `supabase.auth.signInWithPassword()`
  - Handle errors and display messages
  - Redirect to dashboard on success
  - Make tests in T031 PASS

- [ ] **T039** Create admin dashboard page
  - Create `app/admin/page.tsx`
  - Show summary stats (total items, categories, recipes)
  - Add quick links to management sections
  - Display recent changes

- [ ] **T040** [P] Implement MenuItemForm component
  - Create `components/admin/menu-item-form.tsx`
  - Use React Hook Form with Zod validation
  - Fields: name, description, category, image upload
  - Image upload to Supabase Storage
  - Show upload progress
  - Handle validation errors

- [ ] **T041** [P] Implement RecipeForm component
  - Create `components/admin/recipe-form.tsx`
  - Dynamic ingredient fields (add/remove)
  - Dynamic instruction fields (add/remove)
  - Prep time input
  - Use React Hook Form with Zod validation

- [ ] **T042** [P] Implement CategoryForm component
  - Create `components/admin/category-form.tsx`
  - Fields: name, display_order
  - Simple form with validation

- [ ] **T043** Create menu items management page
  - Create `app/admin/menu-items/page.tsx`
  - List all menu items with pagination (20 per page)
  - Add "Create New" button
  - Edit and delete actions for each item
  - Filter by category
  - Search by name

- [ ] **T044** Create menu item create/edit pages
  - Create `app/admin/menu-items/new/page.tsx` for creation
  - Create `app/admin/menu-items/[id]/edit/page.tsx` for editing
  - Use MenuItemForm component
  - Handle image upload to Supabase Storage
  - Optimistic UI updates
  - Make tests in T032, T033 PASS

- [ ] **T045** Implement menu item delete functionality
  - Add delete action to menu items list
  - Show confirmation dialog (shadcn/ui AlertDialog)
  - Delete from database (cascades to recipe)
  - Delete image from storage
  - Show success/error toast
  - Make tests in T034 PASS

- [ ] **T046** Create recipes management page
  - Create `app/admin/recipes/page.tsx`
  - List menu items with/without recipes
  - Add "Create Recipe" for items without one
  - Edit and delete actions for existing recipes

- [ ] **T047** Create recipe create/edit pages
  - Create `app/admin/recipes/new/page.tsx` for creation
  - Create `app/admin/recipes/[id]/edit/page.tsx` for editing
  - Use RecipeForm component
  - Handle dynamic ingredient/instruction arrays
  - Make tests in T035 PASS

- [ ] **T048** Create categories management page
  - Create `app/admin/categories/page.tsx`
  - List all categories with display order
  - Add "Create New" button
  - Edit and delete actions
  - Drag-and-drop reordering (optional)
  - Make tests in T036 PASS

- [ ] **T049** Create category create/edit pages
  - Create `app/admin/categories/new/page.tsx` for creation
  - Create `app/admin/categories/[id]/edit/page.tsx` for editing
  - Use CategoryForm component
  - Prevent deletion of categories with menu items

---

## Phase 3.8: Styling & UX Polish

- [ ] **T050** [P] Apply bistro aesthetic styling
  - Update `app/globals.css` with custom CSS variables
  - Choose elegant color palette (warm neutrals, gold accents)
  - Add custom fonts (Google Fonts: Playfair Display + Inter)
  - Style customer menu with sophisticated look
  - Add subtle animations and transitions

- [ ] **T051** [P] Implement responsive layouts
  - Test on mobile (320px-768px)
  - Test on tablet (768px-1024px)
  - Test on desktop (1024px+)
  - Adjust grid layouts for different screens
  - Ensure touch-friendly tap targets on mobile

- [ ] **T052** [P] Add loading states and animations
  - Create loading skeletons for menu items
  - Add spinner for search results
  - Add progress bar for image uploads
  - Add fade-in animations for content
  - Add smooth transitions for filters

- [ ] **T053** [P] Implement toast notifications
  - Install `sonner` or use shadcn/ui toast
  - Add success toasts for admin actions
  - Add error toasts for failures
  - Add loading toasts for async operations

---

## Phase 3.9: Performance & Optimization

- [ ] **T054** Implement search debouncing
  - Verify 300ms debounce in `use-search` hook
  - Cancel pending requests on new input
  - Show loading indicator during search
  - Measure and verify <500ms search response time

- [ ] **T055** Configure ISR for menu pages
  - Add `revalidate` to menu page for ISR
  - Set revalidation time to 60 seconds
  - Test that updates appear after revalidation
  - Verify improved load times

- [ ] **T056** Optimize image loading
  - Configure Next.js Image with proper sizes
  - Add blur placeholders for all images
  - Lazy load images below fold
  - Compress uploaded images before storage

- [ ] **T057** [P] Run Lighthouse performance audit
  - Run Lighthouse on customer menu page
  - Target: Performance score >80
  - Target: Accessibility score >90
  - Target: Best Practices score >90
  - Fix any critical issues identified

---

## Phase 3.10: Testing & Validation

- [ ] **T058** [P] Write unit tests for utility functions
  - Create `tests/unit/validations.test.ts`
  - Test Zod schemas with valid/invalid data
  - Create `tests/unit/hooks.test.ts`
  - Test custom hooks with mock data
  - Target: 80%+ code coverage

- [ ] **T059** Run full E2E test suite
  - Run `npm run test:e2e`
  - Verify all tests pass
  - Fix any flaky tests
  - Add test retry logic if needed

- [ ] **T060** Execute quickstart validation scenarios
  - Follow `quickstart.md` step by step
  - Validate all 12 user scenarios
  - Document any issues found
  - Verify performance targets met

- [ ] **T061** [P] Accessibility testing
  - Run axe DevTools on all pages
  - Test keyboard navigation (Tab, Enter, Esc)
  - Test with screen reader (VoiceOver/NVDA)
  - Fix any accessibility issues found
  - Verify semantic HTML usage

- [ ] **T062** [P] Cross-browser testing
  - Test on Chrome, Firefox, Safari, Edge
  - Test on iOS Safari and Android Chrome
  - Fix any browser-specific issues
  - Verify consistent experience

---

## Phase 3.11: Documentation & Deployment

- [ ] **T063** [P] Create comprehensive README
  - Add project description and features
  - Add prerequisites and setup instructions
  - Add environment variable documentation
  - Add development and deployment commands
  - Add troubleshooting section

- [ ] **T064** [P] Document API and database schema
  - Create `docs/database.md` with schema diagram
  - Create `docs/api.md` with endpoint documentation
  - Document RLS policies and security model
  - Add examples for common queries

- [ ] **T065** Create deployment guide
  - Document Vercel deployment steps
  - Document Supabase project setup
  - Document environment variable configuration
  - Add CI/CD pipeline (GitHub Actions)
  - Add production checklist

- [ ] **T066** Deploy to staging environment
  - Create Vercel project
  - Link to GitHub repository
  - Configure environment variables
  - Deploy and test staging URL
  - Run smoke tests on staging

- [ ] **T067** Final validation and launch
  - Run full test suite on staging
  - Perform UAT with stakeholders
  - Fix any critical bugs
  - Deploy to production
  - Monitor for errors

---

## Dependencies

### Critical Path

```
Setup (T001-T005)
  → Database (T006-T011)
  → Types (T012-T013)
  → Customer Tests (T014-T021)
  → Customer Implementation (T022-T030)
  → Admin Tests (T031-T036)
  → Admin Implementation (T037-T049)
  → Polish (T050-T053)
  → Performance (T054-T057)
  → Validation (T058-T062)
  → Deployment (T063-T067)
```

### Key Blocking Dependencies

- T006-T011 (Database) blocks all feature work
- T012-T013 (Types) blocks component development
- T014-T021 (Customer Tests) MUST complete before T022-T030
- T031-T036 (Admin Tests) MUST complete before T037-T049
- T022-T030 (Customer Implementation) should complete before admin work
- T058-T062 (Validation) blocks T066-T067 (Deployment)

### Parallel Execution Opportunities

- T003, T004, T005 can run in parallel (different concerns)
- T012, T013 can run in parallel (different files)
- T014-T021 can ALL run in parallel (different test files)
- T023, T024, T025 can run in parallel (different components)
- T031-T036 can ALL run in parallel (different test files)
- T040, T041, T042 can run in parallel (different components)
- T050, T051, T052, T053 can run in parallel (different concerns)
- T058, T061, T062, T063, T064 can run in parallel (independent tasks)

---

## Parallel Execution Examples

### Example 1: Run all customer E2E tests together

```bash
# Launch T014-T019 in parallel
npm run test:e2e -- tests/e2e/customer-menu.spec.ts tests/e2e/search.spec.ts
```

### Example 2: Build customer components in parallel

```bash
# T023, T024, T025 can be developed simultaneously by different developers
# or by AI agents in parallel
Task 1: "Implement MenuItemCard component in components/customer/menu-item-card.tsx"
Task 2: "Implement SearchBar component in components/customer/search-bar.tsx"
Task 3: "Implement CategoryFilter component in components/customer/category-filter.tsx"
```

### Example 3: Run all admin E2E tests together

```bash
# Launch T031-T036 in parallel
npm run test:e2e -- tests/e2e/admin-auth.spec.ts tests/e2e/admin-crud.spec.ts
```

---

## Validation Checklist

### Pre-Implementation

- [x] All contracts from `contracts/` have corresponding test tasks
- [x] All entities from `data-model.md` have model/type tasks
- [x] All user scenarios from `quickstart.md` have test tasks
- [x] All tests come before implementation (TDD enforced)
- [x] Parallel tasks are truly independent (different files)
- [x] Each task specifies exact file path

### Post-Implementation

- [ ] All E2E tests pass
- [ ] 80%+ code coverage achieved
- [ ] Performance targets met (load <3s, search <500ms)
- [ ] Accessibility standards met
- [ ] All quickstart scenarios validated
- [ ] No critical bugs or regressions
- [ ] Documentation complete
- [ ] Successfully deployed to production

---

## Notes

- **[P]** indicates tasks that can run in parallel (different files, no dependencies)
- **TDD is enforced**: All test tasks (T014-T021, T031-T036) MUST be completed and failing before implementation tasks
- Commit after each completed task for better tracking
- Run tests frequently during implementation to catch regressions early
- Follow the constitution principles: Test-First Development, User-Centric Design, Performance & Scalability

---

## Estimated Timeline

- **Phase 3.1-3.3** (Setup & Database): 1-2 days
- **Phase 3.4-3.5** (Customer Menu): 3-4 days
- **Phase 3.6-3.7** (Admin Portal): 4-5 days
- **Phase 3.8-3.9** (Polish & Performance): 2-3 days
- **Phase 3.10-3.11** (Testing & Deployment): 2-3 days

**Total Estimated**: 12-17 days for single developer, or 7-10 days with parallel execution

---

**Next Step**: Begin with T001 and proceed sequentially through setup tasks, then leverage parallel execution for tests and independent components.
