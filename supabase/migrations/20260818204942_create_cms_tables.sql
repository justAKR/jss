/*
# Create CMS tables for ECE Resource Hub

1. New Tables
- `subjects` — Stores subject metadata (slug, name, description, icon, color, semester)
- `units` — Stores units/weeks belonging to subjects (name, slug, subject_id)
- `resources` — Stores all educational resources (title, description, type, URL, file path, etc.)

2. Security
- Enable RLS on all tables.
- Students (anon) can READ all published resources, subjects, and units.
- Only authenticated admin users can INSERT, UPDATE, and DELETE resources, subjects, and units.
- This uses a simple admin model: any authenticated user is treated as admin for CMS management.

3. Important Notes
- The `resources` table uses `resource_type` as an enum-like text check constraint.
- `file_path` stores the Supabase Storage path for uploaded PDFs.
- `url` stores external URLs (YouTube, websites, etc.).
- `tags` is a text array for search.
- `difficulty` is beginner/intermediate/advanced.
- `verified` defaults to false; admins mark resources as verified.
*/

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  short_name text NOT NULL,
  description text,
  icon text NOT NULL DEFAULT 'BookOpen',
  color text NOT NULL DEFAULT 'sky',
  semester text NOT NULL DEFAULT 'Semester 1',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Units table
CREATE TABLE IF NOT EXISTS units (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (subject_id, slug)
);

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  subject_id uuid NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  unit_id uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  resource_type text NOT NULL CHECK (
    resource_type IN ('PDF','NOTE','VIDEO','PLAYLIST','COURSE','BOOK','PYQ','QUESTION_PAPER','LAB_MANUAL','VIVA','ARTICLE','WEBSITE','OTHER')
  ),
  url text,
  file_path text,
  source text,
  author text,
  thumbnail_url text,
  tags text[] DEFAULT '{}',
  difficulty text DEFAULT 'beginner' CHECK (difficulty IN ('beginner','intermediate','advanced')),
  verified boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_resources_subject_id ON resources(subject_id);
CREATE INDEX IF NOT EXISTS idx_resources_unit_id ON resources(unit_id);
CREATE INDEX IF NOT EXISTS idx_resources_resource_type ON resources(resource_type);
CREATE INDEX IF NOT EXISTS idx_resources_verified ON resources(verified);
CREATE INDEX IF NOT EXISTS idx_units_subject_id ON units(subject_id);
CREATE INDEX IF NOT EXISTS idx_resources_tags ON resources USING gin(tags);

-- Enable RLS on all tables
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Subjects policies: public read, admin write
DROP POLICY IF EXISTS "public_read_subjects" ON subjects;
CREATE POLICY "public_read_subjects" ON subjects FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_subjects" ON subjects;
CREATE POLICY "admin_insert_subjects" ON subjects FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_subjects" ON subjects;
CREATE POLICY "admin_update_subjects" ON subjects FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_subjects" ON subjects;
CREATE POLICY "admin_delete_subjects" ON subjects FOR DELETE
  TO authenticated USING (true);

-- Units policies: public read, admin write
DROP POLICY IF EXISTS "public_read_units" ON units;
CREATE POLICY "public_read_units" ON units FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_units" ON units;
CREATE POLICY "admin_insert_units" ON units FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_units" ON units;
CREATE POLICY "admin_update_units" ON units FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_units" ON units;
CREATE POLICY "admin_delete_units" ON units FOR DELETE
  TO authenticated USING (true);

-- Resources policies: public read, admin write
DROP POLICY IF EXISTS "public_read_resources" ON resources;
CREATE POLICY "public_read_resources" ON resources FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_resources" ON resources;
CREATE POLICY "admin_insert_resources" ON resources FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_resources" ON resources;
CREATE POLICY "admin_update_resources" ON resources FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_resources" ON resources;
CREATE POLICY "admin_delete_resources" ON resources FOR DELETE
  TO authenticated USING (true);

-- Storage bucket for PDF uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('resources', 'resources', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: public read, authenticated upload
DROP POLICY IF EXISTS "public_read_storage_resources" ON storage.objects;
CREATE POLICY "public_read_storage_resources" ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'resources');

DROP POLICY IF EXISTS "auth_upload_storage_resources" ON storage.objects;
CREATE POLICY "auth_upload_storage_resources" ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'resources');

DROP POLICY IF EXISTS "auth_update_storage_resources" ON storage.objects;
CREATE POLICY "auth_update_storage_resources" ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'resources') WITH CHECK (bucket_id = 'resources');

DROP POLICY IF EXISTS "auth_delete_storage_resources" ON storage.objects;
CREATE POLICY "auth_delete_storage_resources" ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'resources');

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS subjects_updated_at ON subjects;
CREATE TRIGGER subjects_updated_at BEFORE UPDATE ON subjects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS units_updated_at ON units;
CREATE TRIGGER units_updated_at BEFORE UPDATE ON units
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS resources_updated_at ON resources;
CREATE TRIGGER resources_updated_at BEFORE UPDATE ON resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
