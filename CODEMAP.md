# Project Codemap — github-resume

Static single-page resume. Vanilla HTML, CSS, JS. No build step. Deployed to GitHub Pages.

---

## File Structure

```
github-resume/
├── index.html          # Single-page resume (semantic HTML)
├── styles.css          # All styles: layout, theme, components, print
├── script.js           # All interactivity: theme, particles, scroll, chat, PDF
├── README.md           # User-facing docs
├── CODEMAP.md          # This file — structural reference
└── .windsurf/
    └── rules.md        # Project conventions and workflows
```

---

## Architecture

### Layout Flow (index.html)
1. `<nav class="navbar">` — Fixed nav with brand, links, theme toggle, mobile hamburger
2. `<header class="hero" id="about">` — Name, title, summary, stats, CTAs (email, GitHub, PDF), code window
3. `<section class="skills" id="skills">` — 6 skill-group cards (3-col grid)
4. `<section class="experience" id="experience">` — Timeline with 5 items + earlier roles
5. `<section class="projects" id="projects">` — 6 project cards (3-col grid)
6. `<section class="education" id="education">` — Single education card
7. `<section class="contact" id="contact">` — 4 contact items (email, phone, location, GitHub)
8. `<footer class="footer">` — Built-by credit + dynamic year
9. **AI Chat Widget** — Fixed-position floating chat (toggle button + chat panel)

### CSS Architecture (styles.css)
- `:root` — CSS custom properties for light + dark themes
- `[data-theme="dark"]` — Dark theme override
- Component blocks: navbar, hero, skills, timeline, projects, education, contact, footer
- Chat widget styles: `chat-toggle`, `chat-widget`, `chat-header`, `chat-messages`, `chat-input-area`
- Animations: `fade-in`, `pulse`, `blink`, `glow`, `typingBounce`
- Responsive: `@media (max-width: 1024px)`, `@media (max-width: 768px)`, `@media (max-width: 480px)`
- **Print**: `@media print` — A4-optimized layout (`@page { size: A4; margin: 16mm 18mm; }`)

### JavaScript Modules (script.js)
| Function | Purpose |
|----------|---------|
| `applyTheme(theme)` | Toggle `data-theme` attr on `<html>` |
| `detectPreferredTheme()` | Read `localStorage` or `prefers-color-scheme` |
| Typewriter effect | Animate `.typewriter` text char-by-char |
| Particle canvas | `Particle` class + `animate()` loop on `#bgCanvas`; pauses on `visibilitychange` |
| IntersectionObserver | Adds `.visible` to `.fade-in` elements on scroll |
| Smooth scroll | Nav links scroll to `#section` |
| Mobile menu | `.menu-toggle` toggles `.nav-links.active` |
| Navbar scroll | Adjusts navbar background opacity on scroll |
| Dynamic year | Sets `.footer-year` to `new Date().getFullYear()` |
| **AI Chat** | See Chat Widget section below |
| **PDF Download** | `window.print()` trigger on `#downloadPdfBtn` click |

---

## AI Chat Widget (script.js)

### DOM Elements
- `#chatToggle` — Floating action button (bottom-right)
- `#chatWidget` — Chat panel (hidden by default, toggled via `.open`)
- `#chatSettings` — Provider config panel (toggled via `.open`)
- `#chatMessages` — Message container
- `#chatInput` / `#chatSend` — Input + send button

### Settings (localStorage key: `hv-chat-settings`)
```js
{ provider: 'local'|'openai'|'ollama', apiKey: '', ollamaUrl: '', ollamaModel: '' }
```

### Backends
1. **`callLocalKnowledge(message)`** — Keyword-matched canned responses. No API call. Async delay for UX.
2. **`callOpenAI(message, apiKey)`** — Fetch to `api.openai.com/v1/chat/completions`, model `gpt-4o-mini`, full resume as system prompt.
3. **`callOllama(message, baseUrl, model)`** — Fetch to local Ollama `/api/chat` endpoint.

### System Prompt
Embedded `SYSTEM_PROMPT` constant contains full resume context (skills, experience, projects, contact) so all LLM providers answer accurately.

---

## Print / PDF Export (styles.css)

- `@page { size: A4; margin: 16mm 18mm; }`
- Hidden: navbar, canvas, hero-visual, chat, animations, buttons, footer, contact section
- Hero rendered as clean header with contact strip via `::after` pseudo-element
- Skills: 3-col compact grid with bordered tags
- Experience: timeline stripped of dots/lines, compact text
- Projects: 2-col grid with bordered cards
- Education: minimal row layout
- Page-break-inside: avoid on cards, timeline items, skill groups

---

## Data Flows

```
User clicks theme toggle  →  localStorage "hv-theme"  →  applyTheme()
User scrolls              →  IntersectionObserver  →  .fade-in.visible
User opens chat           →  .chat-widget.open      →  chatInput.focus()
User sends message        →  load settings          →  provider switch
                          →  fetch (OpenAI/Ollama) or local match
                          →  appendMessage() to DOM
User clicks Download PDF  →  window.print()         →  @media print rules
```

---

## External Dependencies
- Google Fonts: Inter, JetBrains Mono
- No npm packages, no bundler

## Deployment
- GitHub Pages (static branch deploy from root)
- Live URL: `https://himanverma.github.io/github-resume`
