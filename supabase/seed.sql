-- Seed data for Menu Maker development
-- This file populates the database with sample menu items, categories, and recipes

-- Insert categories
INSERT INTO categories (name, display_order) VALUES
  ('Appetizers', 0),
  ('Entrees', 1),
  ('Desserts', 2),
  ('Beverages', 3),
  ('Sides', 4);

-- Insert menu items for Appetizers
INSERT INTO menu_items (name, description, category_id, image_url) VALUES
  (
    'Bruschetta',
    'Toasted bread topped with fresh tomatoes, basil, garlic, and olive oil',
    (SELECT id FROM categories WHERE name = 'Appetizers'),
    'https://placehold.co/600x400/e8d5b7/8b4513?text=Bruschetta'
  ),
  (
    'French Onion Soup',
    'Classic soup with caramelized onions, beef broth, and melted Gruyère cheese',
    (SELECT id FROM categories WHERE name = 'Appetizers'),
    'https://placehold.co/600x400/e8d5b7/8b4513?text=French+Onion+Soup'
  ),
  (
    'Escargots de Bourgogne',
    'Burgundy snails baked in garlic-parsley butter',
    (SELECT id FROM categories WHERE name = 'Appetizers'),
    'https://placehold.co/600x400/e8d5b7/8b4513?text=Escargots'
  );

-- Insert menu items for Entrees
INSERT INTO menu_items (name, description, category_id, image_url) VALUES
  (
    'Grilled Salmon',
    'Fresh Atlantic salmon with lemon butter sauce, served with seasonal vegetables',
    (SELECT id FROM categories WHERE name = 'Entrees'),
    'https://placehold.co/600x400/e8d5b7/8b4513?text=Grilled+Salmon'
  ),
  (
    'Coq au Vin',
    'Traditional French chicken braised in red wine with mushrooms, onions, and bacon',
    (SELECT id FROM categories WHERE name = 'Entrees'),
    'https://placehold.co/600x400/e8d5b7/8b4513?text=Coq+au+Vin'
  ),
  (
    'Beef Bourguignon',
    'Tender beef slow-cooked in red wine with carrots, pearl onions, and herbs',
    (SELECT id FROM categories WHERE name = 'Entrees'),
    'https://placehold.co/600x400/e8d5b7/8b4513?text=Beef+Bourguignon'
  ),
  (
    'Ratatouille',
    'Provençal vegetable stew with eggplant, zucchini, peppers, and tomatoes',
    (SELECT id FROM categories WHERE name = 'Entrees'),
    'https://placehold.co/600x400/e8d5b7/8b4513?text=Ratatouille'
  ),
  (
    'Duck Confit',
    'Slow-cooked duck leg with crispy skin, served with roasted potatoes',
    (SELECT id FROM categories WHERE name = 'Entrees'),
    'https://placehold.co/600x400/e8d5b7/8b4513?text=Duck+Confit'
  );

-- Insert menu items for Desserts
INSERT INTO menu_items (name, description, category_id, image_url) VALUES
  (
    'Crème Brûlée',
    'Classic French custard with caramelized sugar crust',
    (SELECT id FROM categories WHERE name = 'Desserts'),
    'https://placehold.co/600x400/e8d5b7/8b4513?text=Creme+Brulee'
  ),
  (
    'Chocolate Mousse',
    'Rich and airy dark chocolate mousse topped with whipped cream',
    (SELECT id FROM categories WHERE name = 'Desserts'),
    'https://placehold.co/600x400/e8d5b7/8b4513?text=Chocolate+Mousse'
  ),
  (
    'Tarte Tatin',
    'Upside-down caramelized apple tart served warm with vanilla ice cream',
    (SELECT id FROM categories WHERE name = 'Desserts'),
    'https://placehold.co/600x400/e8d5b7/8b4513?text=Tarte+Tatin'
  ),
  (
    'Profiteroles',
    'Cream puffs filled with vanilla ice cream, drizzled with warm chocolate sauce',
    (SELECT id FROM categories WHERE name = 'Desserts'),
    'https://placehold.co/600x400/e8d5b7/8b4513?text=Profiteroles'
  );

