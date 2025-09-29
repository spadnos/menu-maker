# Quickstart Guide: Interactive Bistro Menu Display

**Feature**: 001-build-an-aplication  
**Date**: 2025-09-29  
**Purpose**: Validate implementation against user scenarios

## Prerequisites

- Node.js 18+ installed
- Supabase project created
- Environment variables configured
- Database migrations applied
- Seed data loaded

## Environment Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Run Database Migrations

```bash
# Using Supabase CLI
npx supabase db push

# Or apply migrations manually via Supabase Dashboard
```

### 4. Seed Test Data

```bash
# Run seed script
npm run db:seed

# Or apply seed.sql via Supabase Dashboard
```

### 5. Start Development Server

```bash
npm run dev
```

Application should be running at `http://localhost:3000`

---

## User Scenario Validation

### Scenario 1: Browse Menu by Category

**Goal**: Customer views menu organized by categories

**Steps**:

1. Navigate to `http://localhost:3000`
2. Observe menu items displayed on page
3. Verify items are grouped by category sections (Appetizers, Entrees, Desserts, etc.)
4. Verify each category shows its name as a heading
5. Verify items within each category are displayed with name, description, and image (if available)

**Expected Results**:

- ✅ Page loads within 2-3 seconds
- ✅ Categories appear in correct display order
- ✅ Menu items are grouped under their categories
- ✅ Items without images show placeholder or elegant empty state
- ✅ Layout is responsive on mobile/tablet/desktop

**Validation**:

```bash
# Run E2E test
npm run test:e2e -- tests/e2e/customer-menu.spec.ts
```

---

### Scenario 2: Search Menu by Name

**Goal**: Customer searches for "salmon" and finds relevant dishes

**Steps**:

1. Navigate to `http://localhost:3000`
2. Locate search input field
3. Type "salmon" into search box
4. Wait for debounced search (300ms after typing stops)
5. Observe search results

**Expected Results**:

- ✅ Search input is visible and accessible
- ✅ Results update automatically after 300ms pause
- ✅ All items with "salmon" in name or description appear
- ✅ Search completes within 500ms
- ✅ Items maintain category information
- ✅ Empty search shows all items again

**Validation**:

```bash
# Run E2E test
npm run test:e2e -- tests/e2e/search.spec.ts
```

---

### Scenario 3: Search by Ingredient

**Goal**: Customer searches for items containing specific ingredients

**Steps**:

1. Navigate to `http://localhost:3000`
2. Type "gluten-free" into search box
3. Observe results showing items with gluten-free ingredients
4. Clear search and type "dairy"
5. Observe results showing items with dairy ingredients

**Expected Results**:

- ✅ Search finds items by ingredient name
- ✅ Results include items where ingredient appears in recipe
- ✅ Search is case-insensitive
- ✅ Partial matches work (e.g., "gluten" finds "gluten-free")

**Validation**:

```bash
# Run E2E test
npm run test:e2e -- tests/e2e/search.spec.ts --grep "ingredient"
```

---

### Scenario 4: Filter by Category

**Goal**: Customer filters menu to show only desserts

**Steps**:

1. Navigate to `http://localhost:3000`
2. Locate category filter dropdown or buttons
3. Select "Desserts" category
4. Observe only dessert items displayed

**Expected Results**:

- ✅ Category filter is visible and intuitive
- ✅ Only items from selected category appear
- ✅ Filter can be cleared to show all items
- ✅ Filter works in combination with search

**Validation**:

```bash
# Run E2E test
npm run test:e2e -- tests/e2e/customer-menu.spec.ts --grep "filter"
```

---

### Scenario 5: View Recipe Details

**Goal**: Customer clicks recipe link and views full recipe

**Steps**:

1. Navigate to `http://localhost:3000`
2. Find a menu item with a recipe link
3. Click the recipe link
4. Observe recipe page with ingredients and instructions
5. Click back/close to return to menu

**Expected Results**:

- ✅ Recipe link only appears for items with recipes
- ✅ Recipe page shows menu item name, description, and image
- ✅ Ingredients list is displayed with amounts
- ✅ Instructions are shown as numbered steps
- ✅ Prep time is displayed (if available)
- ✅ Navigation back to menu works

**Validation**:

```bash
# Run E2E test
npm run test:e2e -- tests/e2e/customer-menu.spec.ts --grep "recipe"
```

---

### Scenario 6: Handle No Search Results

**Goal**: Customer searches for non-existent item and sees helpful message

**Steps**:

1. Navigate to `http://localhost:3000`
2. Type "xyz123nonexistent" into search box
3. Wait for search to complete

