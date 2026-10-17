/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Sappa Jayaram Siva Prasad - Portfolio Data
 * Strict verbatim extraction from resume.pdf with no fabrications.
 */

export interface Profile {
  name: string;
  shortName: string;
  role: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string;
  github: string;
  githubHandle: string;
  linkedin: string;
  linkedinHandle: string;
  leetcode: string;
  leetcodeHandle: string;
  portfolio: string;
  resumePdf: string;
  idNumber: string;
  department: string;
  validTill: string;
  aiSpecialization: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  index: string;
}

export interface SkillElement {
  number: number;
  symbol: string;
  name: string;
  family: 'Languages' | 'Frontend' | 'Backend' | 'AI & ML' | 'Tools & Core';
  categoryKey: string;
  isBrand: boolean;
  projects: string[];
  description: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  accentAccent?: string;
}

export interface ExperienceItem {
  type: 'experience' | 'education';
  title: string;
  organization: string;
  period: string;
  details: string[];
  highlights?: string;
}

export interface CertificationItem {
  id: string;
  index: string;
  title: string;
  issuer: string;
}

export interface AchievementItem {
  index: string;
  metric: string;
  targetValue: number;
  suffix?: string;
  prefix?: string;
  label: string;
  caption: string;
  detail: string;
  platform: 'LeetCode' | 'IBM' | 'Academics' | 'HackerRank';
  brandColor: string;
}

export const PROFILE: Profile = {
  name: 'Sappa Jayaram Siva Prasad',
  shortName: 'Jayaram',
  role: 'Software Engineer & AI Engineer | AI-Powered Full-Stack Developer',
  email: 'jayramsappa537@gmail.com',
  phone: '+91 9381201226',
  phoneHref: 'tel:+919381201226',
  location: 'Andhra Pradesh, India',
  resumeSummary:
    'Computer Science and Engineering undergraduate focused on software engineering, AI engineering, AI-powered full-stack development, and practical application building. Develops web applications with React, TypeScript, Node.js, Express.js, and Supabase, and integrates generative AI APIs into application workflows.',
  github: 'https://github.com/25A31A05GB',
  githubHandle: '25A31A05GB',
  linkedin: 'https://linkedin.com/in/jayaram-sappa09',
  linkedinHandle: 'jayaram-sappa09',
  leetcode: 'https://leetcode.com/u/25A31A05GB/',
  leetcodeHandle: '25A31A05GB',
  portfolio: 'https://portfolio-ten-woad-57.vercel.app',
  resumePdf: '/resume.pdf',
  idNumber: '25A31A05GB',
  department: 'Computer Science & Engineering',
  validTill: '2029',
  aiSpecialization: 'Google GenAI API (Gemini), RAG Architectures, Vector Embeddings, Prompt Engineering, Agentic AI, NLP Forensics',
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About', href: '#about', index: '01' },
  { id: 'skills', label: 'Skills', href: '#skills', index: '02' },
  { id: 'work', label: 'Work', href: '#work', index: '03' },
  { id: 'certifications', label: 'Certifications', href: '#certifications', index: '04' },
  { id: 'experience', label: 'Experience', href: '#experience', index: '05' },
  { id: 'achievements', label: 'Achievements', href: '#achievements', index: '06' },
  { id: 'contact', label: 'Contact', href: '#contact', index: '07' },
];

export const SKILL_CATEGORIES = ['All', 'AI', 'Full-Stack', 'General'] as const;
export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export const SKILL_FAMILIES = [
  'All',
  'Languages',
  'Frontend',
  'Backend',
  'AI & ML',
  'Tools & Core',
] as const;

export function getSkillCategories(skill: SkillElement): ('AI' | 'Full-Stack' | 'General')[] {
  const categories: ('AI' | 'Full-Stack' | 'General')[] = [];

  // AI Category
  if (
    skill.family === 'AI & ML' ||
    skill.name === 'Python' ||
    skill.name === 'Document Processing'
  ) {
    categories.push('AI');
  }

  // Full-Stack Category
  if (
    skill.family === 'Frontend' ||
    skill.family === 'Backend' ||
    ['TypeScript', 'JavaScript', 'SQL', 'Python', 'Git', 'GitHub', 'Postman'].includes(skill.name)
  ) {
    categories.push('Full-Stack');
  }

  // General Category (Core CS, Languages, Systems, Foundational Tools)
  if (
    skill.family === 'Languages' ||
    skill.family === 'Tools & Core' ||
    skill.name === 'Responsive UI'
  ) {
    categories.push('General');
  }

  return categories;
}

