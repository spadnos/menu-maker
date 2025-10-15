# Data Model: Interactive Bistro Menu Display

**Feature**: 001-build-an-aplication  
**Date**: 2025-09-29  
**Database**: Supabase (PostgreSQL)

## Entity Relationship Diagram

```
┌─────────────────┐
│   categories    │
│─────────────────│
│ id (PK)         │
│ name            │
│ display_order   │
│ created_at      │
└────────┬────────┘
         │
         │ 1:N
         │
┌────────▼────────┐       ┌─────────────────┐
│   menu_items    │       │     recipes     │
│─────────────────│       │─────────────────│
│ id (PK)         │◄──────│ id (PK)         │
│ name            │  1:1  │ menu_item_id(FK)│
│ description     │       │ ingredients     │
│ category_id(FK) │       │ instructions    │
│ image_url       │       │ prep_time_mins  │
│ created_at      │       │ created_at      │
│ updated_at      │       │ updated_at      │
└─────────────────┘       └─────────────────┘
```

## Entities

### categories

Represents menu categories (Appetizers, Entrees, Desserts, etc.)

**Fields**:

- `id`: UUID, Primary Key, auto-generated
- `name`: VARCHAR(100), NOT NULL, UNIQUE
- `display_order`: INTEGER, NOT NULL, DEFAULT 0
- `created_at`: TIMESTAMP WITH TIME ZONE, DEFAULT NOW()

**Validation Rules**:

- Name must be 1-100 characters
- Name must be unique (case-insensitive)
- Display order determines category sequence on menu

**Indexes**:

- Primary key on `id`
- Unique index on `LOWER(name)`
- Index on `display_order` for sorting

**RLS Policies**:

- SELECT: Public (anyone can read)
- INSERT/UPDATE/DELETE: Admin users only

---

### menu_items

Represents individual dishes on the menu

**Fields**:

- `id`: UUID, Primary Key, auto-generated
- `name`: VARCHAR(200), NOT NULL
- `description`: TEXT, NOT NULL
- `category_id`: UUID, NOT NULL, FOREIGN KEY → categories(id)
- `image_url`: TEXT, NULLABLE
- `created_at`: TIMESTAMP WITH TIME ZONE, DEFAULT NOW()
- `updated_at`: TIMESTAMP WITH TIME ZONE, DEFAULT NOW()

**Validation Rules**:

- Name must be 1-200 characters
- Description must be 1-2000 characters
- Category must exist
- Image URL must be valid Supabase Storage URL or NULL
- Updated_at automatically set on modification

**Indexes**:

- Primary key on `id`
- Foreign key index on `category_id`
- GIN index on `to_tsvector('english', name || ' ' || description)` for full-text search
- Index on `created_at` for sorting

**RLS Policies**:

- SELECT: Public (anyone can read)
- INSERT/UPDATE/DELETE: Admin users only

**Relationships**:

- BELONGS TO one category (category_id → categories.id)
- HAS ONE recipe (optional, recipes.menu_item_id → id)

---

### recipes

Contains cooking instructions for menu items

**Fields**:

- `id`: UUID, Primary Key, auto-generated
- `menu_item_id`: UUID, NOT NULL, UNIQUE, FOREIGN KEY → menu_items(id) ON DELETE CASCADE
- `ingredients`: JSONB, NOT NULL
- `instructions`: TEXT[], NOT NULL
- `prep_time_mins`: INTEGER, NULLABLE
- `created_at`: TIMESTAMP WITH TIME ZONE, DEFAULT NOW()
- `updated_at`: TIMESTAMP WITH TIME ZONE, DEFAULT NOW()

**Validation Rules**:

- Menu item must exist
- One recipe per menu item (enforced by UNIQUE constraint)
- Ingredients must be valid JSON array of objects: `[{name: string, amount: string}]`
- Instructions must be non-empty array of strings
- Prep time must be positive integer if provided

**Indexes**:

- Primary key on `id`
- Unique foreign key index on `menu_item_id`
- GIN index on `ingredients` for ingredient search

**RLS Policies**:

- SELECT: Public (anyone can read)
- INSERT/UPDATE/DELETE: Admin users only

**Relationships**:

- BELONGS TO one menu_item (menu_item_id → menu_items.id)

**Ingredients JSONB Structure**:

```json
[
  {
    "name": "Fresh salmon fillet",
    "amount": "6 oz"
  },
  {
    "name": "Olive oil",
    "amount": "2 tbsp"
  }
]
```

**Instructions Array Structure**:

```sql
ARRAY[
  'Preheat oven to 400°F',
  'Season salmon with salt and pepper',
  'Drizzle with olive oil',
  'Bake for 12-15 minutes until flaky'
]
```

---

## Storage Buckets

### menu-images

Stores menu item images

**Configuration**:

- Public bucket (read access for all)
- Max file size: 5MB
- Allowed MIME types: image/jpeg, image/png, image/webp
- File naming: `{menu_item_id}.{ext}`

**RLS Policies**:

- SELECT: Public
- INSERT/UPDATE/DELETE: Admin users only

---

## Authentication & Authorization

### Admin Users

Uses Supabase Auth `auth.users` table

**Admin Identification**:

- Custom claim or metadata field: `role: 'admin'`
- Or separate `admin_users` table with user_id foreign key

**RLS Policy Pattern**:

```sql
-- Example RLS policy for admin-only operations
CREATE POLICY "Admin users can modify menu_items"
ON menu_items
FOR ALL
TO authenticated
USING (
  auth.jwt() ->> 'role' = 'admin'
);
```

### Customer Access