**Expected Results**:

- ✅ "No items found" message is displayed
- ✅ Message suggests trying different search terms
- ✅ No error or broken UI
- ✅ Search can be cleared to show all items again

**Validation**:

```bash
# Run E2E test
npm run test:e2e -- tests/e2e/search.spec.ts --grep "no results"
```

---

## Admin Portal Validation

### Scenario 7: Admin Login

**Goal**: Admin user logs into admin portal

**Steps**:

1. Navigate to `http://localhost:3000/admin`
2. Observe redirect to login page (if not authenticated)
3. Enter admin credentials
4. Click "Sign In"
5. Observe redirect to admin dashboard

**Expected Results**:

- ✅ Unauthenticated users redirected to login
- ✅ Login form validates email/password
- ✅ Successful login redirects to admin dashboard
- ✅ Invalid credentials show error message
- ✅ Session persists across page refreshes

**Test Credentials**:

- Email: `admin@test.com`
- Password: `test123` (from seed data)

**Validation**:

```bash
# Run E2E test
npm run test:e2e -- tests/e2e/admin-auth.spec.ts
```

---

### Scenario 8: Create Menu Item

**Goal**: Admin creates a new menu item

**Steps**:

1. Log in to admin portal
2. Navigate to "Menu Items" section
3. Click "Add New Item" button
4. Fill in form:
   - Name: "Test Dish"
   - Description: "A test description"
   - Category: Select "Entrees"
   - Image: Upload image (optional)
5. Click "Save"
6. Observe new item appears in list

**Expected Results**:

- ✅ Form validates required fields
- ✅ Category dropdown populated from database
- ✅ Image upload shows progress
- ✅ Success message displayed after save
- ✅ New item appears in customer menu immediately
- ✅ Optimistic UI update (item appears before server confirms)

**Validation**:

```bash
# Run E2E test
npm run test:e2e -- tests/e2e/admin-crud.spec.ts --grep "create menu item"
```

---

### Scenario 9: Edit Menu Item

**Goal**: Admin updates an existing menu item

**Steps**:

1. Log in to admin portal
2. Navigate to "Menu Items" section
3. Click "Edit" on an existing item
4. Modify name to "Updated Test Dish"
5. Click "Save"
6. Observe changes reflected in list and customer menu

**Expected Results**:

- ✅ Edit form pre-populated with current values
- ✅ Changes saved successfully
- ✅ Updated_at timestamp updated
- ✅ Changes visible in customer menu

**Validation**:

```bash
# Run E2E test
npm run test:e2e -- tests/e2e/admin-crud.spec.ts --grep "edit menu item"
```

---

### Scenario 10: Delete Menu Item

**Goal**: Admin deletes a menu item

**Steps**:

1. Log in to admin portal
2. Navigate to "Menu Items" section
3. Click "Delete" on a test item
4. Confirm deletion in modal
5. Observe item removed from list

**Expected Results**:

- ✅ Confirmation modal prevents accidental deletion
- ✅ Item removed from database
- ✅ Associated recipe deleted (cascade)
- ✅ Image deleted from storage
- ✅ Item no longer appears in customer menu

**Validation**:

```bash
# Run E2E test
npm run test:e2e -- tests/e2e/admin-crud.spec.ts --grep "delete menu item"
```

---

### Scenario 11: Create Recipe

**Goal**: Admin adds a recipe to a menu item

**Steps**:

1. Log in to admin portal
2. Navigate to "Recipes" section
3. Click "Add Recipe" for a menu item without one
4. Fill in form:
   - Ingredients: Add multiple with name and amount
   - Instructions: Add numbered steps
   - Prep time: 30 minutes
5. Click "Save"
6. Observe recipe link appears on customer menu

**Expected Results**:

- ✅ Only menu items without recipes shown in dropdown
- ✅ Can add/remove ingredient rows dynamically
- ✅ Can add/remove instruction steps dynamically
- ✅ Form validates at least 1 ingredient and 1 instruction
- ✅ Recipe saved successfully
- ✅ Recipe link appears on customer menu item

**Validation**:

```bash
# Run E2E test
npm run test:e2e -- tests/e2e/admin-crud.spec.ts --grep "create recipe"
```

---

### Scenario 12: Manage Categories

**Goal**: Admin creates and reorders categories

**Steps**:

1. Log in to admin portal
2. Navigate to "Categories" section
3. Click "Add Category"
4. Enter name: "Beverages"
5. Set display order: 10
6. Click "Save"
7. Drag to reorder categories (if drag-drop implemented)
8. Observe new category appears in customer menu

**Expected Results**:

