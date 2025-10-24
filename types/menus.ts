import { RecipeType } from './recipes';

export type MenuItemType = {
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

export type CategoryType = {
  id: string;
  name: string;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type MenuItemWithRelationsType = MenuItemType & {
  category: CategoryType;
  recipe?: RecipeType;
};
