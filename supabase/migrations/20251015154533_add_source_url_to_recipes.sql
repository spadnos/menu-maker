-- Add source_url column to recipes table
ALTER TABLE "public"."recipes" ADD COLUMN "source_url" TEXT;

-- Add a comment to describe the column
COMMENT ON COLUMN "public"."recipes"."source_url" IS 'Original URL from which the recipe was imported';
