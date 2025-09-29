// TypeScript types for Supabase database
// These types are generated from the database schema
// Run: npx supabase gen types typescript --local > lib/supabase/types.ts
// Or: npx supabase gen types typescript --project-id <project-ref> > lib/supabase/types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          display_order?: number
          created_at?: string
        }
        Relationships: []
      }
      menu_items: {
        Row: {
          id: string
          name: string
          description: string
          category_id: string
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          category_id: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          category_id?: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'menu_items_category_id_fkey'
            columns: ['category_id']
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
        ]
      }
      recipes: {
        Row: {
          id: string
          menu_item_id: string
          ingredients: Json
          instructions: string[]
          prep_time_mins: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          menu_item_id: string
          ingredients: Json
          instructions: string[]
          prep_time_mins?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          menu_item_id?: string
          ingredients?: Json
          instructions?: string[]
          prep_time_mins?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'recipes_menu_item_id_fkey'
            columns: ['menu_item_id']
            referencedRelation: 'menu_items'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Ingredient type for recipes
export interface Ingredient {
  name: string
  amount: string
}

// Convenience types
export type Category = Database['public']['Tables']['categories']['Row']
export type CategoryInsert =
  Database['public']['Tables']['categories']['Insert']
export type CategoryUpdate =
  Database['public']['Tables']['categories']['Update']

export type MenuItem = Database['public']['Tables']['menu_items']['Row']
export type MenuItemInsert =
  Database['public']['Tables']['menu_items']['Insert']
export type MenuItemUpdate =
  Database['public']['Tables']['menu_items']['Update']

export type Recipe = Database['public']['Tables']['recipes']['Row']
export type RecipeInsert = Database['public']['Tables']['recipes']['Insert']
export type RecipeUpdate = Database['public']['Tables']['recipes']['Update']

// Types with relations
export type MenuItemWithCategory = MenuItem & {
  category: Category
}

export type MenuItemWithRecipe = MenuItem & {
  recipe: Recipe | null
}

export type MenuItemFull = MenuItem & {
  category: Category
  recipe: Recipe | null
}

export type RecipeWithMenuItem = Recipe & {
  menu_item: MenuItem
}
