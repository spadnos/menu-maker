-- Create storage bucket for menu images
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'buckets') THEN
    CREATE TABLE storage.buckets (
      id UUID PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      public BOOLEAN NOT NULL
    );
  END IF;
END $$;

INSERT INTO storage.buckets (id, name, public)
SELECT 'menu-images', 'menu-images', true
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'menu-images');

-- Storage policies for menu-images bucket

-- Allow public read access to all images
CREATE POLICY "Public can view menu images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'menu-images');

-- Allow authenticated admin users to upload images
CREATE POLICY "Admins can upload menu images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'menu-images' 
    AND auth.jwt() ->> 'role' = 'admin'
  );

-- Allow authenticated admin users to update images
CREATE POLICY "Admins can update menu images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'menu-images' 
    AND auth.jwt() ->> 'role' = 'admin'
  );

-- Allow authenticated admin users to delete images
CREATE POLICY "Admins can delete menu images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'menu-images' 
    AND auth.jwt() ->> 'role' = 'admin'
  );
