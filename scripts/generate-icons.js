/**
 * Generate app icons, adaptive icon, favicon, and splash screen PNGs
 * using sharp to convert SVG → PNG.
 *
 * Usage:  node scripts/generate-icons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS = path.join(__dirname, '..', 'assets');

// ── Colour palette ──────────────────────────────────────────────────────
const BLUE  = '#2563eb';
const DARK  = '#1e3a5f';
const WHITE = '#ffffff';
const LIGHT = '#93c5fd';

// ── Logo SVG (location pin + road + speedometer + GPS arcs) ─────────────
function logoSvg(size, padding = 0) {
  const s = size;
  const p = padding;
  const inner = s - p * 2;
  const cx = s / 2;
  const cy = s / 2;
  const r = inner / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BLUE}"/>
      <stop offset="100%" stop-color="${DARK}"/>
    </linearGradient>
    <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${LIGHT}" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="${WHITE}" stop-opacity="0.9"/>
    </linearGradient>
  </defs>

  <!-- Background rounded square -->
  <rect x="${p}" y="${p}" width="${inner}" height="${inner}" rx="${inner * 0.22}" fill="url(#bg)"/>

  <!-- Road / route path -->
  <path d="M ${cx - r * 0.32} ${cy + r * 0.38}
           Q ${cx - r * 0.05} ${cy - r * 0.05}, ${cx + r * 0.15} ${cy - r * 0.30}
           T ${cx + r * 0.35} ${cy - r * 0.42}"
        stroke="url(#road)" stroke-width="${inner * 0.045}" fill="none" stroke-linecap="round"/>

  <!-- Location pin -->
  <g transform="translate(${cx - r * 0.18}, ${cy - r * 0.48})">
    <path d="M ${r * 0.18} 0
             C ${r * 0.32} 0, ${r * 0.36} ${r * 0.14}, ${r * 0.36} ${r * 0.22}
             C ${r * 0.36} ${r * 0.34}, ${r * 0.18} ${r * 0.52}, ${r * 0.18} ${r * 0.52}
             C ${r * 0.18} ${r * 0.52}, 0 ${r * 0.34}, 0 ${r * 0.22}
             C 0 ${r * 0.14}, ${r * 0.04} 0, ${r * 0.18} 0 Z"
          fill="${WHITE}"/>
    <circle cx="${r * 0.18}" cy="${r * 0.19}" r="${r * 0.07}" fill="${BLUE}"/>
  </g>

  <!-- Speedometer arc -->
  <g transform="translate(${cx}, ${cy + r * 0.15})">
    <path d="M ${-r * 0.22} ${r * 0.08}
             A ${r * 0.24} ${r * 0.24} 0 0 1 ${r * 0.22} ${r * 0.08}"
          stroke="${LIGHT}" stroke-width="${inner * 0.03}" fill="none" stroke-linecap="round" opacity="0.8"/>
    <line x1="0" y1="${r * 0.06}" x2="${r * 0.12}" y2="${-r * 0.10}"
          stroke="${WHITE}" stroke-width="${inner * 0.02}" stroke-linecap="round"/>
    <circle cx="0" cy="${r * 0.06}" r="${r * 0.03}" fill="${WHITE}"/>
  </g>

  <!-- GPS signal arcs -->
  <g transform="translate(${cx + r * 0.30}, ${cy - r * 0.25})" opacity="0.7">
    <path d="M 0 ${r * 0.06} A ${r * 0.06} ${r * 0.06} 0 0 1 0 ${-r * 0.06}"
          stroke="${LIGHT}" stroke-width="${inner * 0.015}" fill="none" stroke-linecap="round"/>
    <path d="M ${r * 0.04} ${r * 0.10} A ${r * 0.11} ${r * 0.11} 0 0 1 ${r * 0.04} ${-r * 0.10}"
          stroke="${LIGHT}" stroke-width="${inner * 0.015}" fill="none" stroke-linecap="round"/>
  </g>
</svg>`;
}

// ── Splash SVG ──────────────────────────────────────────────────────────
function splashSvg(w, h) {
  const iconSize = 200;
  const cx = w / 2;
  const cy = h / 2 - 60;

  // Inline the logo SVG contents (strip outer <svg> tag)
  const innerLogo = logoSvg(iconSize)
    .replace(/<svg[^>]*>/, '')
    .replace('</svg>', '');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="splashBg" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="${BLUE}"/>
      <stop offset="100%" stop-color="${DARK}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#splashBg)"/>
  <g transform="translate(${cx - iconSize / 2}, ${cy - iconSize / 2})">
    ${innerLogo}
  </g>
  <text x="${cx}" y="${cy + iconSize / 2 + 52}" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="bold" fill="${WHITE}">
    Driver Tracking
  </text>
  <text x="${cx}" y="${cy + iconSize / 2 + 84}" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="16" fill="${LIGHT}" opacity="0.8">
    Offline-first GPS tracking
  </text>
</svg>`;
}

// ── Generate PNGs ───────────────────────────────────────────────────────
async function generate() {
  console.log('Generating app assets...\n');

  const tasks = [
    { name: 'icon.png',          svg: logoSvg(1024),        w: 1024, h: 1024 },
    { name: 'adaptive-icon.png', svg: logoSvg(1024, 150),   w: 1024, h: 1024 },
    { name: 'favicon.png',       svg: logoSvg(196),         w: 196,  h: 196  },
    { name: 'splash.png',        svg: splashSvg(1284, 2778), w: 1284, h: 2778 },
  ];

  for (const t of tasks) {
    const outPath = path.join(ASSETS, t.name);
    await sharp(Buffer.from(t.svg))
      .resize(t.w, t.h)
      .png()
      .toFile(outPath);
    const stat = fs.statSync(outPath);
    console.log(`  ✓ ${t.name}  ${t.w}x${t.h}  (${(stat.size / 1024).toFixed(1)} KB)`);
  }

  // Also save the logo SVG for in-app use
  const srcAssets = path.join(__dirname, '..', 'src', 'assets');
  if (!fs.existsSync(srcAssets)) fs.mkdirSync(srcAssets, { recursive: true });
  fs.writeFileSync(path.join(srcAssets, 'logo.svg'), logoSvg(200), 'utf-8');
  console.log('  ✓ src/assets/logo.svg');

  console.log('\nAll assets generated successfully!');
}

generate().catch((err) => {
  console.error('Failed to generate assets:', err);
  process.exit(1);
});
