<div align="center">

# Modo

### *Aesthetic Pomodoro Timer, Deep Work Studio & Ambient Soundscapes*

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-rose.svg?style=for-the-badge)](LICENSE)

<p align="center">
  <b>Modo</b> is a minimalist, ultra-smooth Pomodoro timer and distraction-free deep work studio crafted for developers, writers, students, and flow-state practitioners.
</p>

[**Live Demo**](https://hawkdotdev.github.io/modo/) • [**Report Bug**](https://github.com/HawkdotDev/modo/issues) • [**Request Feature**](https://github.com/HawkdotDev/modo/issues)

</div>

---

## Features

- **Wall-Clock Timing Engine**: Zero-jitter hybrid 60 FPS foreground loop with background tab heartbeat interval. Accurate down to the millisecond with uninterrupted chimes when tabs are minimized or inactive.
- **Synthesized Ambient Soundscapes**: Pure Web Audio generated Brownian Noise, Gentle Rain, Ocean Waves, and 432Hz Alpha Binaural Beats (10Hz focus difference) with idle auto-suspension to preserve CPU and battery.
- **Harmonic Chimes & Audio Ducking**: Low-latency synthesized completion bells (Zen Bell, Tibetan Singing Bowl, Marimba, Digital Arpeggio) that automatically duck background soundscapes and music during alerts.
- **Cinematic 4K Video Backgrounds**: Curated aesthetic video scenes with custom video upload support.
- **Routine Chaining**: Sequence multiple focus and break intervals with customizable transition pauses for complex workflows.
- **Automated Scheduling**: Set recurring study and deep work schedules with daily, weekly, or monthly recurrence.
- **Modular Clock Styles & Themes**: Switch between Minimal Glowing Ring and Giant Focus Digits scenes, custom HEX accent colors, and dark/light modes.
- **Dynamic Code-Splitting**: On-demand lazy-loaded sidebar panels with an initial application bundle of just 16.4 kB (gzipped).
- **WCAG 2.1 AA Accessibility**: Full ARIA landmark support (role="timer", aria-live="polite", role="toolbar", skip links).
- **Comprehensive Search Engine Optimization**: Pre-rendered semantic crawler shell, OpenGraph/Twitter social cards, WebApplication, HowTo, and FAQPage Schema.org JSON-LD knowledge graphs.

---

## Quick Start

### Prerequisites
- **Node.js**: `v18.0.0` or higher (or [Bun](https://bun.sh/))
- **Package Manager**: `bun`, `npm`, `pnpm`, or `yarn`

### Installation & Local Run

```bash
# 1. Clone the repository
git clone https://github.com/HawkdotDev/modo.git
cd modo

# 2. Install dependencies
bun install
# or: npm install

# 3. Start local development server
bun run dev
# or: npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Build & Deployment

```bash
# Type check and build production bundle
bun run build
# or: npm run build

# Preview production build locally
bun run preview
# or: npm run preview

# Lint code
bun run lint
```

The optimized static build will be generated in the `dist/` directory, ready to deploy on GitHub Pages, Vercel, Netlify, or Cloudflare Pages.

---

## Focus Templates Included

| Template | Focus Duration | Break Duration | Default Rounds | Best For |
| :--- | :---: | :---: | :---: | :--- |
| **Classic Pomodoro** | 25 min | 5 min | 4 rounds | General study, reading, everyday tasks |
| **Deep Work** | 50 min | 10 min | 3 rounds | Coding, writing, complex engineering |
| **Sprint** | 15 min | 3 min | 4 rounds | Inbox zero, rapid code reviews, quick triage |
| **Ultradian Rhythm** | 90 min | 20 min | 2 rounds | Peak creative flow and architecture sessions |

---

## Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| <kbd>Space</kbd> | Start / Pause Timer |
| <kbd>R</kbd> | Reset Active Timer |
| <kbd>F</kbd> | Toggle Fullscreen Mode |
| <kbd>Esc</kbd> | Close Sidebar Panel / Exit Fullscreen |

---

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

## Author

**HawkdotDev**
- GitHub: [@HawkdotDev](https://github.com/HawkdotDev)
- Repository: [Modo](https://github.com/HawkdotDev/modo)
