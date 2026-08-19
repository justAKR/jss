import {
  Atom,
  Sigma,
  Cpu,
  Radio,
  PencilRuler,
  BookOpen,
  FileText,
  Video,
  Link2,
  ClipboardList,
  FlaskConical,
  MessageSquare,
  Globe,
  GraduationCap,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react';

export type ResourceType =
  | 'PDF'
  | 'NOTE'
  | 'BOOK'
  | 'VIDEO'
  | 'PLAYLIST'
  | 'COURSE'
  | 'QUESTION_PAPER'
  | 'PYQ'
  | 'LAB_MANUAL'
  | 'VIVA'
  | 'WEBSITE'
  | 'ARTICLE'
  | 'OTHER';

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  subjectSlug: string;
  unitId: string;
  url?: string;
  description?: string;
}

export interface Unit {
  id: string;
  name: string;
  slug?: string;
}

export interface Subject {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
  color: string;
  units: Unit[];
}

export const subjects: Subject[] = [
  {
    slug: 'applied-physics',
    name: 'Applied Physics',
    shortName: 'Physics',
    description: 'Quantum mechanics, electromagnetic theory, crystal structures, material properties and optics.',
    icon: Atom,
    color: 'sky',
    units: [
      { id: 'ap-u0', name: 'General / Whole Course', slug: 'ap-u0' },
      { id: 'ap-u1', name: 'Quantum Mechanics' },
      { id: 'ap-u2', name: 'Electromagnetic Theory' },
      { id: 'ap-u3', name: 'Crystal Structures and X-ray Diffraction' },
      { id: 'ap-u4', name: 'Properties of Materials' },
      { id: 'ap-u5', name: 'Laser and Fibre Optics' },
    ],
  },
  {
    slug: 'linear-algebra-differential-equations',
    name: 'Linear Algebra & Differential Equations',
    shortName: 'Mathematics',
    description: 'Linear systems, matrices, vector spaces, inner products and differential equations.',
    icon: Sigma,
    color: 'indigo',
    units: [
      { id: 'ma-u0', name: 'General / Whole Course', slug: 'ma-u0' },
      { id: 'ma-u1', name: 'Linear Systems and Matrices' },
      { id: 'ma-u2', name: 'Vector Spaces and Linear Transformations' },
      { id: 'ma-u3', name: 'Inner Product Spaces' },
      { id: 'ma-u4', name: 'Ordinary Differential Equation' },
      { id: 'ma-u5', name: 'Advanced Methods for Solving Second Order Differential Equations' },
    ],
  },
  {
    slug: 'computational-thinking-problem-solving',
    name: 'Computational Thinking for Problem Solving',
    shortName: 'Computational Thinking',
    description: 'Computer systems, programming basics, operators, loops, arrays, functions, pointers and file handling.',
    icon: Cpu,
    color: 'emerald',
    units: [
      { id: 'ct-u0', name: 'General / Whole Course', slug: 'ct-u0' },
      { id: 'ct-u1', name: 'Components of Computer Systems, Computational Thinking & Programming Basics' },
      { id: 'ct-u2', name: 'Operators and Solving Expressions & Conditional Statements' },
      { id: 'ct-u3', name: 'Loops, Arrays & Functions' },
      { id: 'ct-u4', name: 'Searching, Sorting, Structure & Union' },
      { id: 'ct-u5', name: 'Pointers, Dynamic Memory, File Handling & Macros' },
    ],
  },
  {
    slug: 'basics-electronics-engineering',
    name: 'Basics of Electronics Engineering',
    shortName: 'Electronics',
    description: 'P-N junction diodes, BJT, FET, amplifiers, digital electronics and operational amplifiers.',
    icon: Radio,
    color: 'amber',
    units: [
      { id: 'ec-u0', name: 'General / Whole Course', slug: 'ec-u0' },
      { id: 'ec-u1', name: 'P-N Junction Diode and Power Supply' },
      { id: 'ec-u2', name: 'BJT and Amplifiers' },
      { id: 'ec-u3', name: 'Field Effect Transistor' },
      { id: 'ec-u4', name: 'Digital Electronics' },
      { id: 'ec-u5', name: 'Operational Amplifiers' },
    ],
  },
  {
    slug: 'basics-communication-engineering',
    name: 'Basics of Communication Engineering',
    shortName: 'Communication',
    description: 'Communication systems, analog and digital communication, antenna basics and wireless communication.',
    icon: Radio,
    color: 'rose',
    units: [
      { id: 'co-u0', name: 'General / Whole Course', slug: 'co-u0' },
      { id: 'co-u1', name: 'Introduction of Communication System' },
      { id: 'co-u2', name: 'Analog Communication' },
      { id: 'co-u3', name: 'Digital Communication' },
      { id: 'co-u4', name: 'Antenna Basics' },
      { id: 'co-u5', name: 'Overview of Wireless Communication' },
    ],
  },
  {
    slug: 'computer-aided-engineering-graphics-lab',
    name: 'Computer Aided Engineering Graphics Lab',
    shortName: 'Engineering Graphics',
    description: 'Engineering graphics, orthographic and isometric projections, CAD/AutoCAD and geometry of engineered components.',
    icon: PencilRuler,
    color: 'teal',
    units: [
      { id: 'eg-u0', name: 'General / Whole Course', slug: 'eg-u0' },
      { id: 'eg-u1', name: 'Week 1 — Introduction to Engineering Graphics' },
      { id: 'eg-u2', name: 'Week 2 — Orthographic Projection' },
      { id: 'eg-u3', name: 'Week 3 — Projection of Points' },
      { id: 'eg-u4', name: 'Week 4 — Projections of Lines' },
      { id: 'eg-u5', name: 'Week 5 — Projections of Planes' },
      { id: 'eg-u6', name: 'Week 6 — Projections of Solids' },
      { id: 'eg-u7', name: 'Week 7 — Isometric Projection' },
      { id: 'eg-u8', name: 'Week 8 — Introduction to Computer Aided Design / AutoCAD' },
      { id: 'eg-u9', name: 'Week 9 — Transformation of Projections' },
      { id: 'eg-u10', name: 'Weeks 10–12 — Geometry and Topology of Engineered Components' },
      { id: 'eg-u11', name: 'Week 13 — CIE Final Assessment' },
    ],
  },
  {
    slug: 'applied-chemistry',
    name: 'Applied Chemistry',
    shortName: 'Chemistry',
    description: 'Applied Chemistry covering sensors and display systems, energy storage and corrosion, electronic materials, nanomaterials, polymers, and green chemistry.',
    icon: FlaskConical,
    color: 'emerald',
    units: [
      { id: 'ac-u0', name: 'General / Whole Course', slug: 'ac-u0' },
      { id: 'ac-u1', name: 'Unit 1 — Sensors & Display Systems', slug: 'ac-u1' },
      { id: 'ac-u2', name: 'Unit 2 — Energy Storage Systems & Corrosion Science', slug: 'ac-u2' },
      { id: 'ac-u3', name: 'Unit 3 — Conductors, Insulators, Semiconductors & Computational Chemistry', slug: 'ac-u3' },
      { id: 'ac-u4', name: 'Unit 4 — Nanomaterials & Polymers', slug: 'ac-u4' },
      { id: 'ac-u5', name: 'Unit 5 — Green Chemistry, Green Fuels & E-Waste Management', slug: 'ac-u5' },
    ],
  },
];

