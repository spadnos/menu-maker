# Supabase API Contracts

**Feature**: Interactive Bistro Menu Display  
**Date**: 2025-09-29  
**API Type**: Supabase Client (REST-like interface)

## Overview

This document defines the contract between the Next.js application and Supabase backend. All operations use the Supabase JavaScript client which provides a type-safe interface to PostgreSQL via PostgREST.

---

## Customer-Facing Endpoints

### GET Menu Items (with Categories)

**Purpose**: Retrieve all menu items grouped by category for display

**Query**:

```typescript
supabase
  .from('menu_items')
  .select(
    `
    id,
    name,
    description,
    image_url,
    category:categories(id, name, display_order),
    recipe:recipes(id)
  `
  )
  .order('category.display_order', { ascending: true })
  .order('name', { ascending: true });
```

**Response Success (200)**:

```typescript
{
  data: [
    {
      id: "uuid",
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon with lemon butter",
      image_url: "https://...storage.supabase.co/.../image.jpg" | null,
      category: {
        id: "uuid",
        name: "Entrees",
        display_order: 2
      },
      recipe: { id: "uuid" } | null
    }
  ],
  error: null
}
```

**Response Error**:

```typescript
{
  data: null,
  error: {
    message: "Error message",
    details: "...",
    hint: "...",
    code: "..."
  }
}
```

**Performance**: Must complete in <2-3 seconds

---

### GET Search Menu Items

**Purpose**: Search menu items by name or description

**Query**:

```typescript
supabase
  .from('menu_items')
  .select(
    `
    id,
    name,
    description,
    image_url,
    category:categories(id, name)
  `
  )
  .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
  .limit(50);
```

**Parameters**:

- `searchTerm`: string (1-100 characters)

**Response Success (200)**:

```typescript
{
  data: MenuItem[], // Same structure as GET Menu Items
  error: null
}
```

**Performance**: Must complete in <500ms

---

### GET Search by Ingredient

**Purpose**: Find menu items containing specific ingredients

**Query**:

```typescript
supabase
  .from('recipes')
  .select(
    `
    id,
    menu_item:menu_items(
      id,
      name,
      description,
      image_url,
      category:categories(id, name)
    )
  `
  )
  .contains('ingredients', [{ name: searchTerm }])
  .limit(50);
```

**Parameters**:

- `searchTerm`: string (ingredient name)

**Response Success (200)**:

```typescript
{
  data: [
    {
      id: "recipe-uuid",
      menu_item: {
        id: "uuid",
        name: "Dish Name",
        description: "...",
        image_url: "..." | null,
        category: { id: "uuid", name: "Category" }
      }
    }
  ],
  error: null
}
```

**Performance**: Must complete in <500ms

---

### GET Filter by Category

**Purpose**: Get menu items in a specific category

**Query**:

```typescript
supabase
  .from('menu_items')
  .select(
    `
    id,
    name,
    description,
    image_url,
    category:categories(id, name),
    recipe:recipes(id)
  `
  )
  .eq('category_id', categoryId)
  .order('name', { ascending: true });
```

**Parameters**:

- `categoryId`: UUID

**Response Success (200)**:

```typescript
{
  data: MenuItem[], // Same structure as GET Menu Items
  error: null
}
```

---

### GET Recipe Details

**Purpose**: Retrieve full recipe for a menu item

**Query**:

```typescript
supabase
  .from('recipes')
  .select(
    `
    id,
    ingredients,
    instructions,
    prep_time_mins,
    menu_item:menu_items(
      id,
      name,
      description,
      image_url
    )
  `
  )
  .eq('menu_item_id', menuItemId)
  .single();
```

**Parameters**:

- `menuItemId`: UUID

**Response Success (200)**:

```typescript
{
  data: {
    id: "uuid",
    ingredients: [
      { name: "Salmon fillet", amount: "6 oz" },
      { name: "Olive oil", amount: "2 tbsp" }
    ],
    instructions: [
      "Preheat oven to 400°F",
      "Season salmon with salt and pepper",
      "Bake for 12-15 minutes"
    ],
    prep_time_mins: 25,
    menu_item: {
      id: "uuid",
      name: "Grilled Salmon",
      description: "...",
      image_url: "..."
    }
  },
  error: null
}
```

**Response Error (404)**:

```typescript
{
  data: null,
  error: {
    message: "No rows found",
    code: "PGRST116"
  }
}
```

---

### GET All Categories

**Purpose**: Retrieve all categories for filter dropdown

**Query**:

```typescript
supabase
  .from('categories')
  .select('id, name, display_order')
  .order('display_order', { ascending: true });
```

**Response Success (200)**:

```typescript
{
  data: [
    {
      id: "uuid",
      name: "Appetizers",
      display_order: 0
    },
    {
      id: "uuid",
      name: "Entrees",
      display_order: 1
    }
  ],
  error: null
}
```

