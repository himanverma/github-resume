const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  HeadingLevel, BorderStyle, TabStopType, TabStopPosition,
  ShadingType, convertInchesToTwip, PageNumber, Footer,
  Header, ImageRun, ExternalHyperlink, UnderlineType,
  spacing, Table, TableRow, TableCell, WidthType, TableBorders,
  VerticalAlign
} = require('docx');
const fs = require('fs');

// ─── Color Palette ───
const NAVY = '1B2A4A';
const ACCENT = '2563EB';
const DARK = '1F2937';
const MEDIUM = '4B5563';
const LIGHT_BG = 'EFF6FF';
const DIVIDER = 'CBD5E1';
const WHITE = 'FFFFFF';

// ─── Helpers ───
function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 360, after: 120 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 2, color: ACCENT, space: 4 },
    },
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: 24,
        color: NAVY,
        font: 'Calibri',
      }),
    ],
  });
}

function bulletPoint(text, opts = {}) {
  const parts = [];
  if (typeof text === 'string') {
    parts.push(new TextRun({ text, size: 20, color: DARK, font: 'Calibri', ...opts }));
  } else {
    // array of TextRun configs
    text.forEach(t => parts.push(new TextRun({ size: 20, color: DARK, font: 'Calibri', ...t })));
  }
  return new Paragraph({
    spacing: { before: 40, after: 40 },
    indent: { left: convertInchesToTwip(0.25) },
    bullet: { level: 0 },
    children: parts,
  });
}

function spacer(before = 80) {
  return new Paragraph({ spacing: { before, after: 0 }, children: [] });
}

function skillPill(label, items) {
  return new Paragraph({
    spacing: { before: 80, after: 40 },
    children: [
      new TextRun({ text: `${label}:  `, bold: true, size: 20, color: NAVY, font: 'Calibri' }),
      new TextRun({ text: items, size: 20, color: MEDIUM, font: 'Calibri' }),
    ],
  });
}

function experienceBlock(title, company, period, stack, bullets) {
  const children = [];

  // Title row
  children.push(
    new Paragraph({
      spacing: { before: 240, after: 0 },
      children: [
        new TextRun({ text: title, bold: true, size: 22, color: NAVY, font: 'Calibri' }),
        new TextRun({ text: '  |  ', size: 20, color: DIVIDER, font: 'Calibri' }),
        new TextRun({ text: company, bold: true, size: 20, color: ACCENT, font: 'Calibri' }),
      ],
    })
  );

  // Period + Stack
  const metaParts = [
    new TextRun({ text: period, italics: true, size: 19, color: MEDIUM, font: 'Calibri' }),
  ];
  if (stack) {
    metaParts.push(new TextRun({ text: '    ·    ', size: 19, color: DIVIDER, font: 'Calibri' }));
    metaParts.push(new TextRun({ text: stack, size: 19, color: MEDIUM, font: 'Calibri' }));
  }
  children.push(new Paragraph({ spacing: { before: 40, after: 60 }, children: metaParts }));

  // Bullets
  bullets.forEach(b => children.push(bulletPoint(b)));

  return children;
}

