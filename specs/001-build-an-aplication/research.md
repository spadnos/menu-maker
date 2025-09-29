# Research: Interactive Bistro Menu Display

**Feature**: 001-build-an-aplication  
**Date**: 2025-09-29  
**Status**: Complete

## Technology Decisions

### 1. Next.js 14+ App Router

**Decision**: Use Next.js 14 with App Router for full-stack application

**Rationale**:

- Server Components reduce client bundle size and improve performance
- Built-in API routes eliminate need for separate backend server
- File-based routing simplifies navigation structure
- Excellent TypeScript support
- Server-side rendering improves SEO and initial load time
- Route groups allow clean separation of customer/admin interfaces

**Alternatives Considered**:

- **Create React App**: Lacks server-side features, requires separate backend
- **Remix**: Similar capabilities but smaller ecosystem than Next.js
- **Vite + React**: Requires more configuration, no built-in SSR

### 2. Supabase for Backend

**Decision**: Use Supabase for database, authentication, and file storage

**Rationale**:

- PostgreSQL database with real-time subscriptions
- Built-in authentication with Row Level Security (RLS)
- Storage API for menu item images
- Auto-generated TypeScript types from schema
- Generous free tier for MVP
- Reduces backend complexity - no custom API server needed

**Alternatives Considered**:

- **Firebase**: Less SQL-friendly, vendor lock-in concerns
- **Custom Node.js + PostgreSQL**: More control but significantly more setup
- **Prisma + PostgreSQL**: Requires separate hosting, more complex deployment

### 3. shadcn/ui Component Library

**Decision**: Use shadcn/ui for UI components

**Rationale**:

- Copy-paste components (not npm dependency) - full control
- Built on Radix UI primitives - accessible by default
- Tailwind CSS styling - easy customization for bistro aesthetic
- TypeScript-first design
- Modern, elegant components suitable for upscale dining feel

**Alternatives Considered**:

- **Material UI**: Heavier bundle, harder to customize for unique branding
- **Chakra UI**: Good but less trendy, larger runtime
- **Headless UI**: Lower-level, requires more custom styling

### 4. Search Implementation

**Decision**: Client-side debounced search with Supabase full-text search

**Rationale**:

- 300ms debounce prevents excessive API calls
- PostgreSQL full-text search for name/description
- Array contains for ingredient matching
- Supabase indexes ensure <500ms response time
- Simple implementation, meets performance requirements

**Alternatives Considered**:

- **Algolia/Meilisearch**: Overkill for ~100 menu items, added cost
- **Pure client-side**: Doesn't scale, requires loading all data upfront
- **Elasticsearch**: Too complex for this scale

### 5. Image Storage Strategy

**Decision**: Supabase Storage with CDN, optimized Next.js Image component

**Rationale**:

- Supabase Storage provides CDN-backed URLs
- Next.js Image component handles optimization automatically
- Lazy loading for performance
- Supports placeholder images for missing items
- Simple upload flow in admin portal

**Alternatives Considered**:

- **Cloudinary**: Better image transformations but added cost/complexity
- **S3 + CloudFront**: More setup, overkill for MVP
- **Local storage**: Not scalable, deployment issues

### 6. Authentication Strategy

**Decision**: Supabase Auth with email/password for admin users

**Rationale**:

- Simple email/password sufficient for small admin team
- Row Level Security (RLS) policies protect admin routes
- No auth required for customer-facing menu (public access)
- Can add OAuth providers later if needed

**Alternatives Considered**:

- **NextAuth.js**: More complex setup, unnecessary for Supabase integration
- **Auth0**: Overkill and costly for 5-10 admin users
- **Custom JWT**: Security risks, maintenance burden

### 7. Testing Strategy

**Decision**: Playwright for E2E, Vitest for unit tests, React Testing Library for components

**Rationale**:

- Playwright tests critical user flows (menu browsing, search, admin CRUD)
- Vitest fast and Next.js-compatible for unit tests
- React Testing Library for component behavior testing
- Meets 80% coverage requirement from constitution

**Alternatives Considered**:

- **Cypress**: Slower than Playwright, less modern
- **Jest**: Slower than Vitest, more configuration needed
- **Testing Library alone**: Insufficient for E2E flows

## Data Model Considerations

### Database Schema Approach

**Decision**: Normalized relational schema with foreign keys

**Rationale**:

- Clear entity relationships (MenuItem → Recipe, MenuItem → Category)
- PostgreSQL enforces referential integrity
- Easy to query with Supabase client
- Supports future features (nutritional data, multi-location)

**Key Entities**:

- `categories`: id, name, display_order, created_at
- `menu_items`: id, name, description, category_id, image_url, created_at, updated_at
- `recipes`: id, menu_item_id, ingredients (JSONB), instructions (text[]), created_at
- `admin_users`: Supabase auth.users table

### Image Storage Pattern

**Decision**: Store image URLs in database, files in Supabase Storage

**Rationale**:

- Decouples storage from database
- Easy to migrate storage providers if needed
- Supabase Storage generates stable URLs
- Supports optional images (nullable column)

## Performance Optimizations

### Initial Load Performance

**Strategies**:

- Server-side rendering for initial menu display
- Incremental Static Regeneration (ISR) for menu pages
- Image optimization with Next.js Image component
- Lazy load recipe details on demand

### Search Performance

**Strategies**:

- PostgreSQL GIN indexes on searchable text columns
- Debounced input (300ms) reduces query frequency
- Client-side caching of recent search results
- Limit results to 50 items per query

### Admin Portal Performance

**Strategies**:

- Optimistic UI updates for better perceived performance
- Pagination for menu item lists (20 items per page)
- Image upload progress indicators
- Form validation before submission

## Deployment Considerations

### Hosting Strategy

**Decision**: Vercel for Next.js app, Supabase cloud for backend

**Rationale**:

- Vercel optimized for Next.js (same company)
- Automatic deployments from Git
- Edge network for global performance
- Free tier sufficient for single bistro
- Supabase handles database, auth, storage

**Alternatives Considered**:

- **Netlify**: Good but less Next.js-optimized
- **Self-hosted**: More control but maintenance burden
- **AWS Amplify**: More complex, overkill

### Environment Management

**Decision**: Separate Supabase projects for dev/staging/production

**Rationale**:

- Isolated data for testing
- Safe migration testing
- Production data protection
- Supabase CLI for local development

## Open Questions Resolved

1. **Recipe availability**: Recipes are optional for all menu items (nullable foreign key)
2. **Content handling**: Display full descriptions, rely on good content authoring
3. **Pagination**: Show all items by default (max ~100), add pagination if needed later
4. **Recipe link behavior**: Only show link when recipe exists (conditional rendering)
5. **Admin authentication**: Email/password via Supabase Auth, RLS policies for authorization

## Next Steps

Proceed to Phase 1: Design & Contracts

- Create detailed data model (data-model.md)
- Define Supabase schema and RLS policies
- Generate TypeScript types
- Create quickstart guide
- Update agent context file
