-- Create storage bucket for menu images
INSERT INTO storage.buckets (id, name, public)
VALUES ('menu-images', 'menu-images', true);

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
