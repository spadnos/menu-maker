-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Public read access for all users (authenticated and anonymous)
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
-- Note: Admin users must have 'role': 'admin' in their JWT claims or user_metadata
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

-- Creators can update their own recipes
CREATE POLICY "Creators can update recipes"
  ON recipes FOR UPDATE
  TO authenticated
  USING (auth.uid() = recipes.created_by)
  WITH CHECK (auth.uid() = recipes.created_by);