-- Insert menu items for Beverages
INSERT INTO menu_items (name, description, category_id, image_url) VALUES
  (
    'House Red Wine',
    'Carefully selected French red wine, perfect pairing for our entrees',
    (SELECT id FROM categories WHERE name = 'Beverages'),
    NULL
  ),
  (
    'House White Wine',
    'Crisp and refreshing French white wine',
    (SELECT id FROM categories WHERE name = 'Beverages'),
    NULL
  ),
  (
    'Espresso',
    'Rich Italian espresso, the perfect end to your meal',
    (SELECT id FROM categories WHERE name = 'Beverages'),
    NULL
  ),
  (
    'French Press Coffee',
    'Freshly brewed French press coffee',
    (SELECT id FROM categories WHERE name = 'Beverages'),
    NULL
  );

-- Insert menu items for Sides
INSERT INTO menu_items (name, description, category_id, image_url) VALUES
  (
    'Pommes Frites',
    'Crispy French fries with sea salt',
    (SELECT id FROM categories WHERE name = 'Sides'),
    'https://placehold.co/600x400/e8d5b7/8b4513?text=Pommes+Frites'
  ),
  (
    'Haricots Verts',
    'Fresh green beans sautéed with garlic and butter',
    (SELECT id FROM categories WHERE name = 'Sides'),
    'https://placehold.co/600x400/e8d5b7/8b4513?text=Haricots+Verts'
  ),
  (
    'Gratin Dauphinois',
    'Creamy potato gratin with Gruyère cheese',
    (SELECT id FROM categories WHERE name = 'Sides'),
    'https://placehold.co/600x400/e8d5b7/8b4513?text=Gratin+Dauphinois'
  );

