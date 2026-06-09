# Project Rules — github-resume

## Tech Stack

- **Type**: Static single-page site (no build step, no framework)
- **Languages**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Fonts**: Inter, JetBrains Mono (Google Fonts CDN)
- **Deploy**: GitHub Pages from root branch

## Conventions

### File Organization
- Keep everything in root (no subfolders for source files)
- `index.html` is the only entry point
- `styles.css` holds ALL styles including responsive, print, and chat widget styles
- `script.js` holds ALL JavaScript including theme, particles, scroll, chat, and PDF logic
- No splitting CSS/JS into multiple files unless the file exceeds 2000 lines

### CSS Rules
- Use CSS custom properties (`:root` variables) for all colors, spacing, fonts
- Dark theme lives in `[data-theme="dark"]` block, never a separate file
- All `@media print` styles must be in a single block at the end of `styles.css`
- Component naming: BEM-like prefixes (`.chat-`, `.timeline-`, `.skill-`)
- `!important` is allowed ONLY inside `@media print` to override existing styles

### JavaScript Rules
- All code inside a single `DOMContentLoaded` listener
- Use `const`/`let`, arrow functions, template literals
- Feature-gate DOM queries: `if (element) { ... }` or optional chaining
- LocalStorage keys must be prefixed with `hv-`
- Async functions for all external API calls (OpenAI, Ollama)
- Never hardcode API keys in source; always read from localStorage or user input

### HTML Rules
- Semantic tags: `<nav>`, `<header>`, `<section>`, `<footer>`
- Section IDs must match nav anchor hrefs exactly (`#about`, `#skills`, etc.)
- All interactive elements must have accessible `aria-label`
- SVG icons inline (no sprite sheets, no external icon libraries)

### Adding New Features

1. **HTML**: Add markup in logical section order or before `</body>` if floating
2. **CSS**: Add styles in a dedicated block before the print media query; use existing CSS variables
3. **JS**: Add logic inside `DOMContentLoaded`; group related features with section comments
4. **Docs**: Update `README.md` feature list and `CODEMAP.md` architecture section

### AI Chat Widget Rules
- The `SYSTEM_PROMPT` must stay in sync with resume content in `index.html`
- When updating resume data (experience, skills, projects), update `SYSTEM_PROMPT` in `script.js`
- New providers need: (a) settings UI row, (b) `localStorage` key, (c) fetch function, (d) README docs
- `callLocalKnowledge` keyword matching must cover all major resume topics

### Print / PDF Rules
- The `@media print` block must hide ALL interactive elements (nav, chat, buttons, animations)
- Hero must render contact info via `::after` pseudo-element when contact section is hidden
- All cards must use `page-break-inside: avoid`
- Print styles must not rely on background graphics being enabled in browser

### ATS / SEO Rules
- Every resume update must be reflected in ALL three places: visible HTML, `.ats-resume` hidden block, and JSON-LD `SYSTEM_PROMPT`
- `.ats-resume` must use standard heading hierarchy (`h1` > `h2` > `p`/`ul`) and never rely on CSS for content
- Schema.org JSON-LD must include: `Person`, `worksFor[]`, `alumniOf`, `knowsAbout[]`, `sameAs[]`, contact fields
- Add `itemprop` microdata to experience, education, and contact elements
- Meta keywords must include all major skills and job titles
- ARIA landmarks (`role="banner"`, `role="main"`, `role="navigation"`, `role="contentinfo"`) must be present
- Canonical URL and `robots: index,follow` meta tag required

## Deployment Checklist

- [ ] All three source files (`index.html`, `styles.css`, `script.js`) committed
- [ ] `README.md` and `CODEMAP.md` updated for any new features
- [ ] JS syntax validated (`node --check script.js`)
- [ ] No `console.log` left in production code
- [ ] GitHub Pages source set to branch root
