# Himanshu Verma - Professional Resume

A modern, responsive, and professional GitHub Pages resume site.

## 🌐 Live Demo

Visit: `https://himanverma.github.io/github-resume`

## 🚀 Features

- **Clean & Modern Design** - Professional gradient header with sleek card-based layout
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Print-Friendly** - Dedicated print styles for PDF export
- **Fast Loading** - Minimal dependencies, vanilla CSS/JS
- **SEO Optimized** - Semantic HTML structure with Schema.org JSON-LD
- **Accessible** - WCAG compliant color contrast, semantic markup, and ARIA landmarks
- **ATS Ready** - Hidden plain-text resume layer, comprehensive meta tags, and structured data for parser compatibility
- **Dual Theme** - Light and dark palettes with system preference + manual toggle persistence
- **AI Chat Assistant** - Interactive LLM-powered chat widget with support for OpenAI, Ollama (local), and built-in knowledge fallback
- **Print-Optimized PDF Export** - One-click download button with professional A4 layout, clean typography, and proper page breaks

## 📄 Sections Included

- Professional Summary
- Technical Skills (Backend, Frontend, Mobile, Databases, Infrastructure)
- AI & Emerging Technology Skills
- Professional Experience (12+ years)
- Key Projects
- Education
- Contact
- FAQ (AEO-optimized for rich snippets)
- Online Resume / QR Code

## ⭐ Featured Projects

- **BoloBill Voice Commerce** – AI voice-first ordering for Indian kiranas with WhatsApp ordering, UPI billing, and inventory automation.
- **Safe Ride Track** – Real-time fleet telemetry dashboards with live GPS, geofencing alerts, and driver scorecards.
- **AptitudeClasses 360°** – Competitive exam prep stack hosting 30 years of solved papers, tens of thousands of MCQs, and live quiz infrastructure.

## 🛠️ Tech Stack

- HTML5 (Semantic)
- CSS3 (Flexbox, Grid, Custom Properties)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter, JetBrains Mono)

## 📱 Responsive Breakpoints

- Desktop: 900px+
- Tablet: 768px
- Mobile: 480px

## 🚀 Deploy to GitHub Pages

### Step 1: Create a New Repository
1. Go to GitHub and create a new repository named `github-resume`
2. Make it public

### Step 2: Upload Files
Upload these files to your repository:
- `index.html`
- `styles.css`
- `script.js`

### Step 3: Enable GitHub Pages
1. Go to repository **Settings**
2. Scroll to **Pages** section (left sidebar)
3. Under **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: Select `main` and `/ (root)` folder
4. Click **Save**

### Step 4: Access Your Resume
Your resume will be live at:
```
https://yourusername.github.io/github-resume
```

## 📄 Export as PDF

### One-Click Download
Click the **Download PDF** button in the hero section. The resume is automatically formatted for **A4** with:
- Clean black-and-white typography
- Compact skill grids and project cards
- Professional page breaks between major sections
- Contact info integrated into the header
- QR code + "View online" link at the top-right of the first page
- All interactive elements (navbar, chat, FAQ, animations) hidden

### Manual Export
Alternatively, press `Ctrl + P` (Windows) or `Cmd + P` (Mac) and select **Save as PDF**.

**Recommended print settings:**
- Paper size: **A4**
- Margins: **Default**
- Background graphics: **Enabled** (for subtle skill tag backgrounds)

## 🎨 Customization

### Change Colors
Edit CSS custom properties in `styles.css`:
```css
:root {
    --primary-color: #2563eb;      /* Main blue */
    --secondary-color: #1e40af;    /* Dark blue */
    --accent-color: #3b82f6;       /* Light blue */
}
```

### Update Content
Edit `index.html` and replace:
- Contact information in the `<header>`
- Professional summary
- Skills and experience
- Project details

## 🤖 ATS Compatibility

The resume is optimized for Applicant Tracking Systems (ATS):

- **Schema.org JSON-LD** — `@graph` with `ProfilePage`, `Person`, and `FAQPage`; includes `worksFor`, `alumniOf`, `knowsAbout`, contact info, and skills
- **Hidden Plain-Text Layer** — A visually hidden `.ats-resume` block contains the full resume in plain HTML text for parsers that scrape DOM content
- **Semantic HTML + ARIA** — Proper `<main>`, `<nav>`, `<header>`, `<footer>` landmarks and `role` attributes
- **Microdata** — `itemprop` annotations on experience, education, and contact elements
- **Meta Tags** — Author, keywords, robots, Open Graph, Twitter Cards, canonical URL, theme-color, favicon, and apple-touch-icon
- **Crawl Files** — `robots.txt` and `sitemap.xml` for search engine indexing

## 🤖 AI Chat Assistant

The resume includes an embedded chat widget that lets visitors ask questions about Himanshu's experience, skills, and projects.

### Providers

- **Local Knowledge** (default) — No API key required. Uses built-in resume data to answer common questions instantly.
- **OpenAI** — Connect your own OpenAI API key for GPT-4o-mini powered responses. The key is stored locally in your browser.
- **Ollama** — Connect to a local Ollama instance (e.g., `http://localhost:11434`) for fully private, offline LLM inference.

### Setup

1. Click the chat icon in the bottom-right corner.
2. Use the settings (gear) icon to choose your preferred provider.
3. Enter API credentials if required and click **Save Settings**.
4. Start asking questions!

## 📧 Contact

For any inquiries, contact me at: [himan.verma@live.com](mailto:himan.verma@live.com)

---

© 2025 Himanshu Verma - Senior Full Stack Developer