---

## Admin Portal Endpoints

### POST Create Category

**Purpose**: Create a new menu category

**Query**:

```typescript
supabase
  .from('categories')
  .insert({
    name: 'New Category',
    display_order: 10,
  })
  .select()
  .single();
```

**Request Body**:

```typescript
{
  name: string, // 1-100 chars, unique
  display_order: number // integer
}
```

**Response Success (201)**:

```typescript
{
  data: {
    id: "uuid",
    name: "New Category",
    display_order: 10,
    created_at: "2025-09-29T12:00:00Z"
  },
  error: null
}
```

**Response Error (409 - Duplicate)**:

```typescript
{
  data: null,
  error: {
    message: "duplicate key value violates unique constraint",
    code: "23505"
  }
}
```

**Authorization**: Requires admin role in JWT

---

### POST Create Menu Item

**Purpose**: Create a new menu item

**Query**:

```typescript
supabase
  .from('menu_items')
  .insert({
    name: 'New Dish',
    description: 'Description',
    category_id: 'uuid',
    image_url: 'https://...' | null,
  })
  .select(
    `
    *,
    category:categories(*)
  `
  )
  .single();
```

**Request Body**:

```typescript
{
  name: string, // 1-200 chars
  description: string, // 1-2000 chars
  category_id: string, // UUID, must exist
  image_url: string | null // Valid URL or null
}
```

**Response Success (201)**:

```typescript
{
  data: {
    id: "uuid",
    name: "New Dish",
    description: "Description",
    category_id: "uuid",
    image_url: "..." | null,
    created_at: "2025-09-29T12:00:00Z",
    updated_at: "2025-09-29T12:00:00Z",
    category: {
      id: "uuid",
      name: "Entrees",
      display_order: 1
    }
  },
  error: null
}
```

**Response Error (400 - Invalid Category)**:

```typescript
{
  data: null,
  error: {
    message: "insert or update on table violates foreign key constraint",
    code: "23503"
  }
}
```

**Authorization**: Requires admin role in JWT

---

### POST Create Recipe

**Purpose**: Create a recipe for a menu item

**Query**:

```typescript
supabase
  .from('recipes')
  .insert({
    menu_item_id: 'uuid',
    ingredients: [{ name: 'Ingredient 1', amount: '1 cup' }],
    instructions: ['Step 1', 'Step 2'],
    prep_time_mins: 30,
  })
  .select()
  .single();
```

**Request Body**:

```typescript
{
  menu_item_id: string, // UUID, must exist, must not have recipe
  ingredients: Array<{
    name: string,
    amount: string
  }>, // At least 1 ingredient
  instructions: string[], // At least 1 instruction
  prep_time_mins: number | null // Positive integer or null
}
```

**Response Success (201)**:

```typescript
{
  data: {
    id: "uuid",
    menu_item_id: "uuid",
    ingredients: [...],
    instructions: [...],
    prep_time_mins: 30,
    created_at: "2025-09-29T12:00:00Z",
    updated_at: "2025-09-29T12:00:00Z"
  },
  error: null
}
```

**Response Error (409 - Recipe Exists)**:

```typescript
{
  data: null,
  error: {
    message: "duplicate key value violates unique constraint",
    code: "23505"
  }
}
```

**Authorization**: Requires admin role in JWT

---

### PATCH Update Menu Item

**Purpose**: Update an existing menu item

**Query**:

```typescript
supabase
  .from('menu_items')
  .update({
    name: 'Updated Name',
    description: 'Updated description',
  })
  .eq('id', menuItemId)
  .select()
  .single();
```

**Parameters**:

- `menuItemId`: UUID

**Request Body** (partial update):

```typescript
{
  name?: string,
  description?: string,
  category_id?: string,
  image_url?: string | null
}
```

**Response Success (200)**:

```typescript
{
  data: {
    // Updated menu item
  },
  error: null
}
```

**Authorization**: Requires admin role in JWT

---

### PATCH Update Recipe

**Purpose**: Update an existing recipe

**Query**:

```typescript
supabase
  .from('recipes')
  .update({
    ingredients: [...],
    instructions: [...]
  })
  .eq('id', recipeId)
  .select()
  .single()
```

**Parameters**:

- `recipeId`: UUID

**Request Body** (partial update):

```typescript
{
  ingredients?: Ingredient[],
  instructions?: string[],
  prep_time_mins?: number | null
}
```

**Response Success (200)**:

```typescript
{
  data: {
    // Updated recipe
  },
  error: null
}
```

**Authorization**: Requires admin role in JWT

---

### DELETE Menu Item

**Purpose**: Delete a menu item (cascades to recipe)

**Query**:

```typescript
supabase.from('menu_items').delete().eq('id', menuItemId);
```

**Parameters**:

- `menuItemId`: UUID

**Response Success (204)**:

