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

export type IngredientType = {
  id: string;
  recipe_id: string;
  name: string;
  amount: number;
  unit: string;
  order: number;
};

export type IngredientCreateType = Omit<IngredientType, 'id' | 'recipe_id'>;

export type RecipeType = {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  ingredients: IngredientType[];
  instructions: string[];
  prep_time_mins: number;
  cook_time_mins: number;
  servings: number;
  source_url: string | null;
  created_at: string;
  updated_at: string;
  created_by: string;
};

export type RecipeCreateType = Omit<
  RecipeType,
  'id' | 'created_at' | 'updated_at' | 'created_by'
>;

export type InstructionType = {
  id: string;
  recipe_id: string;
  step: string;
  order: number;
};

export type MenuItemWithRelationsType = MenuItemType & {
  category: CategoryType;
  recipe?: RecipeType & {
    ingredients: IngredientType[];
    instructions: InstructionType[];
  };
};
