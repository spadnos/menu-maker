# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Menu Maker is an interactive recipe sharing application built with Next.js 15
(App Router), React 19, and Supabase. In addition to sharing recipes it can also
be used to create meal plans and menus. The target users are individual home
cooks.

## Development Commands

### Running the Application

```bash
npm run dev              # Start development server (localhost:3000)
npm run build            # Build for production
npm start                # Start production server
```

### Code Quality

```bash
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix ESLint issues
npm run format           # Format code with Prettier
npm run format:check     # Check formatting without changes
```

### Testing

```bash
npm test                 # Run Vitest unit tests
npm run test:ui          # Open Vitest UI
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Run Playwright E2E tests
npm run test:e2e:ui      # Open Playwright UI
npm run test:e2e:debug   # Debug Playwright tests
```

### Database (Supabase)

```bash
npm run db:start         # Start local Supabase (requires Docker)
npm run db:stop          # Stop local Supabase
npm run db:reset         # Reset and reapply migrations
npm run db:push          # Push migrations to remote
npm run db:seed          # Seed local database with sample data
npm run db:types         # Generate TypeScript types from schema
```

## Architecture

### Directory Structure

**app/** - Next.js App Router pages and layouts

- `(customer)/` - Customer-facing routes (public menu, recipes, collections)
- `admin/` - Admin portal routes (requires authentication)
- `api/` - API routes
- `auth/` - Authentication-related routes
- `login/` - Login page and server actions

**components/** - React components

- `ui/` - shadcn/ui components (shared UI primitives)
- `customer/` - Customer-facing components
- `auth/` - Authentication components
- `recipe/` - Recipe-specific components
- Top-level files: navbar, menu-item, menu-category, user-dropdown, recipe-form

**lib/** - Utilities and shared libraries

- `supabase/` - Data access layer (menus.ts, recipes.ts) and TypeScript types
- `hooks/` - Custom React hooks (use-categories, use-menu-items, use-recipe, use-search, get-user)
- `validations/` - Zod schemas for form validation
- `utils/` - General utility functions

**utils/supabase/** - Supabase client creation

- `client.ts` - Browser client (for Client Components)
- `server.ts` - Server client (for Server Components and Server Actions)
- `middleware.ts` - Session management middleware

**supabase/** - Database configuration

- `migrations/` - SQL migration files
- `seed.sql` - Sample data for development
- `config.toml` - Local Supabase configuration

**tests/** - Test files

- `e2e/` - Playwright E2E tests (\*.spec.ts)
- Test files use `.test.{ts,tsx}` for Vitest unit tests

### Authentication & Authorization

The app uses Supabase Auth with email/password authentication:

1. **Supabase Clients**:
   - Use `utils/supabase/client.ts` for Client Components
   - Use `utils/supabase/server.ts` for Server Components and Server Actions
   - Middleware in `middleware.ts` refreshes sessions on every request

2. **Admin Access**:
   - Admin layout (`app/admin/layout.tsx`) protects admin routes
   - Currently checks if user email is 'admin@example.com' (hardcoded)
   - Future implementation should use user metadata with `role: 'admin'` claim

3. **Custom Hooks**:
   - `lib/hooks/get-user.ts` - Server-side user fetching
   - Client-side auth state management happens via Supabase realtime subscriptions

### Database & Data Access

**Database Structure**:

- `categories` - Menu categories with display order
- `menu_items` - Menu items linked to categories
- `recipes` - Detailed recipes linked to menu items (1:1 relationship)
- Uses UUID primary keys and JSONB for flexible data (recipe ingredients)

**Row Level Security (RLS)**:

- Public read access on all tables (enables customer browsing)
- Write access requires admin authentication
- Storage bucket `menu-images` has similar policies

**Data Access Pattern**:

- Data fetching functions live in `lib/supabase/` (e.g., `menus.ts`, `recipes.ts`)
- Custom hooks in `lib/hooks/` wrap these functions for Client Components
- Server Components can call data functions directly

**Type Safety**:

- Database types generated in `lib/supabase/types.ts` via `npm run db:types`
- Regenerate types after schema changes

### Routing & Layout

**Route Groups**:

- `(customer)` - Public routes with customer layout (no authentication required)
- `admin` - Protected routes with admin navigation

**Key Pages**:

- `/` - Customer home page (menu listings)
- `/recipes/[id]` - Recipe detail view
- `/collections` - Menu collections
- `/menus/[id]` - Individual menu pages
- `/admin/dashboard` - Admin dashboard
- `/admin/menu-items` - Manage menu items
- `/admin/categories` - Manage categories
- `/login` - Authentication page

**Global Layout**:

- Root layout (`app/layout.tsx`) includes Navbar and Toaster
- Uses Providers component for client-side state management
- Inter font from next/font/google

### UI Components

Built with shadcn/ui + Tailwind CSS:

- Components use class-variance-authority (cva) for variants
- Tailwind config in `tailwind.config.ts` with custom animations
- Global styles in `app/globals.css`
- Uses Radix UI primitives (Avatar, Dialog, Dropdown Menu, Select, Label, Slot)

### Testing Strategy

**Unit Tests (Vitest)**:

- Test files: `**/*.test.{ts,tsx}`
- Setup file: `tests/setup.ts`
- Uses @testing-library/react for component testing
- Alias `@/` resolves to project root

**E2E Tests (Playwright)**:

- Test files in `tests/e2e/` with `*.spec.ts` extension
- Separate projects for admin and customer tests
- Customer tests run in multiple browsers (Chrome, Firefox, Safari, Mobile)
- Admin tests run only in Chrome for speed
- Base URL: http://localhost:3000
- Dev server starts automatically before tests

## Development Guidelines

### Working with Supabase

1. **Local Development**:
   - Start Supabase before running the app: `npm run db:start`
   - Access Supabase Studio at http://localhost:54323
   - Update `.env.local` with local credentials from console output

2. **Schema Changes**:
   - Create new migration: `npx supabase migration new <name>`
   - Write SQL in `supabase/migrations/`
   - Apply locally: `npm run db:reset`
   - Generate types: `npm run db:types`

3. **Data Access**:
   - Add new data access functions to `lib/supabase/` files
   - Create corresponding React hooks in `lib/hooks/` for client use
   - Use proper Supabase client based on component type (server vs client)

### Adding Features

1. **New Pages**:
   - Customer pages go in `app/(customer)/`
   - Admin pages go in `app/admin/`
   - Use Server Components by default for better performance

2. **New Components**:
   - UI primitives go in `components/ui/`
   - Feature components in appropriate subdirectories
   - Export from index files for clean imports

3. **Form Validation**:
   - Define Zod schemas in `lib/validations/`
   - Use react-hook-form with @hookform/resolvers
   - See `components/recipe-form.tsx` for example

### Code Style

- TypeScript strict mode enabled
- ESLint with Next.js + Prettier configs
- Unused variables prefixed with `_` are allowed
- Path alias `@/` points to project root
- Git hooks run lint-staged on commit (via Husky)

### Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

See `.env.example` for template.

## Important Notes

- **App Router**: This is a Next.js 15 App Router project (not Pages Router)
- **React Server Components**: Default components are Server Components
- **Image Optimization**: Configured for Supabase Storage and placeholder services
- **Git Branch**: Main development happens on `dev` branch
- **Middleware**: Runs on every request to refresh auth session (except static files)
- **Not Found Pages**: Custom 404 handling via `global-not-found.tsx`

## Common Tasks

### Creating a New Menu Item

1. Use admin portal at `/admin/menu-items`
2. Or insert via Supabase Studio
3. Optionally add a recipe in the recipes table

### Debugging Auth Issues

1. Check middleware is running (should refresh session)
2. Verify `.env.local` has correct Supabase credentials
3. Ensure user exists in Supabase Auth dashboard
4. For admin access, check email matches in `app/admin/layout.tsx`

### Running Full Test Suite

```bash
npm run lint           # Check code quality
npm run format:check   # Check formatting
npm test              # Run unit tests
npm run test:e2e      # Run E2E tests (starts dev server automatically)
```