```typescript
{
  data: null,
  error: null
}
```

**Side Effects**:

- Associated recipe is automatically deleted (CASCADE)
- Image should be deleted from storage separately

**Authorization**: Requires admin role in JWT

---

### DELETE Recipe

**Purpose**: Delete a recipe (menu item remains)

**Query**:

```typescript
supabase.from('recipes').delete().eq('id', recipeId);
```

**Parameters**:

- `recipeId`: UUID

**Response Success (204)**:

```typescript
{
  data: null,
  error: null
}
```

**Authorization**: Requires admin role in JWT

---

### DELETE Category

**Purpose**: Delete a category (only if no menu items)

**Query**:

```typescript
supabase.from('categories').delete().eq('id', categoryId);
```

**Parameters**:

- `categoryId`: UUID

**Response Success (204)**:

```typescript
{
  data: null,
  error: null
}
```

**Response Error (409 - Has Menu Items)**:

```typescript
{
  data: null,
  error: {
    message: "update or delete on table violates foreign key constraint",
    code: "23503"
  }
}
```

**Authorization**: Requires admin role in JWT

---

## Storage API Contracts

### POST Upload Image

**Purpose**: Upload menu item image to Supabase Storage

**Endpoint**: Supabase Storage API

**Request**:

```typescript
supabase.storage.from('menu-images').upload(`${menuItemId}.jpg`, file, {
  cacheControl: '3600',
  upsert: true,
});
```

**Parameters**:

- `menuItemId`: UUID (used as filename)
- `file`: File object (max 5MB, JPEG/PNG/WebP)

**Response Success (200)**:

```typescript
{
  data: {
    path: "uuid.jpg"
  },
  error: null
}
```

**Response Error (413 - File Too Large)**:

```typescript
{
  data: null,
  error: {
    message: "Payload too large",
    statusCode: "413"
  }
}
```

**Authorization**: Requires admin role

---

### GET Image URL

**Purpose**: Get public URL for uploaded image

**Request**:

```typescript
supabase.storage.from('menu-images').getPublicUrl(`${menuItemId}.jpg`);
```

**Response**:

```typescript
{
  data: {
    publicUrl: 'https://...storage.supabase.co/object/public/menu-images/uuid.jpg';
  }
}
```

**Authorization**: Public (no auth required)

---

### DELETE Image

**Purpose**: Delete menu item image from storage

**Request**:

```typescript
supabase.storage.from('menu-images').remove([`${menuItemId}.jpg`]);
```

**Response Success (200)**:

```typescript
{
  data: [
    {
      name: "uuid.jpg"
    }
  ],
  error: null
}
```

**Authorization**: Requires admin role

---

## Authentication Contracts

### POST Sign In

**Purpose**: Admin user authentication

**Request**:

```typescript
supabase.auth.signInWithPassword({
  email: 'admin@bistro.com',
  password: 'secure-password',
});
```

**Response Success (200)**:

```typescript
{
  data: {
    user: {
      id: "uuid",
      email: "admin@bistro.com",
      role: "authenticated",
      user_metadata: {
        role: "admin"
      }
    },
    session: {
      access_token: "jwt-token",
      refresh_token: "refresh-token",
      expires_in: 3600
    }
  },
  error: null
}
```

**Response Error (400 - Invalid Credentials)**:

```typescript
{
  data: {
    user: null,
    session: null
  },
  error: {
    message: "Invalid login credentials"
  }
}
```

---

### POST Sign Out

**Purpose**: End admin session

**Request**:

```typescript
supabase.auth.signOut();
```

**Response Success (204)**:

```typescript
{
  error: null;
}
```

---

### GET Current Session

**Purpose**: Check if user is authenticated

**Request**:

```typescript
supabase.auth.getSession();
```

**Response**:

```typescript
{
  data: {
    session: {
      access_token: "jwt-token",
      user: { ... }
    } | null
  },
  error: null
}
```

---

## Error Codes Reference

| Code     | Description                 | Common Cause                    |
| -------- | --------------------------- | ------------------------------- |
| PGRST116 | No rows found               | Record doesn't exist            |
| 23503    | Foreign key violation       | Referenced record doesn't exist |
| 23505    | Unique constraint violation | Duplicate value                 |
| 42501    | Insufficient privilege      | RLS policy denied access        |
| 413      | Payload too large           | File exceeds size limit         |

---

## Rate Limiting

Supabase enforces rate limits on free tier:

- **Database queries**: 500 requests per second
- **Storage operations**: 200 requests per second
- **Auth operations**: 30 requests per hour per IP

For production, consider upgrading to Pro tier for higher limits.

---

## Testing Contracts

All endpoints should have corresponding contract tests that verify:

1. Request/response structure matches specification
2. Error responses match expected format
3. Authorization is enforced correctly
4. Performance meets specified targets

See `/tests/e2e/` for contract test implementations.