export const resources: Resource[] = [
  // ── Applied Physics — Unit 1: Quantum Mechanics ──
  { id: 'ap-u1-r1', title: 'Quantum Mechanics — Notes', type: 'NOTE', subjectSlug: 'applied-physics', unitId: 'ap-u1' },
  { id: 'ap-u1-r2', title: 'Quantum Mechanics — Lecture 1', type: 'VIDEO', subjectSlug: 'applied-physics', unitId: 'ap-u1' },
  { id: 'ap-u1-r3', title: 'Quantum Mechanics — Lecture 2', type: 'VIDEO', subjectSlug: 'applied-physics', unitId: 'ap-u1' },
  { id: 'ap-u1-r4', title: 'Quantum Mechanics — Lecture 3', type: 'VIDEO', subjectSlug: 'applied-physics', unitId: 'ap-u1' },
  { id: 'ap-u1-r5', title: 'Schrödinger Equation — PDF', type: 'PDF', subjectSlug: 'applied-physics', unitId: 'ap-u1' },
  { id: 'ap-u1-r6', title: 'Quantum Mechanics — PYQ', type: 'PYQ', subjectSlug: 'applied-physics', unitId: 'ap-u1' },
  { id: 'ap-u1-r7', title: 'Quantum Mechanics — Practice Problems', type: 'NOTE', subjectSlug: 'applied-physics', unitId: 'ap-u1' },
  { id: 'ap-u1-r8', title: 'Quantum Mechanics — Reference Book', type: 'BOOK', subjectSlug: 'applied-physics', unitId: 'ap-u1' },

  // ── Applied Physics — Unit 2: Electromagnetic Theory ──
  { id: 'ap-u2-r1', title: 'Electromagnetic Theory — Notes', type: 'NOTE', subjectSlug: 'applied-physics', unitId: 'ap-u2' },
  { id: 'ap-u2-r2', title: 'Maxwell Equations — Notes', type: 'NOTE', subjectSlug: 'applied-physics', unitId: 'ap-u2' },
  { id: 'ap-u2-r3', title: 'Maxwell Equations — Lecture', type: 'VIDEO', subjectSlug: 'applied-physics', unitId: 'ap-u2' },
  { id: 'ap-u2-r4', title: 'Electromagnetic Waves — PDF', type: 'PDF', subjectSlug: 'applied-physics', unitId: 'ap-u2' },
  { id: 'ap-u2-r5', title: 'Electromagnetic Theory — PYQ', type: 'PYQ', subjectSlug: 'applied-physics', unitId: 'ap-u2' },
  { id: 'ap-u2-r6', title: "Gauss's Law — Article", type: 'ARTICLE', subjectSlug: 'applied-physics', unitId: 'ap-u2' },
  { id: 'ap-u2-r7', title: 'Electromagnetic Theory — Practice Set', type: 'NOTE', subjectSlug: 'applied-physics', unitId: 'ap-u2' },
  { id: 'ap-u2-r8', title: 'Electromagnetic Theory — Reference Book', type: 'BOOK', subjectSlug: 'applied-physics', unitId: 'ap-u2' },

  // ── Applied Physics — Unit 3: Crystal Structures and X-ray Diffraction ──
  { id: 'ap-u3-r1', title: 'Crystal Structures — Notes', type: 'NOTE', subjectSlug: 'applied-physics', unitId: 'ap-u3' },
  { id: 'ap-u3-r2', title: 'Crystal Structures — Lecture', type: 'VIDEO', subjectSlug: 'applied-physics', unitId: 'ap-u3' },
  { id: 'ap-u3-r3', title: 'Lattice & Unit Cell — PDF', type: 'PDF', subjectSlug: 'applied-physics', unitId: 'ap-u3' },
  { id: 'ap-u3-r4', title: 'X-Ray Diffraction — Notes', type: 'NOTE', subjectSlug: 'applied-physics', unitId: 'ap-u3' },
  { id: 'ap-u3-r5', title: 'X-Ray Diffraction — Lecture', type: 'VIDEO', subjectSlug: 'applied-physics', unitId: 'ap-u3' },
  { id: 'ap-u3-r6', title: 'Bragg\'s Law — Article', type: 'ARTICLE', subjectSlug: 'applied-physics', unitId: 'ap-u3' },
  { id: 'ap-u3-r7', title: 'Crystal Structures — PYQ', type: 'PYQ', subjectSlug: 'applied-physics', unitId: 'ap-u3' },

  // ── Applied Physics — Unit 4: Properties of Materials ──
  { id: 'ap-u4-r1', title: 'Properties of Materials — Notes', type: 'NOTE', subjectSlug: 'applied-physics', unitId: 'ap-u4' },
  { id: 'ap-u4-r2', title: 'Properties of Materials — Lecture', type: 'VIDEO', subjectSlug: 'applied-physics', unitId: 'ap-u4' },
  { id: 'ap-u4-r3', title: 'Elastic & Plastic Properties — PDF', type: 'PDF', subjectSlug: 'applied-physics', unitId: 'ap-u4' },
  { id: 'ap-u4-r4', title: 'Magnetic Properties — Article', type: 'ARTICLE', subjectSlug: 'applied-physics', unitId: 'ap-u4' },
  { id: 'ap-u4-r5', title: 'Dielectric Properties — Notes', type: 'NOTE', subjectSlug: 'applied-physics', unitId: 'ap-u4' },
  { id: 'ap-u4-r6', title: 'Properties of Materials — PYQ', type: 'PYQ', subjectSlug: 'applied-physics', unitId: 'ap-u4' },
  { id: 'ap-u4-r7', title: 'Properties of Materials — Reference Book', type: 'BOOK', subjectSlug: 'applied-physics', unitId: 'ap-u4' },
  { id: 'ap-u4-r8', title: 'Properties of Materials — Practice Set', type: 'NOTE', subjectSlug: 'applied-physics', unitId: 'ap-u4' },
  { id: 'ap-u4-r9', title: 'Thermal Properties — Article', type: 'ARTICLE', subjectSlug: 'applied-physics', unitId: 'ap-u4' },
  { id: 'ap-u4-r10', title: 'Properties of Materials — Question Paper', type: 'QUESTION_PAPER', subjectSlug: 'applied-physics', unitId: 'ap-u4' },

  // ── Applied Physics — Unit 5: Laser and Fibre Optics ──
  { id: 'ap-u5-r1', title: 'Laser — Notes', type: 'NOTE', subjectSlug: 'applied-physics', unitId: 'ap-u5' },
  { id: 'ap-u5-r2', title: 'Fibre Optics — Notes', type: 'NOTE', subjectSlug: 'applied-physics', unitId: 'ap-u5' },
  { id: 'ap-u5-r3', title: 'Laser and Fibre Optics — Lecture', type: 'VIDEO', subjectSlug: 'applied-physics', unitId: 'ap-u5' },
  { id: 'ap-u5-r4', title: 'Optical Fibre — PDF', type: 'PDF', subjectSlug: 'applied-physics', unitId: 'ap-u5' },
  { id: 'ap-u5-r5', title: 'Laser Applications — Article', type: 'ARTICLE', subjectSlug: 'applied-physics', unitId: 'ap-u5' },
  { id: 'ap-u5-r6', title: 'Laser and Fibre Optics — PYQ', type: 'PYQ', subjectSlug: 'applied-physics', unitId: 'ap-u5' },
  { id: 'ap-u5-r7', title: 'Holography — Notes', type: 'NOTE', subjectSlug: 'applied-physics', unitId: 'ap-u5' },
  { id: 'ap-u5-r8', title: 'Laser and Fibre Optics — Practice Set', type: 'NOTE', subjectSlug: 'applied-physics', unitId: 'ap-u5' },

  // ── Linear Algebra & Differential Equations — Unit 1: Linear Systems and Matrices ──
  { id: 'ma-u1-r1', title: 'Linear Systems and Matrices — Notes', type: 'NOTE', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u1' },
  { id: 'ma-u1-r2', title: 'Linear Systems — Lecture', type: 'VIDEO', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u1' },
  { id: 'ma-u1-r3', title: 'Matrix Operations — PDF', type: 'PDF', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u1' },
  { id: 'ma-u1-r4', title: 'Cramer\'s Rule — Article', type: 'ARTICLE', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u1' },
  { id: 'ma-u1-r5', title: 'Linear Systems — Practice Problems', type: 'NOTE', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u1' },

  // ── Linear Algebra & Differential Equations — Unit 2: Vector Spaces and Linear Transformations ──
  { id: 'ma-u2-r1', title: 'Vector Spaces — Notes', type: 'NOTE', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u2' },
  { id: 'ma-u2-r2', title: 'Vector Spaces — Lecture', type: 'VIDEO', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u2' },
  { id: 'ma-u2-r3', title: 'Linear Independence — PDF', type: 'PDF', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u2' },
  { id: 'ma-u2-r4', title: 'Basis & Dimension — Article', type: 'ARTICLE', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u2' },
  { id: 'ma-u2-r5', title: 'Linear Transformations — Notes', type: 'NOTE', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u2' },

  // ── Linear Algebra & Differential Equations — Unit 3: Inner Product Spaces ──
  { id: 'ma-u3-r1', title: 'Inner Product Spaces — Notes', type: 'NOTE', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u3' },
  { id: 'ma-u3-r2', title: 'Inner Product Spaces — Lecture', type: 'VIDEO', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u3' },
  { id: 'ma-u3-r3', title: 'Eigenvalues & Eigenvectors — PDF', type: 'PDF', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u3' },
  { id: 'ma-u3-r4', title: 'Diagonalization — Article', type: 'ARTICLE', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u3' },
  { id: 'ma-u3-r5', title: 'Cayley-Hamilton Theorem — Notes', type: 'NOTE', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u3' },

  // ── Linear Algebra & Differential Equations — Unit 4: Ordinary Differential Equation ──
  { id: 'ma-u4-r1', title: 'Ordinary Differential Equation — Notes', type: 'NOTE', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u4' },
  { id: 'ma-u4-r2', title: 'First-Order ODEs — Lecture', type: 'VIDEO', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u4' },
  { id: 'ma-u4-r3', title: 'Integrating Factors — PDF', type: 'PDF', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u4' },
  { id: 'ma-u4-r4', title: 'Applications of ODEs — Article', type: 'ARTICLE', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u4' },

  // ── Linear Algebra & Differential Equations — Unit 5: Advanced Methods for Solving Second Order Differential Equations ──
  { id: 'ma-u5-r1', title: 'Second-Order ODEs — Notes', type: 'NOTE', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u5' },
  { id: 'ma-u5-r2', title: 'Second-Order ODEs — Lecture', type: 'VIDEO', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u5' },
  { id: 'ma-u5-r3', title: 'Laplace Transforms — PDF', type: 'PDF', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u5' },
  { id: 'ma-u5-r4', title: 'PDEs Introduction — Article', type: 'ARTICLE', subjectSlug: 'linear-algebra-differential-equations', unitId: 'ma-u5' },

  // ── Computational Thinking — Unit 1: Components of Computer Systems, Computational Thinking & Programming Basics ──
  { id: 'ct-u1-r1', title: 'Components of Computer Systems — Notes', type: 'NOTE', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u1' },
  { id: 'ct-u1-r2', title: 'Computational Thinking — Lecture', type: 'VIDEO', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u1' },
  { id: 'ct-u1-r3', title: 'Programming Basics — PDF', type: 'PDF', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u1' },
  { id: 'ct-u1-r4', title: 'Abstraction & Decomposition — Article', type: 'ARTICLE', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u1' },
  { id: 'ct-u1-r5', title: 'Computer Systems — Practice Problems', type: 'NOTE', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u1' },

  // ── Computational Thinking — Unit 2: Operators and Solving Expressions & Conditional Statements ──
  { id: 'ct-u2-r1', title: 'Operators & Expressions — Notes', type: 'NOTE', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u2' },
  { id: 'ct-u2-r2', title: 'Operators & Expressions — Lecture', type: 'VIDEO', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u2' },
  { id: 'ct-u2-r3', title: 'Conditional Statements — PDF', type: 'PDF', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u2' },
  { id: 'ct-u2-r4', title: 'If-Else & Switch — Article', type: 'ARTICLE', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u2' },
  { id: 'ct-u2-r5', title: 'Operators — Practice Set', type: 'NOTE', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u2' },

  // ── Computational Thinking — Unit 3: Loops, Arrays & Functions ──
  { id: 'ct-u3-r1', title: 'Loops — Notes', type: 'NOTE', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u3' },
  { id: 'ct-u3-r2', title: 'Loops — Lecture', type: 'VIDEO', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u3' },
  { id: 'ct-u3-r3', title: 'Arrays — PDF', type: 'PDF', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u3' },
  { id: 'ct-u3-r4', title: 'Functions — Article', type: 'ARTICLE', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u3' },
  { id: 'ct-u3-r5', title: 'Python — Full Course', type: 'COURSE', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u3' },
  { id: 'ct-u3-r6', title: 'Python — Playlist', type: 'PLAYLIST', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u3' },

  // ── Computational Thinking — Unit 4: Searching, Sorting, Structure & Union ──
  { id: 'ct-u4-r1', title: 'Searching Algorithms — Notes', type: 'NOTE', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u4' },
  { id: 'ct-u4-r2', title: 'Sorting Algorithms — Lecture', type: 'VIDEO', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u4' },
  { id: 'ct-u4-r3', title: 'Structures & Union — PDF', type: 'PDF', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u4' },
  { id: 'ct-u4-r4', title: 'Bubble & Selection Sort — Article', type: 'ARTICLE', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u4' },
  { id: 'ct-u4-r5', title: 'Searching & Sorting — Practice Set', type: 'NOTE', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u4' },

  // ── Computational Thinking — Unit 5: Pointers, Dynamic Memory, File Handling & Macros ──
  { id: 'ct-u5-r1', title: 'Pointers — Notes', type: 'NOTE', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u5' },
  { id: 'ct-u5-r2', title: 'Dynamic Memory — Lecture', type: 'VIDEO', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u5' },
  { id: 'ct-u5-r3', title: 'File Handling — PDF', type: 'PDF', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u5' },
  { id: 'ct-u5-r4', title: 'Macros — Article', type: 'ARTICLE', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u5' },
  { id: 'ct-u5-r5', title: 'Pointers & File Handling — Practice Set', type: 'NOTE', subjectSlug: 'computational-thinking-problem-solving', unitId: 'ct-u5' },

  // ── Electronics — Unit 1: P-N Junction Diode and Power Supply ──
  { id: 'ec-u1-r1', title: 'P-N Junction Diode — Notes', type: 'NOTE', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u1' },
  { id: 'ec-u1-r2', title: 'P-N Junction Diode — Lecture', type: 'VIDEO', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u1' },
  { id: 'ec-u1-r3', title: 'Diode Characteristics — PDF', type: 'PDF', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u1' },
  { id: 'ec-u1-r4', title: 'Rectifiers & Power Supply — Notes', type: 'NOTE', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u1' },
  { id: 'ec-u1-r5', title: 'P-N Junction Diode — PYQ', type: 'PYQ', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u1' },
  { id: 'ec-u1-r6', title: 'P-N Junction Diode — Book', type: 'BOOK', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u1' },

  // ── Electronics — Unit 2: BJT and Amplifiers ──
  { id: 'ec-u2-r1', title: 'BJT — Notes', type: 'NOTE', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u2' },
  { id: 'ec-u2-r2', title: 'BJT — Lecture', type: 'VIDEO', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u2' },
  { id: 'ec-u2-r3', title: 'BJT Characteristics — PDF', type: 'PDF', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u2' },
  { id: 'ec-u2-r4', title: 'Amplifier Configurations — Article', type: 'ARTICLE', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u2' },
  { id: 'ec-u2-r5', title: 'BJT and Amplifiers — PYQ', type: 'PYQ', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u2' },

  // ── Electronics — Unit 3: Field Effect Transistor ──
  { id: 'ec-u3-r1', title: 'Field Effect Transistor — Notes', type: 'NOTE', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u3' },
  { id: 'ec-u3-r2', title: 'FET — Lecture', type: 'VIDEO', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u3' },
  { id: 'ec-u3-r3', title: 'JFET & MOSFET — PDF', type: 'PDF', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u3' },
  { id: 'ec-u3-r4', title: 'FET Applications — Article', type: 'ARTICLE', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u3' },

  // ── Electronics — Unit 4: Digital Electronics ──
  { id: 'ec-u4-r1', title: 'Digital Electronics — Notes', type: 'NOTE', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u4' },
  { id: 'ec-u4-r2', title: 'Digital Electronics — Lecture', type: 'VIDEO', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u4' },
  { id: 'ec-u4-r3', title: 'Logic Gates — PDF', type: 'PDF', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u4' },
  { id: 'ec-u4-r4', title: 'Boolean Algebra & K-Maps — Article', type: 'ARTICLE', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u4' },

  // ── Electronics — Unit 5: Operational Amplifiers ──
  { id: 'ec-u5-r1', title: 'Operational Amplifiers — Notes', type: 'NOTE', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u5' },
  { id: 'ec-u5-r2', title: 'Op-Amps — Lecture', type: 'VIDEO', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u5' },
  { id: 'ec-u5-r3', title: 'Op-Amp Applications — PDF', type: 'PDF', subjectSlug: 'basics-electronics-engineering', unitId: 'ec-u5' },

  // ── Communication — Unit 1: Introduction of Communication System ──
  { id: 'co-u1-r1', title: 'Introduction of Communication System — Notes', type: 'NOTE', subjectSlug: 'basics-communication-engineering', unitId: 'co-u1' },
  { id: 'co-u1-r2', title: 'Communication System — Lecture', type: 'VIDEO', subjectSlug: 'basics-communication-engineering', unitId: 'co-u1' },
  { id: 'co-u1-r3', title: 'Signals & Spectra — PDF', type: 'PDF', subjectSlug: 'basics-communication-engineering', unitId: 'co-u1' },
  { id: 'co-u1-r4', title: 'Signal Types — Article', type: 'ARTICLE', subjectSlug: 'basics-communication-engineering', unitId: 'co-u1' },

  // ── Communication — Unit 2: Analog Communication ──
  { id: 'co-u2-r1', title: 'Analog Communication — Notes', type: 'NOTE', subjectSlug: 'basics-communication-engineering', unitId: 'co-u2' },
  { id: 'co-u2-r2', title: 'Analog Communication — Lecture', type: 'VIDEO', subjectSlug: 'basics-communication-engineering', unitId: 'co-u2' },
  { id: 'co-u2-r3', title: 'AM & FM Modulation — PDF', type: 'PDF', subjectSlug: 'basics-communication-engineering', unitId: 'co-u2' },
  { id: 'co-u2-r4', title: 'Analog Communication — PYQ', type: 'PYQ', subjectSlug: 'basics-communication-engineering', unitId: 'co-u2' },

  // ── Communication — Unit 3: Digital Communication ──
  { id: 'co-u3-r1', title: 'Digital Communication — Notes', type: 'NOTE', subjectSlug: 'basics-communication-engineering', unitId: 'co-u3' },
  { id: 'co-u3-r2', title: 'Digital Communication — Lecture', type: 'VIDEO', subjectSlug: 'basics-communication-engineering', unitId: 'co-u3' },
  { id: 'co-u3-r3', title: 'PCM & ASK/FSK/PSK — PDF', type: 'PDF', subjectSlug: 'basics-communication-engineering', unitId: 'co-u3' },
  { id: 'co-u3-r4', title: 'Digital Communication — PYQ', type: 'PYQ', subjectSlug: 'basics-communication-engineering', unitId: 'co-u3' },

  // ── Communication — Unit 4: Antenna Basics ──
  { id: 'co-u4-r1', title: 'Antenna Basics — Notes', type: 'NOTE', subjectSlug: 'basics-communication-engineering', unitId: 'co-u4' },
  { id: 'co-u4-r2', title: 'Antenna Basics — Lecture', type: 'VIDEO', subjectSlug: 'basics-communication-engineering', unitId: 'co-u4' },
  { id: 'co-u4-r3', title: 'Wave Propagation — PDF', type: 'PDF', subjectSlug: 'basics-communication-engineering', unitId: 'co-u4' },

  // ── Communication — Unit 5: Overview of Wireless Communication ──
  { id: 'co-u5-r1', title: 'Overview of Wireless Communication — Notes', type: 'NOTE', subjectSlug: 'basics-communication-engineering', unitId: 'co-u5' },
  { id: 'co-u5-r2', title: 'Wireless Communication — Lecture', type: 'VIDEO', subjectSlug: 'basics-communication-engineering', unitId: 'co-u5' },
  { id: 'co-u5-r3', title: 'Wireless Technologies — Article', type: 'ARTICLE', subjectSlug: 'basics-communication-engineering', unitId: 'co-u5' },

  // ── Engineering Graphics — Week 1: Introduction to Engineering Graphics ──
  { id: 'eg-u1-r1', title: 'Introduction to Engineering Graphics — Notes', type: 'NOTE', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u1' },
  { id: 'eg-u1-r2', title: 'Engineering Graphics — Lecture', type: 'VIDEO', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u1' },
  { id: 'eg-u1-r3', title: 'Drawing Instruments & Standards — PDF', type: 'PDF', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u1' },

  // ── Engineering Graphics — Week 2: Orthographic Projection ──
  { id: 'eg-u2-r1', title: 'Orthographic Projection — Notes', type: 'NOTE', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u2' },
  { id: 'eg-u2-r2', title: 'Orthographic Projection — Lecture', type: 'VIDEO', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u2' },
  { id: 'eg-u2-r3', title: 'Orthographic Views — PDF', type: 'PDF', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u2' },

  // ── Engineering Graphics — Week 3: Projection of Points ──
  { id: 'eg-u3-r1', title: 'Projection of Points — Notes', type: 'NOTE', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u3' },
  { id: 'eg-u3-r2', title: 'Projection of Points — Lecture', type: 'VIDEO', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u3' },
  { id: 'eg-u3-r3', title: 'Projection of Points — Practice Sheet', type: 'NOTE', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u3' },

  // ── Engineering Graphics — Week 4: Projections of Lines ──
  { id: 'eg-u4-r1', title: 'Projections of Lines — Notes', type: 'NOTE', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u4' },
  { id: 'eg-u4-r2', title: 'Projections of Lines — Lecture', type: 'VIDEO', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u4' },
  { id: 'eg-u4-r3', title: 'Projections of Lines — Practice Sheet', type: 'NOTE', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u4' },

  // ── Engineering Graphics — Week 5: Projections of Planes ──
  { id: 'eg-u5-r1', title: 'Projections of Planes — Notes', type: 'NOTE', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u5' },
  { id: 'eg-u5-r2', title: 'Projections of Planes — Lecture', type: 'VIDEO', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u5' },
  { id: 'eg-u5-r3', title: 'Projections of Planes — Practice Sheet', type: 'NOTE', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u5' },

  // ── Engineering Graphics — Week 6: Projections of Solids ──
  { id: 'eg-u6-r1', title: 'Projections of Solids — Notes', type: 'NOTE', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u6' },
  { id: 'eg-u6-r2', title: 'Projections of Solids — Lecture', type: 'VIDEO', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u6' },
  { id: 'eg-u6-r3', title: 'Projections of Solids — Practice Sheet', type: 'NOTE', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u6' },

  // ── Engineering Graphics — Week 7: Isometric Projection ──
  { id: 'eg-u7-r1', title: 'Isometric Projection — Notes', type: 'NOTE', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u7' },
  { id: 'eg-u7-r2', title: 'Isometric Projection — Lecture', type: 'VIDEO', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u7' },
  { id: 'eg-u7-r3', title: 'Isometric Views — PDF', type: 'PDF', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u7' },

  // ── Engineering Graphics — Week 8: Introduction to Computer Aided Design / AutoCAD ──
  { id: 'eg-u8-r1', title: 'Introduction to CAD — Notes', type: 'NOTE', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u8' },
  { id: 'eg-u8-r2', title: 'AutoCAD Basics — Lecture', type: 'VIDEO', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u8' },
  { id: 'eg-u8-r3', title: 'AutoCAD — Tutorial Playlist', type: 'PLAYLIST', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u8' },

  // ── Engineering Graphics — Week 9: Transformation of Projections ──
  { id: 'eg-u9-r1', title: 'Transformation of Projections — Notes', type: 'NOTE', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u9' },
  { id: 'eg-u9-r2', title: 'Transformation of Projections — Lecture', type: 'VIDEO', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u9' },
  { id: 'eg-u9-r3', title: 'Transformation of Projections — Practice Sheet', type: 'NOTE', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u9' },

  // ── Engineering Graphics — Weeks 10–12: Geometry and Topology of Engineered Components ──
  { id: 'eg-u10-r1', title: 'Geometry of Engineered Components — Notes', type: 'NOTE', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u10' },
  { id: 'eg-u10-r2', title: 'Topology of Engineered Components — Lecture', type: 'VIDEO', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u10' },
  { id: 'eg-u10-r3', title: 'Geometry & Topology — PDF', type: 'PDF', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u10' },
  { id: 'eg-u10-r4', title: 'Geometry & Topology — Practice Sheet', type: 'NOTE', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u10' },

  // ── Engineering Graphics — Week 13: CIE Final Assessment ──
  { id: 'eg-u11-r1', title: 'CIE Final Assessment — Guidelines', type: 'NOTE', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u11' },
  { id: 'eg-u11-r2', title: 'CIE Final Assessment — Previous Papers', type: 'QUESTION_PAPER', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u11' },
  { id: 'eg-u11-r3', title: 'CIE Final Assessment — Viva Questions', type: 'VIVA', subjectSlug: 'computer-aided-engineering-graphics-lab', unitId: 'eg-u11' },
];

export const resourceTypeMeta: Record<ResourceType, { label: string; icon: LucideIcon }> = {
  PDF: { label: 'PDF', icon: FileText },
  NOTE: { label: 'Notes', icon: BookOpen },
  BOOK: { label: 'Book', icon: BookOpen },
  VIDEO: { label: 'Video', icon: Video },
  PLAYLIST: { label: 'Playlist', icon: Video },
  COURSE: { label: 'Course', icon: GraduationCap },
  QUESTION_PAPER: { label: 'Question Paper', icon: ClipboardList },
  PYQ: { label: 'PYQ', icon: HelpCircle },
  LAB_MANUAL: { label: 'Lab Manual', icon: FlaskConical },
  VIVA: { label: 'Viva', icon: MessageSquare },
  WEBSITE: { label: 'Website', icon: Globe },
  ARTICLE: { label: 'Article', icon: FileText },
  OTHER: { label: 'Resource', icon: Link2 },
};

export function getSubject(slug: string): Subject | undefined {
  return subjects.find((s) => s.slug === slug);
}

export function getResourcesForSubject(subjectSlug: string): Resource[] {
  return resources.filter((r) => r.subjectSlug === subjectSlug);
}

export function getResourcesForUnit(subjectSlug: string, unitId: string): Resource[] {
  return resources.filter((r) => r.subjectSlug === subjectSlug && r.unitId === unitId);
}
