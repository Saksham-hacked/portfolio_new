# Saksham Kaushish — Developer Portfolio

A premium, modern developer portfolio built with React, GSAP, Lenis smooth scroll, and Tailwind CSS. Designed for internship applications with recruiter-friendly layout and smooth animations.

---

## Tech Stack

- **React 18** + Vite
- **GSAP 3** + ScrollTrigger + TextPlugin
- **Lenis** — smooth scroll
- **Tailwind CSS 3**
- **react-simple-maps** — interactive location map

---

## Getting Started

### Install dependencies
```bash
npm install
```

### Run dev server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

### Build for production
```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── MagneticCursor.jsx       — Custom cursor dot + ring
│   ├── Loader.jsx               — Fullscreen loader with counter
│   ├── Navbar.jsx               — Fixed top navigation
│   ├── Footer.jsx               — Bottom footer
│   └── sections/
│       ├── Hero.jsx             — Landing section with reveal image
│       ├── Marquee.jsx          — Infinite scrolling text ticker
│       ├── About.jsx            — About + life chronometer
│       ├── Skills.jsx           — Tech stack / expertise
│       ├── Projects.jsx         — Horizontal scroll projects
│       ├── Experience.jsx       — Vertical timeline
│       ├── Contact.jsx          — Contact CTA
│       └── LocationMap.jsx      — Interactive map (Roorkee, India)
├── animations/
│   ├── lenis.js                 — Smooth scroll init/destroy
│   └── gsapAnimations.js        — Reusable GSAP helpers
├── hooks/
│   ├── useMagnetic.js           — Magnetic hover effect hook
│   └── useGSAP.js               — Safe GSAP context hook
├── assets/                      — Images go here
├── App.jsx
├── main.jsx
└── index.css
```

---

## Features

- **Loader** — Black fullscreen loader with animated percentage counter and curtain reveal
- **Custom Cursor** — Dot + ring cursor with magnetic pull on buttons
- **Hero Section** — Animated name reveal, typewriter effect, cursor-reveal image effect (hover to reveal anime portrait)
- **Marquee** — Infinite scrolling skills ticker
- **About** — Live age chronometer counting years, months, days, hours, minutes, seconds since birth
- **Skills** — Three-column expertise grid on dark background
- **Projects** — Pinned horizontal scroll section with project cards
- **Experience** — Vertical timeline with animated line drawing on scroll
- **Contact** — Full-bleed dark section with email CTA
- **Location Map** — Interactive zoomable map pinned to Roorkee, Uttarakhand, India
- **Smooth Scroll** — Lenis synced with GSAP ScrollTrigger
- **All animations bi-directional** — play on enter, reverse on leave

---

## Customization

| What | File |
|---|---|
| Your name | `src/components/sections/Hero.jsx` |
| Role / typewriter text | `src/components/Loader.jsx` |
| Birth date | `src/components/sections/About.jsx` → `BIRTH_DATE` |
| Career start date | `src/components/sections/About.jsx` → `CAREER_START` |
| About story text | `src/components/sections/About.jsx` |
| Projects | `src/components/sections/Projects.jsx` → `PROJECTS` array |
| Experience / Education | `src/components/sections/Experience.jsx` → `TIMELINE` array |
| Contact email | `src/components/sections/Contact.jsx` |
| Social links | `src/components/Footer.jsx` + `Contact.jsx` |
| Navbar logo | `src/components/Navbar.jsx` → `YN.DEV` |
| Portrait photo | `src/assets/portrait2.jpg` |
| Anime / reveal photo | `src/assets/portrait_anime.jpg` |

---

## Adding Your Photos

Drop your images into `src/assets/` then update `Hero.jsx`:

```jsx
// Bottom layer — real photo
<img src="/src/assets/portrait2.jpg" alt="Saksham Kaushish" className="w-full h-full object-cover" />

// Top layer — anime / alternate photo (revealed on cursor hover)
<img src="/src/assets/portrait_anime.jpg" alt="Saksham Anime" className="w-full h-full object-cover" />
```

---

## Animation Controls

| Animation | Controlled in |
|---|---|
| Loader counter speed | `Loader.jsx` → `duration: 1.5` |
| Curtain speed | `Loader.jsx` → `.to(loader, { duration: 0.6 })` |
| Hero name timing | `Loader.jsx` → `.hero-name` tween |
| Hero stagger speed | `Loader.jsx` → `stagger: 0.04` |
| Typewriter text | `Loader.jsx` → `text: 'Fullstack | AI | Web'` |
| Typewriter speed | `Loader.jsx` → `duration: 2.5` |
| Scroll animations | Each section file → `useGSAP` hook |
| Cursor reveal radius | `Hero.jsx` → `RevealImage` → `RADIUS = 120` |
| Smooth scroll speed | `src/animations/lenis.js` → `duration: 1.2` |

---

## Deployment

### Vercel (recommended)
1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Framework preset: **Vite**
4. Deploy

### Netlify
1. Run `npm run build`
2. Drag `/dist` folder to [netlify.com/drop](https://netlify.com/drop)

---

## Location

Roorkee, Uttarakhand, India  
Coordinates: `[77.8898, 29.8543]`

---

## License

Personal portfolio — not for redistribution.

---

Built by **Saksham Kaushish**