// ─── Build Document ───
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: 'Calibri', size: 20, color: DARK },
      },
      listParagraph: {
        run: { font: 'Calibri', size: 20 },
      },
    },
  },
  numbering: {
    config: [
      {
        reference: 'bullet-list',
        levels: [
          {
            level: 0,
            format: 'bullet',
            text: '\u2022',
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.15) },
              },
            },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(0.6),
            bottom: convertInchesToTwip(0.5),
            left: convertInchesToTwip(0.7),
            right: convertInchesToTwip(0.7),
          },
        },
      },
      children: [
        // ═══════════════════════════════════════════════════
        // HEADER — Name + Title
        // ═══════════════════════════════════════════════════
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 0 },
          children: [
            new TextRun({
              text: 'HIMANSHU VERMA',
              bold: true,
              size: 40,
              color: NAVY,
              font: 'Calibri',
              characterSpacing: 120,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 60, after: 40 },
          children: [
            new TextRun({
              text: 'Senior Full Stack Architect  ·  Staff Engineer  ·  12+ Years',
              size: 22,
              color: ACCENT,
              font: 'Calibri',
            }),
          ],
        }),

        // Contact line
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 40, after: 40 },
          children: [
            new TextRun({ text: '+91 8750784618', size: 19, color: MEDIUM, font: 'Calibri' }),
            new TextRun({ text: '   ·   ', size: 19, color: DIVIDER, font: 'Calibri' }),
            new TextRun({ text: 'himan.verma@live.com', size: 19, color: ACCENT, font: 'Calibri', underline: { type: UnderlineType.SINGLE } }),
            new TextRun({ text: '   ·   ', size: 19, color: DIVIDER, font: 'Calibri' }),
            new TextRun({ text: 'Lucknow, India', size: 19, color: MEDIUM, font: 'Calibri' }),
            new TextRun({ text: '   ·   ', size: 19, color: DIVIDER, font: 'Calibri' }),
            new TextRun({ text: 'Open to Remote (US/EU)', size: 19, color: MEDIUM, font: 'Calibri', italics: true }),
          ],
        }),

        // Thin divider
        new Paragraph({
          spacing: { before: 80, after: 80 },
          border: {
            bottom: { style: BorderStyle.SINGLE, size: 1, color: DIVIDER, space: 1 },
          },
          children: [],
        }),

        // ═══════════════════════════════════════════════════
        // PROFESSIONAL SUMMARY
        // ═══════════════════════════════════════════════════
        sectionHeading('Professional Summary'),
        new Paragraph({
          spacing: { before: 80, after: 80 },
          children: [
            new TextRun({
              text: 'Results-driven Full Stack Architect with 12+ years of experience designing, building, and scaling production systems across fintech, e-commerce, logistics, and SaaS verticals. Deep expertise in ',
              size: 20, color: DARK, font: 'Calibri',
            }),
            new TextRun({
              text: 'distributed architectures, real-time systems, and cloud-native platforms',
              bold: true, size: 20, color: DARK, font: 'Calibri',
            }),
            new TextRun({
              text: ' serving millions of transactions. Proven track record of leading cross-functional engineering teams (up to 15 engineers), establishing CI/CD pipelines, and driving 40%+ performance improvements through architectural re-design. Currently pioneering ',
              size: 20, color: DARK, font: 'Calibri',
            }),
            new TextRun({
              text: 'Agentic AI systems and local LLM deployments',
              bold: true, size: 20, color: DARK, font: 'Calibri',
            }),
            new TextRun({
              text: ' to embed intelligent automation into full-stack workflows. Seeking Staff/Principal Engineer roles at high-growth remote-first companies.',
              size: 20, color: DARK, font: 'Calibri',
            }),
          ],
        }),

        // ═══════════════════════════════════════════════════
        // CORE SKILLS
        // ═══════════════════════════════════════════════════
        sectionHeading('Core Technical Skills'),
        skillPill('Backend', 'Laravel, Node.js, AdonisJS, Express, REST APIs, GraphQL, Microservices, WebSockets (Socket.IO)'),
        skillPill('Frontend', 'React.js, Next.js, TypeScript, TailwindCSS, Zustand, Vite, Server-Side Rendering, Responsive Design'),
        skillPill('Mobile', 'React Native, Expo, NativeWind, Offline-First Architecture, Background Sync, GPS Tracking'),
        skillPill('Data', 'MySQL, MongoDB, PostgreSQL, Redis, Prisma ORM, Database Optimization, Caching Strategies'),
        skillPill('Cloud & DevOps', 'AWS (EC2, S3, Lambda, RDS, CloudFront), Docker, CI/CD (GitHub Actions), Nginx, SSL/TLS'),
        skillPill('Auth & Security', 'Auth0, JWT, OAuth 2.0, RBAC, API Rate Limiting, Input Sanitization'),
        skillPill('Tools', 'Git, Jira, Figma, Postman, VS Code, Linux Administration'),

        // ═══════════════════════════════════════════════════
        // AI & LLM SKILLS
        // ═══════════════════════════════════════════════════
        sectionHeading('AI & LLM Capabilities'),
        bulletPoint('Designed and deployed Agentic AI systems with autonomous multi-step reasoning and tool-calling capabilities'),
        bulletPoint('Deployed local LLMs using Ollama for on-premise inference — reduced API costs by ~90% for internal tooling'),
        bulletPoint('Implemented function calling with FunctionGemma (270M) for structured output generation and workflow automation'),
        bulletPoint('Engineered advanced prompt chains for code generation, document analysis, and customer support automation'),
        bulletPoint('Integrated LLM APIs (OpenAI, Gemini, Claude) into production applications with streaming, retry logic, and fallback strategies'),
        bulletPoint('Built AI-powered automation pipelines for data extraction, content generation, and intelligent routing'),

        // ═══════════════════════════════════════════════════
        // PROFESSIONAL EXPERIENCE
        // ═══════════════════════════════════════════════════
        sectionHeading('Professional Experience'),

        // --- Capital Numbers ---
        ...experienceBlock(
          'Senior Software Developer',
          'Capital Numbers Infotech Pvt Ltd',
          'Jan 2025 – Present',
          'Next.js · Zustand · Auth0 · TailwindCSS · NativeWind',
          [
            'Architected and delivered two greenfield client platforms (ottogusto.com, qverde.com) from system design through production deployment, achieving <2s Time-to-Interactive on mobile',
            'Engineered a modular component library with Zustand state management, reducing feature development time by 35% across projects',
            'Implemented Auth0-based multi-tenant authentication with RBAC, supporting SSO for enterprise clients',
            'Established CI/CD pipelines and automated testing workflows, cutting deployment cycles from days to under 30 minutes',
          ]
        ),

        // --- Payix ---
        ...experienceBlock(
          'Senior Software Engineer',
          'Payix | RePay (Fintech)',
          '2020 – 2024',
          'Laravel · React.js · Node.js · Docker · Redis · MySQL',
          [
            'Led architecture and development of a payment processing platform handling 500K+ monthly transactions with 99.95% uptime',
            'Re-engineered legacy monolith into a microservices architecture (12 services), reducing deployment risk and enabling independent team scaling',
            'Designed real-time notification system using Socket.IO and Redis Pub/Sub, serving 50K+ concurrent connections with <200ms latency',
            'Built Dockerized development environments and CI/CD pipelines (GitHub Actions), reducing onboarding time from 2 days to 2 hours',
            'Optimized database queries and implemented Redis caching layer, achieving 40% reduction in API response times (p95: 800ms → 480ms)',
            'Mentored a team of 8 engineers through code reviews, architecture discussions, and pair programming sessions',
          ]
        ),

        // --- Appster ---
        ...experienceBlock(
          'Senior Software Engineer',
          'Appster LLP',
          '2016 – 2018',
          'AWS · Docker · React.js · React Native · Node.js',
          [
            'Delivered 6+ cross-platform mobile applications (React Native) for startup clients, from ideation to App Store/Play Store launch',
            'Designed scalable AWS infrastructure (EC2, S3, Lambda, CloudFront) supporting 100K+ daily active users per application',
            'Implemented offline-first data sync architecture for field-service apps, ensuring zero data loss in low-connectivity environments',
            'Established reusable component libraries and coding standards adopted across 4 engineering teams',
          ]
        ),

        // --- Zakoopi ---
        ...experienceBlock(
          'Technical Lead & Architect',
          'Zakoopi / RustOrange',
          '2015 – 2016',
          'PHP · Node.js · Redis · React.js',
          [
            'Promoted to Technical Lead within 6 months; led a team of 5 engineers delivering an e-commerce platform processing 10K+ orders/month',
            'Architected event-driven order management system with Redis queues, achieving 3x throughput improvement over synchronous processing',
            'Designed and implemented RESTful API layer (40+ endpoints) consumed by web, mobile, and third-party integrations',
          ]
        ),

        // --- Earlier Career ---
        new Paragraph({
          spacing: { before: 240, after: 0 },
          children: [
            new TextRun({ text: 'Earlier Career', bold: true, size: 22, color: NAVY, font: 'Calibri' }),
          ],
        }),
        new Paragraph({
          spacing: { before: 40, after: 60 },
          children: [
            new TextRun({ text: '2011 – 2015  ·  Progressive growth from Web Developer → UI/UX Developer → Team Leader → Senior Team Leader', italics: true, size: 19, color: MEDIUM, font: 'Calibri' }),
          ],
        }),

        bulletPoint([
          { text: 'Futureworks Pvt Ltd', bold: true },
          { text: ' — Senior Team Leader (2014–2015): Led 10-member team delivering enterprise web applications; introduced Agile/Scrum practices' },
        ]),
        bulletPoint([
          { text: 'Cardinal Technology Solutions', bold: true },
          { text: ' — UI/UX Developer (2013–2014): Designed responsive interfaces for 15+ client projects; improved conversion rates by 25%' },
        ]),
        bulletPoint([
          { text: 'Maaraj Strategic Development', bold: true },
          { text: ' — Team Leader (2012–2013): Managed offshore development team delivering web solutions for Middle East clients' },
        ]),
        bulletPoint([
          { text: 'Macro Info Solutions', bold: true },
          { text: ' — Web Developer (2011–2012): Built PHP/MySQL web applications; foundation in full-stack development' },
        ]),

        // ═══════════════════════════════════════════════════
        // SELECTED PROJECTS
        // ═══════════════════════════════════════════════════
        sectionHeading('Selected Projects'),

        new Paragraph({
          spacing: { before: 160, after: 40 },
          children: [
            new TextRun({ text: 'Driver Tracking Platform', bold: true, size: 21, color: NAVY, font: 'Calibri' }),
            new TextRun({ text: '  —  ', size: 20, color: DIVIDER, font: 'Calibri' }),
            new TextRun({ text: 'Expo · React Native · Zustand · GPS · Background Sync', size: 19, color: MEDIUM, font: 'Calibri' }),
          ],
        }),
        bulletPoint('Engineered an Android-first offline-capable GPS tracking app with real-time route recording, odometer photo capture, and crash-resilient background sync to REST API'),
        bulletPoint('Implemented trip state machine with idempotent uploads, exponential backoff, and automatic crash recovery — achieving 99.9% sync reliability'),

        spacer(120),

        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({ text: 'Fintech Payment Gateway', bold: true, size: 21, color: NAVY, font: 'Calibri' }),
            new TextRun({ text: '  —  ', size: 20, color: DIVIDER, font: 'Calibri' }),
            new TextRun({ text: 'Laravel · React · Redis · Docker · MySQL', size: 19, color: MEDIUM, font: 'Calibri' }),
          ],
        }),
        bulletPoint('Architected multi-tenant payment processing platform with PCI-DSS-aligned security, handling 500K+ monthly transactions'),
        bulletPoint('Designed microservices decomposition strategy that reduced deployment failures by 70% and enabled independent team velocity'),

        spacer(120),

        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({ text: 'AI Automation Toolkit', bold: true, size: 21, color: NAVY, font: 'Calibri' }),
            new TextRun({ text: '  —  ', size: 20, color: DIVIDER, font: 'Calibri' }),
            new TextRun({ text: 'Ollama · FunctionGemma · Node.js · Prompt Engineering', size: 19, color: MEDIUM, font: 'Calibri' }),
          ],
        }),
        bulletPoint('Built agentic AI system with local LLM inference (Ollama + FunctionGemma 270M) for autonomous task execution with structured function calling'),
        bulletPoint('Reduced external API costs by ~90% by deploying on-premise models for internal document analysis and code generation workflows'),

        spacer(120),

        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({ text: 'E-Commerce Platform (Zakoopi)', bold: true, size: 21, color: NAVY, font: 'Calibri' }),
            new TextRun({ text: '  —  ', size: 20, color: DIVIDER, font: 'Calibri' }),
            new TextRun({ text: 'PHP · Node.js · Redis · React.js', size: 19, color: MEDIUM, font: 'Calibri' }),
          ],
        }),
        bulletPoint('Designed event-driven order pipeline with Redis queues processing 10K+ orders/month with 3x throughput vs. legacy system'),

        // ═══════════════════════════════════════════════════
        // EDUCATION
        // ═══════════════════════════════════════════════════
        sectionHeading('Education'),
        new Paragraph({
          spacing: { before: 120, after: 40 },
          children: [
            new TextRun({ text: 'Bachelor of Computer Applications (BCA)', bold: true, size: 21, color: NAVY, font: 'Calibri' }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 40 },
          children: [
            new TextRun({ text: 'University of Lucknow, India', size: 19, color: MEDIUM, font: 'Calibri' }),
          ],
        }),

        spacer(80),

        // ═══════════════════════════════════════════════════
        // FOOTER
        // ═══════════════════════════════════════════════════
        new Paragraph({
          spacing: { before: 200, after: 0 },
          border: {
            top: { style: BorderStyle.SINGLE, size: 1, color: DIVIDER, space: 8 },
          },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'References and detailed project case studies available upon request.',
              italics: true,
              size: 18,
              color: MEDIUM,
              font: 'Calibri',
            }),
          ],
        }),
      ],
    },
  ],
});

// ─── Generate File ───
async function generate() {
  const buffer = await Packer.toBuffer(doc);
  const outputPath = require('path').join(__dirname, '..', 'Himanshu_Verma_Resume.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Resume generated: ${outputPath}`);
}

generate().catch(err => {
  console.error('Failed to generate resume:', err);
  process.exit(1);
});
