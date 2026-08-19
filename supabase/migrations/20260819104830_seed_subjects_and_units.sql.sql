-- Seed subjects matching the static data in src/data/resources.ts
-- Using fixed UUIDs so we can reference them for units

INSERT INTO subjects (id, slug, name, short_name, description, icon, color, semester, sort_order) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'applied-physics', 'Applied Physics', 'Physics', 'Quantum mechanics, electromagnetic theory, crystal structures, material properties and optics.', 'Atom', 'sky', 'Semester 1', 1),
  ('a0000000-0000-0000-0000-000000000002', 'linear-algebra-differential-equations', 'Linear Algebra & Differential Equations', 'Mathematics', 'Linear systems, matrices, vector spaces, inner products and differential equations.', 'Sigma', 'indigo', 'Semester 1', 2),
  ('a0000000-0000-0000-0000-000000000003', 'computational-thinking-problem-solving', 'Computational Thinking for Problem Solving', 'Computational Thinking', 'Computer systems, programming basics, operators, loops, arrays, functions, pointers and file handling.', 'Cpu', 'emerald', 'Semester 1', 3),
  ('a0000000-0000-0000-0000-000000000004', 'basics-electronics-engineering', 'Basics of Electronics Engineering', 'Electronics', 'P-N junction diodes, BJT, FET, amplifiers, digital electronics and operational amplifiers.', 'Radio', 'amber', 'Semester 1', 4),
  ('a0000000-0000-0000-0000-000000000005', 'basics-communication-engineering', 'Basics of Communication Engineering', 'Communication', 'Communication systems, analog and digital communication, antenna basics and wireless communication.', 'Radio', 'rose', 'Semester 1', 5),
  ('a0000000-0000-0000-0000-000000000006', 'computer-aided-engineering-graphics-lab', 'Computer Aided Engineering Graphics Lab', 'Engineering Graphics', 'Engineering graphics, orthographic and isometric projections, CAD/AutoCAD and geometry of engineered components.', 'PencilRuler', 'teal', 'Semester 1', 6)
ON CONFLICT (slug) DO NOTHING;

