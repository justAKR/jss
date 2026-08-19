/*
# Add Applied Chemistry subject and 5 units

1. New Data
- Inserts "Applied Chemistry" subject into `subjects` table (slug: applied-chemistry, semester: Semester 1).
- Inserts 5 units into `units` table linked to the Applied Chemistry subject.
- All inserts are idempotent — uses ON CONFLICT to avoid duplicates if the subject or units already exist.

2. Subject Details
- name: Applied Chemistry
- short_name: Chemistry
- slug: applied-chemistry
- description: Applied Chemistry covering sensors and display systems, energy storage and corrosion, electronic materials, nanomaterials, polymers, and green chemistry.
- icon: FlaskConical
- color: emerald
- semester: Semester 1
- sort_order: 7

3. Units
- Unit 1 — Sensors & Display Systems (slug: ac-u1, sort_order: 1)
- Unit 2 — Energy Storage Systems & Corrosion Science (slug: ac-u2, sort_order: 2)
- Unit 3 — Conductors, Insulators, Semiconductors & Computational Chemistry (slug: ac-u3, sort_order: 3)
- Unit 4 — Nanomaterials & Polymers (slug: ac-u4, sort_order: 4)
- Unit 5 — Green Chemistry, Green Fuels & E-Waste Management (slug: ac-u5, sort_order: 5)

4. Security
- No schema changes. Existing RLS policies on subjects and units allow public read and admin write.
*/

INSERT INTO subjects (slug, name, short_name, description, icon, color, semester, sort_order)
VALUES (
  'applied-chemistry',
  'Applied Chemistry',
  'Chemistry',
  'Applied Chemistry covering sensors and display systems, energy storage and corrosion, electronic materials, nanomaterials, polymers, and green chemistry.',
  'FlaskConical',
  'emerald',
  'Semester 1',
  7
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO units (subject_id, name, slug, sort_order)
SELECT s.id, u.name, u.slug, u.sort_order
FROM subjects s
CROSS JOIN (VALUES
  ('Unit 1 — Sensors & Display Systems', 'ac-u1', 1),
  ('Unit 2 — Energy Storage Systems & Corrosion Science', 'ac-u2', 2),
  ('Unit 3 — Conductors, Insulators, Semiconductors & Computational Chemistry', 'ac-u3', 3),
  ('Unit 4 — Nanomaterials & Polymers', 'ac-u4', 4),
  ('Unit 5 — Green Chemistry, Green Fuels & E-Waste Management', 'ac-u5', 5)
) AS u(name, slug, sort_order)
WHERE s.slug = 'applied-chemistry'
ON CONFLICT (subject_id, slug) DO NOTHING;
