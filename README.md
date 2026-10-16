# Sappa Jayaram Siva Prasad — Personal Portfolio

Production-ready, ultra-clean personal portfolio for **Sappa Jayaram Siva Prasad**, Software Engineer & AI-Powered Full-Stack Developer.

Designed in accordance with the quiet luxury design constitution: monochromatic warm paper palette (`#f4f2ee`), zero fabricated data, Lenis smooth scrolling, and bespoke section animations.

---

## 1. Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

---

## 2. Section Map

| Order | Section | Visual Interaction & Architecture |
| :--- | :--- | :--- |
| **00** | **Hero** | Seamless looping video (`hero.webm` & `hero.mp4`), mix-blend multiply on paper, voice intro, 46px solid ink sound control, outlined ghost typography. |
| **01** | **About** | 3-column equal height layout. Center column features a realistic ID badge hanging on a lanyard with pendulum spring damping & 3D card flip on hover/tap/keyboard. |
| **02** | **Skills** | Periodic table of technical stack (8 columns desktop, 4 mobile) with family filter chips, diagonal entrance wave, and sticky 320px inspector featuring 150px brand logos. |
| **03** | **Work** | Side-by-side expanding accordion gallery (`min(78svh, 640px)`). Open panel displays features, tech chips, links, and pure CSS/JSX grayscale illustrative UI. |
| **04** | **Certifications** | White band layout with sticky heading and ink-flood row hover effects (`scaleX 0→1`), animated arrows, and credentials count. |
| **05** | **Experience** | Unified chronological timeline combining education and internships. The ink spine draws progressively with scroll position, lighting up stops. |
| **06** | **Achievements** | Viewport-pinned horizontal gallery (`100svh sticky`). Horizontal slide mapped to vertical scroll, featuring `easeOutQuart` count-up numbers and center card elevation. |
| **07** | **Contact & Footer** | Kinetic text with hopping letters on cursor pass, interactive copy email chip with `aria-live`, phone/social links, and continuous spinning badge. |

---

## 3. Hero Looping Video Pipeline

The video processing script `scripts/build-hero-assets.py` processes raw camera footage into seamless loops:

```bash
# Run pipeline with custom crop coordinates
python3 scripts/build-hero-assets.py --input intro.mp4 --crop-x 560 --crop-y 80 --crop-w 800 --crop-h 1000 --duration 9.5 --fade 0.5
```

### Steps Executed by the Pipeline:
1. **Centering & Scaling**: Crops around the subject and scales to 768px wide (768:960 aspect ratio).
2. **Backdrop Whitening**: Uses `colorlevels=rimax=0.98:gimax=0.98:bimax=0.98` to harmonize off-white backdrops with `--paper`.
3. **Seamless Video Cross-Fade**: Uses `ffmpeg xfade` to blend the final 0.5 seconds into the opening 0.5 seconds.
4. **Sample-Accurate Audio Cross-Fade**: Employs sample-level cross-fading so repeated playback produces no audible click or phase cancellation.
5. **Format Delivery**: Exports dual WebM (VP9, Opus 80k) and MP4 (H.264 yuv420p, AAC 96k, `+faststart`).
6. **Stills**: Extracts 480x600 `portrait-bust.webp` and 1200x630 `og.jpg`.

---

## 4. Brand Logos, Credits & Licenses

All brand logos adhere to their respective official trademark guidelines and open-source licenses:

- **React, Python, TypeScript, Node.js, Vite, Tailwind CSS**: Devicon / Simple Icons (MIT License).
- **ServiceNow, LeetCode, HackerRank, IBM**: Respective company trademark properties used purely for descriptive, non-commercial identification of achievements and credentials.
- **Concepts & Architecture Icons**: Bespoke SVG line glyphs authored specifically for this portfolio.
