export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      menu_items: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          image_url: string | null;
          category_id: string;
          is_available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price: number;
          image_url?: string | null;
          category_id: string;
          is_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          image_url?: string | null;
          category_id?: string;
          is_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      recipes: {
        Row: {
          id: string;
          menu_item_id: string;
          prep_time: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          menu_item_id: string;
          prep_time?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          menu_item_id?: string;
          prep_time?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      ingredients: {
        Row: {
          id: string;
          recipe_id: string;
          name: string;
          amount: number;
          unit: string;
          order: number;
        };
        Insert: {
          id?: string;
          recipe_id: string;
          name: string;
          amount: number;
          unit: string;
          order?: number;
        };
        Update: {
          id?: string;
          recipe_id?: string;
          name?: string;
          amount?: number;
          unit?: string;
          order?: number;
        };
      };
      instructions: {
        Row: {
          id: string;
          recipe_id: string;
          step: string;
          order: number;
        };
        Insert: {
          id?: string;
          recipe_id: string;
          step: string;
          order?: number;
        };
        Update: {
          id?: string;
          recipe_id?: string;
          step?: string;
          order?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