-- Seed units for each subject
-- Applied Physics units
INSERT INTO units (id, subject_id, name, slug, sort_order) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Quantum Mechanics', 'ap-u1', 1),
  ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Electromagnetic Theory', 'ap-u2', 2),
  ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Crystal Structures and X-ray Diffraction', 'ap-u3', 3),
  ('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'Properties of Materials', 'ap-u4', 4),
  ('b0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'Laser and Fibre Optics', 'ap-u5', 5)
ON CONFLICT DO NOTHING;

-- Mathematics units
INSERT INTO units (id, subject_id, name, slug, sort_order) VALUES
  ('b0000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000002', 'Linear Systems and Matrices', 'ma-u1', 1),
  ('b0000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000002', 'Vector Spaces and Linear Transformations', 'ma-u2', 2),
  ('b0000000-0000-0000-0000-000000000013', 'a0000000-0000-0000-0000-000000000002', 'Inner Product Spaces', 'ma-u3', 3),
  ('b0000000-0000-0000-0000-000000000014', 'a0000000-0000-0000-0000-000000000002', 'Ordinary Differential Equation', 'ma-u4', 4),
  ('b0000000-0000-0000-0000-000000000015', 'a0000000-0000-0000-0000-000000000002', 'Advanced Methods for Solving Second Order Differential Equations', 'ma-u5', 5)
ON CONFLICT DO NOTHING;

-- Computational Thinking units
INSERT INTO units (id, subject_id, name, slug, sort_order) VALUES
  ('b0000000-0000-0000-0000-000000000021', 'a0000000-0000-0000-0000-000000000003', 'Components of Computer Systems, Computational Thinking & Programming Basics', 'ct-u1', 1),
  ('b0000000-0000-0000-0000-000000000022', 'a0000000-0000-0000-0000-000000000003', 'Operators and Solving Expressions & Conditional Statements', 'ct-u2', 2),
  ('b0000000-0000-0000-0000-000000000023', 'a0000000-0000-0000-0000-000000000003', 'Loops, Arrays & Functions', 'ct-u3', 3),
  ('b0000000-0000-0000-0000-000000000024', 'a0000000-0000-0000-0000-000000000003', 'Searching, Sorting, Structure & Union', 'ct-u4', 4),
  ('b0000000-0000-0000-0000-000000000025', 'a0000000-0000-0000-0000-000000000003', 'Pointers, Dynamic Memory, File Handling & Macros', 'ct-u5', 5)
ON CONFLICT DO NOTHING;

-- Electronics units
INSERT INTO units (id, subject_id, name, slug, sort_order) VALUES
  ('b0000000-0000-0000-0000-000000000031', 'a0000000-0000-0000-0000-000000000004', 'P-N Junction Diode and Power Supply', 'ec-u1', 1),
  ('b0000000-0000-0000-0000-000000000032', 'a0000000-0000-0000-0000-000000000004', 'BJT and Amplifiers', 'ec-u2', 2),
  ('b0000000-0000-0000-0000-000000000033', 'a0000000-0000-0000-0000-000000000004', 'Field Effect Transistor', 'ec-u3', 3),
  ('b0000000-0000-0000-0000-000000000034', 'a0000000-0000-0000-0000-000000000004', 'Digital Electronics', 'ec-u4', 4),
  ('b0000000-0000-0000-0000-000000000035', 'a0000000-0000-0000-0000-000000000004', 'Operational Amplifiers', 'ec-u5', 5)
ON CONFLICT DO NOTHING;

-- Communication units
INSERT INTO units (id, subject_id, name, slug, sort_order) VALUES
  ('b0000000-0000-0000-0000-000000000041', 'a0000000-0000-0000-0000-000000000005', 'Introduction of Communication System', 'co-u1', 1),
  ('b0000000-0000-0000-0000-000000000042', 'a0000000-0000-0000-0000-000000000005', 'Analog Communication', 'co-u2', 2),
  ('b0000000-0000-0000-0000-000000000043', 'a0000000-0000-0000-0000-000000000005', 'Digital Communication', 'co-u3', 3),
  ('b0000000-0000-0000-0000-000000000044', 'a0000000-0000-0000-0000-000000000005', 'Antenna Basics', 'co-u4', 4),
  ('b0000000-0000-0000-0000-000000000045', 'a0000000-0000-0000-0000-000000000005', 'Overview of Wireless Communication', 'co-u5', 5)
ON CONFLICT DO NOTHING;

-- Engineering Graphics units (11 weeks)
INSERT INTO units (id, subject_id, name, slug, sort_order) VALUES
  ('b0000000-0000-0000-0000-000000000051', 'a0000000-0000-0000-0000-000000000006', 'Week 1 — Introduction to Engineering Graphics', 'eg-u1', 1),
  ('b0000000-0000-0000-0000-000000000052', 'a0000000-0000-0000-0000-000000000006', 'Week 2 — Orthographic Projection', 'eg-u2', 2),
  ('b0000000-0000-0000-0000-000000000053', 'a0000000-0000-0000-0000-000000000006', 'Week 3 — Projection of Points', 'eg-u3', 3),
  ('b0000000-0000-0000-0000-000000000054', 'a0000000-0000-0000-0000-000000000006', 'Week 4 — Projections of Lines', 'eg-u4', 4),
  ('b0000000-0000-0000-0000-000000000055', 'a0000000-0000-0000-0000-000000000006', 'Week 5 — Projections of Planes', 'eg-u5', 5),
  ('b0000000-0000-0000-0000-000000000056', 'a0000000-0000-0000-0000-000000000006', 'Week 6 — Projections of Solids', 'eg-u6', 6),
  ('b0000000-0000-0000-0000-000000000057', 'a0000000-0000-0000-0000-000000000006', 'Week 7 — Isometric Projection', 'eg-u7', 7),
  ('b0000000-0000-0000-0000-000000000058', 'a0000000-0000-0000-0000-000000000006', 'Week 8 — Introduction to Computer Aided Design / AutoCAD', 'eg-u8', 8),
  ('b0000000-0000-0000-0000-000000000059', 'a0000000-0000-0000-0000-000000000006', 'Week 9 — Transformation of Projections', 'eg-u9', 9),
  ('b0000000-0000-0000-0000-000000000060', 'a0000000-0000-0000-0000-000000000006', 'Weeks 10–12 — Geometry and Topology of Engineered Components', 'eg-u10', 10),
  ('b0000000-0000-0000-0000-000000000061', 'a0000000-0000-0000-0000-000000000006', 'Week 13 — CIE Final Assessment', 'eg-u11', 11)
ON CONFLICT DO NOTHING;