export const SKILLS: SkillElement[] = [
  // Languages
  {
    number: 1,
    symbol: 'Py',
    name: 'Python',
    family: 'Languages',
    categoryKey: 'lang',
    isBrand: true,
    projects: ['TraceXMail', 'Generative AI Pipelines'],
    description: 'Core programming language used for NLP/ML workflows, data pipelines and backend scripting.',
  },
  {
    number: 2,
    symbol: 'Cp',
    name: 'C++',
    family: 'Languages',
    categoryKey: 'lang',
    isBrand: true,
    projects: ['DSA Problem Solving (150+ LeetCode)'],
    description: 'High-performance algorithmic problem solving, memory management, and competitive programming.',
  },
  {
    number: 3,
    symbol: 'Js',
    name: 'JavaScript',
    family: 'Languages',
    categoryKey: 'lang',
    isBrand: true,
    projects: ['QuizArena AI', 'Freelance Web Projects'],
    description: 'Dynamic scripting, asynchronous events, and DOM manipulation across full-stack applications.',
  },
  {
    number: 4,
    symbol: 'Ts',
    name: 'TypeScript',
    family: 'Languages',
    categoryKey: 'lang',
    isBrand: true,
    projects: ['EngiPrepHub', 'TraceXMail', 'Verimedia AI'],
    description: 'Type-safe enterprise software architecture, robust interfaces, and end-to-end type soundness.',
  },
  {
    number: 5,
    symbol: 'Jv',
    name: 'Java',
    family: 'Languages',
    categoryKey: 'lang',
    isBrand: true,
    projects: ['OOP Fundamentals', 'Academic Coursework'],
    description: 'Object-oriented application architecture, design patterns, and platform-independent programming.',
  },
  {
    number: 6,
    symbol: 'C',
    name: 'C',
    family: 'Languages',
    categoryKey: 'lang',
    isBrand: true,
    projects: ['Systems Programming', 'Coursework'],
    description: 'Low-level systems programming, pointers, memory addressing, and computer architecture fundamentals.',
  },
  {
    number: 7,
    symbol: 'Sq',
    name: 'SQL',
    family: 'Languages',
    categoryKey: 'lang',
    isBrand: true,
    projects: ['EngiPrepHub', 'Verimedia AI'],
    description: 'Relational schema design, complex joins, indexing, query optimization, and transaction ACID properties.',
  },

  // Frontend
  {
    number: 8,
    symbol: 'Re',
    name: 'React',
    family: 'Frontend',
    categoryKey: 'fe',
    isBrand: true,
    projects: ['EngiPrepHub', 'TraceXMail', 'Verimedia AI'],
    description: 'Declarative UI component architecture, state management hooks, and virtual DOM rendering.',
  },
  {
    number: 9,
    symbol: 'Ht',
    name: 'HTML5',
    family: 'Frontend',
    categoryKey: 'fe',
    isBrand: true,
    projects: ['QuizArena AI', 'Client Websites'],
    description: 'Semantic markup, accessibility compliance, and structural document hierarchy.',
  },
  {
    number: 10,
    symbol: 'Cs',
    name: 'CSS3',
    family: 'Frontend',
    categoryKey: 'fe',
    isBrand: true,
    projects: ['QuizArena AI', 'Suto Cafe Web'],
    description: 'Modern flexbox, CSS grid, keyframe motion, custom properties, and fluid typography.',
  },
  {
    number: 11,
    symbol: 'Tw',
    name: 'Tailwind CSS',
    family: 'Frontend',
    categoryKey: 'fe',
    isBrand: true,
    projects: ['EngiPrepHub', 'TraceXMail', 'Portfolio'],
    description: 'Utility-first CSS framework for rapid, consistent, production-grade responsive design systems.',
  },
  {
    number: 12,
    symbol: 'Vt',
    name: 'Vite',
    family: 'Frontend',
    categoryKey: 'fe',
    isBrand: true,
    projects: ['EngiPrepHub', 'Modern Web Apps'],
    description: 'Next-generation ES module frontend tooling, instant development server, and optimized Rollup builds.',
  },
  {
    number: 13,
    symbol: 'Ru',
    name: 'Responsive UI',
    family: 'Frontend',
    categoryKey: 'fe',
    isBrand: false,
    projects: ['All Projects', 'QuizArena AI'],
    description: 'Fluid layout engineering adapting from 360px mobile viewports to 4K ultra-wide monitors.',
  },

  // Backend / Data
  {
    number: 14,
    symbol: 'Nd',
    name: 'Node.js',
    family: 'Backend',
    categoryKey: 'be',
    isBrand: true,
    projects: ['EngiPrepHub', 'TraceXMail', 'Verimedia AI'],
    description: 'Event-driven, asynchronous I/O JavaScript runtime powering scalable backend services.',
  },
  {
    number: 15,
    symbol: 'Ex',
    name: 'Express.js',
    family: 'Backend',
    categoryKey: 'be',
    isBrand: true,
    projects: ['EngiPrepHub', 'TraceXMail', 'Verimedia AI'],
    description: 'Minimalist HTTP web framework for routing, middleware pipelines, and REST API microservices.',
  },
  {
    number: 16,
    symbol: 'Ra',
    name: 'REST APIs',
    family: 'Backend',
    categoryKey: 'be',
    isBrand: false,
    projects: ['EngiPrepHub', 'TraceXMail'],
    description: 'Stateless architectural design, resource endpoints, standard status codes, and JSON serialization.',
  },
  {
    number: 17,
    symbol: 'Sb',
    name: 'Supabase',
    family: 'Backend',
    categoryKey: 'be',
    isBrand: true,
    projects: ['EngiPrepHub'],
    description: 'Open-source Firebase alternative featuring PostgreSQL database, Row Level Security, and auth.',
  },
  {
    number: 18,
    symbol: 'Sl',
    name: 'SQLite',
    family: 'Backend',
    categoryKey: 'be',
    isBrand: true,
    projects: ['Verimedia AI'],
    description: 'Lightweight zero-configuration embedded SQL database engine for media forensic indexing.',
  },
  {
    number: 19,
    symbol: 'Au',
    name: 'Authentication',
    family: 'Backend',
    categoryKey: 'be',
    isBrand: false,
    projects: ['EngiPrepHub', 'TraceXMail'],
    description: 'Secure session handling, token validation, password hashing, and role-based access control.',
  },
  {
    number: 20,
    symbol: 'Dp',
    name: 'Document Processing',
    family: 'Backend',
    categoryKey: 'be',
    isBrand: false,
    projects: ['EngiPrepHub', 'TraceXMail'],
    description: 'Extracting, sanitizing, and structuring complex PDF, email, and document data pipelines.',
  },

  // AI & ML
  {
    number: 21,
    symbol: 'Gg',
    name: 'Google GenAI API',
    family: 'AI & ML',
    categoryKey: 'ai',
    isBrand: true,
    projects: ['EngiPrepHub'],
    description: 'Gemini LLM multimodal integration, structured JSON schema outputs, and automated tutoring.',
  },
  {
    number: 22,
    symbol: 'Pe',
    name: 'Prompt Engineering',
    family: 'AI & ML',
    categoryKey: 'ai',
    isBrand: false,
    projects: ['EngiPrepHub', 'ChatGPT Essentials'],
    description: 'Chain-of-thought, few-shot prompting, and system instructions for reliable AI outputs.',
  },
  {
    number: 23,
    symbol: 'Rg',
    name: 'RAG',
    family: 'AI & ML',
    categoryKey: 'ai',
    isBrand: false,
    projects: ['EngiPrepHub AI', 'Study Materials'],
    description: 'Retrieval-Augmented Generation retrieving vectorized documentation for grounded LLM responses.',
  },
  {
    number: 24,
    symbol: 'Em',
    name: 'Embeddings',
    family: 'AI & ML',
    categoryKey: 'ai',
    isBrand: false,
    projects: ['TraceXMail', 'Verimedia AI'],
    description: 'High-dimensional semantic vector representations for similarity search and classification.',
  },
  {
    number: 25,
    symbol: 'Ml',
    name: 'ML Fundamentals',
    family: 'AI & ML',
    categoryKey: 'ai',
    isBrand: false,
    projects: ['TraceXMail', 'Data Visualization'],
    description: 'Supervised learning, classification metrics, precision-recall evaluation, and feature engineering.',
  },
  {
    number: 26,
    symbol: 'Ag',
    name: 'AI Agents',
    family: 'AI & ML',
    categoryKey: 'ai',
    isBrand: false,
    projects: ['ServiceNow Virtual Intern', 'EngiPrepHub'],
    description: 'Autonomous goal-seeking agent architectures with tool calling, self-reflection, and flows.',
  },

  // Tools & Core
  {
    number: 27,
    symbol: 'Gt',
    name: 'Git',
    family: 'Tools & Core',
    categoryKey: 'tool',
    isBrand: true,
    projects: ['All Repositories'],
    description: 'Distributed version control, branching strategies, conflict resolution, and commit history hygiene.',
  },
  {
    number: 28,
    symbol: 'Gh',
    name: 'GitHub',
    family: 'Tools & Core',
    categoryKey: 'tool',
    isBrand: true,
    projects: ['github.com/25A31A05GB'],
    description: 'Cloud repository hosting, pull requests, issue tracking, and CI/CD automated deployment.',
  },
  {
    number: 29,
    symbol: 'Vc',
    name: 'VS Code',
    family: 'Tools & Core',
    categoryKey: 'tool',
    isBrand: true,
    projects: ['Primary Development Environment'],
    description: 'Modern development environment configured with language servers, linters, and debugging tools.',
  },
  {
    number: 30,
    symbol: 'Sn',
    name: 'ServiceNow',
    family: 'Tools & Core',
    categoryKey: 'tool',
    isBrand: true,
    projects: ['ServiceNow Virtual Internship'],
    description: 'ITSM workflows, automated ATF testing, Flow Designer, Analytics, and enterprise automation.',
  },
  {
    number: 31,
    symbol: 'Ds',
    name: 'Data Structures & Algorithms',
    family: 'Tools & Core',
    categoryKey: 'tool',
    isBrand: false,
    projects: ['150+ LeetCode', 'GeeksforGeeks', 'HackerRank'],
    description: 'Arrays, linked lists, trees, graphs, dynamic programming, hashing, and asymptotic complexity.',
  },
  {
    number: 32,
    symbol: 'Oo',
    name: 'OOP',
    family: 'Tools & Core',
    categoryKey: 'tool',
    isBrand: false,
    projects: ['Academic Coursework', 'Full-Stack Architecture'],
    description: 'Encapsulation, inheritance, polymorphism, abstraction, and clean architectural separation of concerns.',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'engiprephub',
    index: '01',
    title: 'EngiPrepHub',
    kicker: 'Engineering Preparation Platform',
    description:
      'Built a full-stack learning platform; integrated AI-assisted workflows, backend APIs, and document-processing tools.',
    features: [
      'Full-stack learning architecture with React & Node.js',
      'Integrated Google GenAI API for adaptive study assistance',
      'Robust backend APIs with Express and document parsers',
      'Persistent storage and auth powered by Supabase',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'Supabase', 'Google GenAI API'],
    liveUrl: 'https://engiprephub.in',
    githubUrl: 'https://github.com/25A31A05GB',
  },
  {
    id: 'tracexmail',
    index: '02',
    title: 'TraceXMail',
    kicker: 'AI Email Threat Detection & Forensics',
    description:
      'Developed email threat-analysis workflows covering email parsing, sender/URL checks, authentication signals, and IP/domain intelligence.',
    features: [
      'End-to-end email header and MIME body parsing',
      'Sender reputation, SPF, DKIM & DMARC authentication checks',
      'Suspicious URL inspection and domain threat intelligence',
      'NLP and machine learning scoring pipeline for phishing triage',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'Python', 'NLP/ML'],
    liveUrl: 'https://tracexmail.vercel.app',
    githubUrl: 'https://github.com/25A31A05GB',
  },
  {
    id: 'verimedia',
    index: '03',
    title: 'Verimedia AI',
    kicker: 'Media Provenance & Forensics',
    description:
      'Built a media-investigation project for potentially manipulated or misused image, video, and audio content. Attended the IBM SkillsBuild Regional Hackathon finale with this project.',
    features: [
      'Forensic media inspection across image, video, and audio assets',
      'Metadata provenance validation and manipulation detection',
      'Lightweight local SQLite indexing for rapid investigative queries',
      'Showcased at the IBM SkillsBuild Regional Hackathon finale',
    ],
    tech: ['React', 'TypeScript', 'Express', 'SQLite'],
    liveUrl: 'https://verimedia-ai-jade.vercel.app',
    githubUrl: 'https://github.com/25A31A05GB',
  },
  {
    id: 'quizarena',
    index: '04',
    title: 'QuizArena AI',
    kicker: 'Interactive Quiz Prototype',
    description:
      'Created dynamic multiple-choice quizzes with score calculation, immediate feedback, and a responsive interface.',
    features: [
      'Dynamic multiple-choice question generation and timing',
      'Instant score computation and question-by-question review',
      'Responsive, lightweight interface with zero external baggage',
      'Immediate explanatory feedback for every correct and incorrect answer',
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/25A31A05GB',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'c1',
    index: '01',
    title: 'ServiceNow Virtual Internship Program',
    issuer: 'ServiceNow',
  },
  {
    id: 'c2',
    index: '02',
    title: 'Tata Data Visualization',
    issuer: 'Forage',
  },
  {
    id: 'c3',
    index: '03',
    title: 'Generative AI',
    issuer: 'Outskill',
  },
  {
    id: 'c4',
    index: '04',
    title: 'Python',
    issuer: 'Simplilearn',
  },
  {
    id: 'c5',
    index: '05',
    title: 'ChatGPT AI Essentials',
    issuer: 'Professional Certification',
  },
  {
    id: 'c6',
    index: '06',
    title: 'Full Stack Developer Master Class',
    issuer: 'Professional Certification',
  },
];

export const TIMELINE: ExperienceItem[] = [
  {
    type: 'experience',
    title: 'ServiceNow Virtual Intern',
    organization: 'ServiceNow',
    period: '04/2026 – 05/2026',
    details: [
      'Exposure to ServiceNow Administration, ITSM, and workflow automation.',
      'Constructed Flows, Automated Test Framework (ATF) suites, and custom Reports & Analytics.',
      'Explored introductory Agentic AI concepts applied to enterprise workflow automation.',
    ],
    highlights: 'ITSM, Automated Flows, ATF & Agentic AI',
  },
  {
    type: 'experience',
    title: 'Full-Stack Developer Intern',
    organization: 'Thiranex',
    period: 'Internship',
    details: [
      'Full-stack development internship experience through practical project implementation tasks.',
      'Delivered clean, modular components and API endpoints across internal tasks.',
    ],
    highlights: 'Full-stack engineering & project delivery',
  },
  {
    type: 'experience',
    title: 'Freelance Web Developer',
    organization: 'Suto Cafe and Divines Eternity',
    period: 'Client Engagements',
    details: [
      'Built custom websites and digital presence for commercial client projects.',
      'Ensured cross-device responsive UI, SEO foundations, and clean performance.',
    ],
    highlights: 'Client production websites & responsive web design',
  },
  {
    type: 'education',
    title: 'B.Tech, Computer Science and Engineering',
    organization: 'Pragati Engineering College (Autonomous), Andhra Pradesh',
    period: '2025 – 2029',
    details: [
      'Current Academic CGPA: 9.30 / 10.',
      'Core coursework: Data Structures & Algorithms, Object-Oriented Programming (OOP), Programming Fundamentals.',
      'Active competitive programmer and hackathon builder.',
    ],
    highlights: 'CGPA 9.30/10 · Pragati Engineering College',
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    index: '01 / 04',
    metric: '150+',
    targetValue: 150,
    suffix: '+',
    label: 'LeetCode Problems Solved',
    caption: 'Algorithmic Problem Solving',
    detail: 'Practices DSA continuously across LeetCode, HackerRank, and GeeksforGeeks.',
    platform: 'LeetCode',
    brandColor: '#FFA116',
  },
  {
    index: '02 / 04',
    metric: 'Finalist',
    targetValue: 1,
    prefix: 'Top ',
    label: 'IBM SkillsBuild Regional Hackathon',
    caption: 'Regional Finale Attendee',
    detail: 'Attended the IBM SkillsBuild Regional Hackathon finale with the Verimedia AI project.',
    platform: 'IBM',
    brandColor: '#0530AD',
  },
  {
    index: '03 / 04',
    metric: '9.30',
    targetValue: 9.3,
    suffix: ' / 10',
    label: 'Academic CGPA',
    caption: 'B.Tech Computer Science & Engineering',
    detail: 'Pragati Engineering College (Autonomous), Andhra Pradesh (2025–2029 cohort).',
    platform: 'Academics',
    brandColor: '#10B981',
  },
  {
    index: '04 / 04',
    metric: '3',
    targetValue: 3,
    suffix: ' Platforms',
    label: 'Active DSA Platforms',
    caption: 'LeetCode · HackerRank · GeeksforGeeks',
    detail: 'Consistent problem solving across data structures, graph algorithms, and algorithmic thinking.',
    platform: 'HackerRank',
    brandColor: '#00EA64',
  },
];
