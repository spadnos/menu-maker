# Database Setup Guide

This guide covers setting up the Supabase database for the Menu Maker application.

## Prerequisites

- Docker Desktop installed and running (for local development)
- Supabase CLI installed (already included as dev dependency)
- Supabase account (for remote project)

## Option 1: Local Development with Supabase CLI

### 1. Start Local Supabase

```bash
npm run db:start
```

This will:

- Start a local Supabase instance using Docker
- Create a local PostgreSQL database
- Start Supabase Studio at http://localhost:54323

### 2. Apply Migrations

The migrations are automatically applied when you start Supabase. If you need to reapply them:

```bash
npm run db:reset
```

### 3. Seed the Database

```bash
npm run db:seed
```

This will populate the database with sample data:

- 5 categories (Appetizers, Entrees, Desserts, Beverages, Sides)
- 20 menu items across categories
- 5 recipes with detailed ingredients and instructions

### 4. Generate TypeScript Types

```bash
npm run db:types
```

This updates `lib/supabase/types.ts` with the latest database schema.

### 5. Get Local Credentials

After starting Supabase, you'll see output like:

```
API URL: http://localhost:54321
DB URL: postgresql://postgres:postgres@localhost:54322/postgres
Studio URL: http://localhost:54323
anon key: eyJh...
service_role key: eyJh...
```

Update your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-local-anon-key>
```

### 6. Stop Local Supabase

When you're done:

```bash
npm run db:stop
```

---

## Option 2: Remote Supabase Project

### 1. Create a Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: "menu-maker" (or your choice)
   - Database Password: (save this securely)
   - Region: Choose closest to you
5. Wait for project to be created (~2 minutes)

### 2. Get Project Credentials

1. Go to Project Settings → API
2. Copy:
   - Project URL
   - anon/public key

Update your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Link Local Project to Remote

```bash
npx supabase link --project-ref <your-project-ref>
```

You'll be prompted for your database password.

### 4. Push Migrations to Remote

```bash
npm run db:push
```

This applies all migrations in `supabase/migrations/` to your remote database.

### 5. Seed Remote Database

You can run the seed file through the Supabase Dashboard:

1. Go to SQL Editor
2. Click "New Query"
3. Copy contents of `supabase/seed.sql`
4. Paste and run

Or use the Supabase CLI:

```bash
npx supabase db reset --db-url <your-connection-string>
```

### 6. Generate Types from Remote

```bash
npx supabase gen types typescript --project-id <your-project-ref> > lib/supabase/types.ts
```

---

## Database Schema

### Tables

**categories**

- `id` (UUID, PK)
- `name` (VARCHAR(100), UNIQUE)
- `display_order` (INTEGER)
- `created_at` (TIMESTAMP)

**menu_items**

- `id` (UUID, PK)
- `name` (VARCHAR(200))
- `description` (TEXT)
- `category_id` (UUID, FK → categories)
- `image_url` (TEXT, nullable)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**recipes**

- `id` (UUID, PK)
- `menu_item_id` (UUID, FK → menu_items, UNIQUE)
- `ingredients` (JSONB)
- `instructions` (TEXT[])
- `prep_time_mins` (INTEGER, nullable)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Row Level Security (RLS)

All tables have RLS enabled:

**Public Access (Read)**:

- Anyone (authenticated or anonymous) can read all data
- Enables customer menu browsing without login

**Admin Access (Write)**:

- Only authenticated users with `role: 'admin'` in JWT can:
  - INSERT new records
  - UPDATE existing records
  - DELETE records

### Storage Bucket

**menu-images**:

- Public read access for all users
- Admin-only write access (upload, update, delete)
- Max file size: 5MB
- Allowed types: image/jpeg, image/png, image/webp

---

## Creating an Admin User

Admin users need the `role: 'admin'` claim in their JWT.

### Option 1: Via Supabase Dashboard

1. Go to Authentication → Users
2. Create a new user or select existing
3. Click on the user
4. Scroll to "User Metadata"
5. Add:
   ```json
   {
     "role": "admin"
   }
   ```
6. Save

### Option 2: Via SQL Function

Run this in SQL Editor:

```sql
-- Create a function to make a user an admin
CREATE OR REPLACE FUNCTION make_user_admin(user_email TEXT)
RETURNS void AS $$
BEGIN
  UPDATE auth.users
  SET raw_user_meta_data =
    COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
  WHERE email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Use it:
SELECT make_user_admin('admin@example.com');
```

### Test Admin Access

```typescript
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

// This should work for admin users
const { data, error } = await supabase.from('menu_items').insert({
  name: 'Test Item',
  description: 'Test',
  category_id: '<some-category-id>',
});
```

---

## Troubleshooting

### Docker not running

```
Error: Cannot connect to the Docker daemon
```

**Solution**: Start Docker Desktop

### Migrations not applying

```bash
# Reset and reapply all migrations
npm run db:reset
```

### Types out of sync

```bash
# Regenerate types from current schema
npm run db:types
```

### RLS blocking queries

- Check that public read policies are enabled
- For admin operations, ensure user has `role: 'admin'` in JWT
- Test policies in Supabase Dashboard → SQL Editor

### Seed data not loading

- Ensure migrations are applied first
- Check for foreign key constraint errors
- Verify categories are created before menu items

---

## Next Steps

After database setup:

1. Verify connection by running the app: `npm run dev`
2. Check that menu items load on homepage
3. Test admin login and CRUD operations
4. Proceed with implementing customer menu features (T014-T030)