-- Insert recipes for selected menu items
INSERT INTO recipes (menu_item_id, ingredients, instructions, prep_time_mins) VALUES
  (
    (SELECT id FROM menu_items WHERE name = 'Grilled Salmon'),
    '[
      {"name": "Fresh Atlantic salmon fillet", "amount": "6 oz"},
      {"name": "Olive oil", "amount": "2 tbsp"},
      {"name": "Lemon juice", "amount": "1 tbsp"},
      {"name": "Butter", "amount": "2 tbsp"},
      {"name": "Fresh dill", "amount": "1 tbsp chopped"},
      {"name": "Salt and pepper", "amount": "to taste"}
    ]'::jsonb,
    ARRAY[
      'Preheat grill to medium-high heat (400°F)',
      'Pat salmon dry and brush with olive oil',
      'Season both sides with salt and pepper',
      'Place salmon skin-side down on grill',
      'Grill for 4-5 minutes per side until flaky',
      'Meanwhile, melt butter and mix with lemon juice and dill',
      'Remove salmon from grill and drizzle with lemon butter',
      'Serve immediately with seasonal vegetables'
    ],
    25
  ),
  (
    (SELECT id FROM menu_items WHERE name = 'Coq au Vin'),
    '[
      {"name": "Chicken thighs and drumsticks", "amount": "3 lbs"},
      {"name": "Bacon", "amount": "6 oz, diced"},
      {"name": "Pearl onions", "amount": "12 oz"},
      {"name": "Mushrooms", "amount": "8 oz, quartered"},
      {"name": "Red wine", "amount": "2 cups"},
      {"name": "Chicken stock", "amount": "1 cup"},
      {"name": "Tomato paste", "amount": "2 tbsp"},
      {"name": "Garlic cloves", "amount": "4, minced"},
      {"name": "Fresh thyme", "amount": "4 sprigs"},
      {"name": "Bay leaves", "amount": "2"},
      {"name": "Flour", "amount": "2 tbsp"},
      {"name": "Butter", "amount": "2 tbsp"}
    ]'::jsonb,
    ARRAY[
      'Season chicken pieces with salt and pepper',
      'In a large Dutch oven, cook bacon until crispy, remove and set aside',
      'Brown chicken in bacon fat, remove and set aside',
      'Sauté pearl onions until golden, remove and set aside',
      'Sauté mushrooms until browned, remove and set aside',
      'Add garlic and cook for 1 minute',
      'Stir in flour and tomato paste',
      'Add wine, scraping up browned bits',
      'Add chicken stock, thyme, and bay leaves',
      'Return chicken and bacon to pot',
      'Cover and simmer for 45 minutes',
      'Add onions and mushrooms, simmer 15 more minutes',
      'Remove thyme sprigs and bay leaves',
      'Stir in butter until melted',
      'Serve hot with crusty bread or mashed potatoes'
    ],
    90
  ),
  (
    (SELECT id FROM menu_items WHERE name = 'Crème Brûlée'),
    '[
      {"name": "Heavy cream", "amount": "2 cups"},
      {"name": "Egg yolks", "amount": "6 large"},
      {"name": "Granulated sugar", "amount": "1/2 cup plus extra for topping"},
      {"name": "Vanilla extract", "amount": "1 tsp"},
      {"name": "Salt", "amount": "pinch"}
    ]'::jsonb,
    ARRAY[
      'Preheat oven to 325°F',
      'Heat cream in a saucepan until it just begins to simmer',
      'In a bowl, whisk egg yolks with 1/2 cup sugar until pale',
      'Slowly pour hot cream into egg mixture, whisking constantly',
      'Stir in vanilla and salt',
      'Strain mixture through fine-mesh sieve',
      'Pour into 6 ramekins',
      'Place ramekins in baking dish and add hot water halfway up sides',
      'Bake for 40-45 minutes until set but still jiggly in center',
      'Remove from water bath and cool to room temperature',
      'Refrigerate for at least 2 hours or overnight',
      'Before serving, sprinkle sugar evenly over each custard',
      'Caramelize sugar with kitchen torch or under broiler',
      'Let sugar harden for 1 minute before serving'
    ],
    60
  ),
  (
    (SELECT id FROM menu_items WHERE name = 'Ratatouille'),
    '[
      {"name": "Eggplant", "amount": "1 medium, diced"},
      {"name": "Zucchini", "amount": "2 medium, diced"},
      {"name": "Bell peppers", "amount": "2, diced"},
      {"name": "Tomatoes", "amount": "4 large, diced"},
      {"name": "Onion", "amount": "1 large, diced"},
      {"name": "Garlic cloves", "amount": "4, minced"},
      {"name": "Olive oil", "amount": "1/4 cup"},
      {"name": "Fresh basil", "amount": "1/4 cup, chopped"},
      {"name": "Fresh thyme", "amount": "2 tsp"},
      {"name": "Salt and pepper", "amount": "to taste"}
    ]'::jsonb,
    ARRAY[
      'Salt eggplant and let sit for 30 minutes to remove bitterness',
      'Rinse and pat dry eggplant',
      'Heat olive oil in large pan over medium heat',
      'Sauté onion until softened, about 5 minutes',
      'Add garlic and cook for 1 minute',
      'Add eggplant and cook for 5 minutes',
      'Add zucchini and peppers, cook for 5 minutes',
      'Add tomatoes, thyme, salt, and pepper',
      'Reduce heat and simmer uncovered for 30 minutes',
      'Stir occasionally until vegetables are tender',
      'Stir in fresh basil just before serving',
      'Serve hot or at room temperature'
    ],
    75
  ),
  (
    (SELECT id FROM menu_items WHERE name = 'Chocolate Mousse'),
    '[
      {"name": "Dark chocolate", "amount": "8 oz, chopped"},
      {"name": "Heavy cream", "amount": "2 cups, divided"},
      {"name": "Egg whites", "amount": "4 large"},
      {"name": "Granulated sugar", "amount": "1/4 cup"},
      {"name": "Vanilla extract", "amount": "1 tsp"},
      {"name": "Salt", "amount": "pinch"}
    ]'::jsonb,
    ARRAY[
      'Melt chocolate with 1/2 cup cream in double boiler',
      'Stir until smooth, remove from heat and cool slightly',
      'Whip remaining 1.5 cups cream to soft peaks, refrigerate',
      'Beat egg whites with salt until soft peaks form',
      'Gradually add sugar, beat until stiff peaks form',
      'Fold cooled chocolate into egg whites gently',
      'Fold in whipped cream until no streaks remain',
      'Divide mousse among serving glasses',
      'Refrigerate for at least 2 hours',
      'Top with additional whipped cream before serving'
    ],
    30
  );

-- Note: To create an admin user, you need to:
-- 1. Sign up a user through Supabase Auth
-- 2. Update their user_metadata or JWT claims to include {"role": "admin"}
-- This can be done via Supabase Dashboard or with a SQL function