- No authentication required
- Public read access to all menu data
- Cannot modify any data

---

## Migrations

### Initial Schema Migration

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE UNIQUE INDEX categories_name_lower_idx ON categories (LOWER(name));
CREATE INDEX categories_display_order_idx ON categories (display_order);

-- Menu items table
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX menu_items_category_id_idx ON menu_items (category_id);
CREATE INDEX menu_items_search_idx ON menu_items USING GIN (
  to_tsvector('english', name || ' ' || description)
);
CREATE INDEX menu_items_created_at_idx ON menu_items (created_at DESC);

-- Recipes table
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_item_id UUID NOT NULL UNIQUE REFERENCES menu_items(id) ON DELETE CASCADE,
  ingredients JSONB NOT NULL,
  instructions TEXT[] NOT NULL,
  prep_time_mins INTEGER CHECK (prep_time_mins > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX recipes_menu_item_id_idx ON recipes (menu_item_id);
CREATE INDEX recipes_ingredients_idx ON recipes USING GIN (ingredients);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables
CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON menu_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recipes_updated_at
  BEFORE UPDATE ON recipes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### RLS Policies Migration

```sql
-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read menu_items"
  ON menu_items FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read recipes"
  ON recipes FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admin write access (requires admin role in JWT)
CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage menu_items"
  ON menu_items FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage recipes"
  ON recipes FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');
```

---

## TypeScript Types

Generated from Supabase schema:

```typescript
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          display_order?: number;
          created_at?: string;
        };
      };
      menu_items: {
        Row: {
          id: string;
          name: string;
          description: string;
          category_id: string;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          category_id: string;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          category_id?: string;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      recipes: {
        Row: {
          id: string;
          menu_item_id: string;
          ingredients: Ingredient[];
          instructions: string[];
          prep_time_mins: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          menu_item_id: string;
          ingredients: Ingredient[];
          instructions: string[];
          prep_time_mins?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          menu_item_id?: string;
          ingredients?: Ingredient[];
          instructions?: string[];
          prep_time_mins?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export interface Ingredient {
  name: string;
  amount: string;
}

// Convenience types
export type Category = Database['public']['Tables']['categories']['Row'];
export type MenuItem = Database['public']['Tables']['menu_items']['Row'];
export type Recipe = Database['public']['Tables']['recipes']['Row'];

// With relations
export type MenuItemWithCategory = MenuItem & {
  category: Category;
};

export type MenuItemWithRecipe = MenuItem & {
  recipe: Recipe | null;
};

export type MenuItemFull = MenuItem & {
  category: Category;
  recipe: Recipe | null;
};
```

---

## Query Patterns

### Customer Menu Display

```typescript
// Get all menu items grouped by category
const { data: menuItems } = await supabase
  .from('menu_items')
  .select(
    `
    *,
    category:categories(*),
    recipe:recipes(id)
  `
  )
  .order('category.display_order', { ascending: true })
  .order('name', { ascending: true });
```

### Search Menu Items

```typescript
// Search by name/description
const { data } = await supabase
  .from('menu_items')
  .select('*, category:categories(*)')
  .textSearch('name', searchTerm, {
    type: 'websearch',
    config: 'english',
  });

// Search by ingredient
const { data } = await supabase
  .from('recipes')
  .select('*, menu_item:menu_items(*, category:categories(*))')
  .contains('ingredients', [{ name: searchTerm }]);
```

### Get Recipe Details

```typescript
const { data: recipe } = await supabase
  .from('recipes')
  .select('*, menu_item:menu_items(name, description, image_url)')
  .eq('menu_item_id', menuItemId)
  .single();
```

### Admin CRUD Operations

```typescript
// Create menu item
const { data, error } = await supabase
  .from('menu_items')
  .insert({
    name: 'New Dish',
    description: 'Delicious description',
    category_id: categoryId,
    image_url: imageUrl,
  })
  .select()
  .single();

// Update menu item
const { error } = await supabase
  .from('menu_items')
  .update({ name: 'Updated Name' })
  .eq('id', menuItemId);

// Delete menu item (cascades to recipe)
const { error } = await supabase
  .from('menu_items')
  .delete()
  .eq('id', menuItemId);
```

---

## Performance Considerations

### Indexes Strategy

- **Full-text search**: GIN index on tsvector for fast text search
- **Ingredient search**: GIN index on JSONB for ingredient queries
- **Category filtering**: B-tree index on category_id
- **Sorting**: Index on display_order and created_at

### Caching Strategy

- Server-side cache menu items for 5 minutes (ISR)
- Client-side cache search results for session
- CDN cache for images (Supabase Storage CDN)

### Query Optimization

- Use `select('*')` sparingly - specify needed columns
- Limit search results to 50 items
- Paginate admin lists (20 items per page)
- Use single() for one-to-one relationships

---

## Data Validation

### Application-Level Validation

```typescript
// Menu item validation schema (Zod)
const menuItemSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  category_id: z.string().uuid(),
  image_url: z.string().url().nullable(),
});

// Recipe validation schema
const recipeSchema = z.object({
  menu_item_id: z.string().uuid(),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1),
        amount: z.string().min(1),
      })
    )
    .min(1),
  instructions: z.array(z.string().min(1)).min(1),
  prep_time_mins: z.number().int().positive().nullable(),
});
```

### Database-Level Constraints

- NOT NULL constraints on required fields
- FOREIGN KEY constraints for referential integrity
- UNIQUE constraints prevent duplicates
- CHECK constraints for data validity (e.g., positive prep time)
- Triggers for automatic updated_at timestamps