- ✅ New category created successfully
- ✅ Category appears in correct order on customer menu
- ✅ Cannot delete category with menu items
- ✅ Display order can be updated

**Validation**:

```bash
# Run E2E test
npm run test:e2e -- tests/e2e/admin-crud.spec.ts --grep "manage categories"
```

---

## Performance Validation

### Load Time Test

**Goal**: Verify menu loads within 2-3 seconds

**Steps**:

1. Clear browser cache
2. Open DevTools Network tab
3. Navigate to `http://localhost:3000`
4. Measure time to "DOMContentLoaded"

**Expected Results**:

- ✅ Initial HTML loads < 500ms
- ✅ Full page interactive < 2-3 seconds
- ✅ Images lazy load as user scrolls
- ✅ Lighthouse Performance score > 80

**Validation**:

```bash
# Run Lighthouse
npm run lighthouse

# Or run performance test
npm run test:performance
```

---

### Search Performance Test

**Goal**: Verify search completes within 500ms

**Steps**:

1. Navigate to `http://localhost:3000`
2. Open DevTools Network tab
3. Type search term
4. Measure time from last keystroke to results displayed

**Expected Results**:

- ✅ Debounce delays search by 300ms
- ✅ API call completes < 200ms
- ✅ Total time from typing to results < 500ms

**Validation**:

```bash
# Run performance test
npm run test:performance -- --grep "search"
```

---

## Accessibility Validation

### Keyboard Navigation Test

**Goal**: Verify menu is navigable via keyboard

**Steps**:

1. Navigate to `http://localhost:3000`
2. Use Tab key to navigate through elements
3. Use Enter/Space to activate buttons/links
4. Verify focus indicators are visible

**Expected Results**:

- ✅ All interactive elements reachable via Tab
- ✅ Focus indicators clearly visible
- ✅ Logical tab order (top to bottom, left to right)
- ✅ Search input accessible via keyboard
- ✅ Recipe links activatable via Enter

**Validation**:

```bash
# Run accessibility test
npm run test:a11y
```

---

### Screen Reader Test

**Goal**: Verify menu is usable with screen reader

**Steps**:

1. Enable screen reader (VoiceOver on Mac, NVDA on Windows)
2. Navigate to `http://localhost:3000`
3. Listen to announcements as you navigate

**Expected Results**:

- ✅ Page title announced
- ✅ Category headings announced
- ✅ Menu item names and descriptions read
- ✅ Images have alt text
- ✅ Search input has label
- ✅ Buttons have descriptive labels

**Validation**:

```bash
# Run accessibility test
npm run test:a11y
```

---

## Error Handling Validation

### Database Connection Error

**Goal**: Verify graceful handling of database errors

**Steps**:

1. Temporarily break Supabase connection (invalid URL)
2. Navigate to `http://localhost:3000`
3. Observe error handling

**Expected Results**:

- ✅ Error message displayed (not raw error)
- ✅ User can retry
- ✅ No application crash
- ✅ Error logged for debugging

---

### Image Load Failure

**Goal**: Verify handling of missing/broken images

**Steps**:

1. Create menu item with invalid image URL
2. Navigate to customer menu
3. Observe placeholder displayed

**Expected Results**:

- ✅ Placeholder image shown
- ✅ No broken image icon
- ✅ Layout not broken
- ✅ Alt text displayed

---

## Cleanup

After testing, clean up test data:

```bash
# Reset database to clean state
npm run db:reset

# Or manually delete test records via Supabase Dashboard
```

---

## Success Criteria

All scenarios must pass for feature to be considered complete:

- [ ] All 12 user scenarios validated
- [ ] Performance targets met (load <3s, search <500ms)
- [ ] Accessibility tests pass
- [ ] Error handling verified
- [ ] 80%+ code coverage achieved
- [ ] No critical bugs or regressions

---

## Troubleshooting

### Menu not loading

- Check Supabase connection in `.env.local`
- Verify migrations applied: `npx supabase db push`
- Check browser console for errors

### Search not working

- Verify GIN indexes created on database
- Check network tab for API errors
- Verify RLS policies allow public read

### Admin portal access denied

- Verify user has `role: 'admin'` in JWT
- Check RLS policies in Supabase Dashboard
- Verify authentication working: `supabase.auth.getSession()`

### Images not displaying

- Verify Storage bucket created and public
- Check image URLs in database
- Verify RLS policies on storage bucket

---

## Next Steps

After quickstart validation passes:

1. Run full test suite: `npm run test`
2. Deploy to staging environment
3. Perform UAT with stakeholders
4. Deploy to production
