<div align="center">

# modo

### *Aesthetic, Minimalist and Intelligent Focus Timer*

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-rose.svg?style=for-the-badge)](LICENSE)

<p align="center">
  <b>modo</b> is a Pomodoro and interval focus timer crafted for deep work, flow state, and sustained productivity. Built with an OLED dark aesthetic, organic ambient background glow animations, and an intelligent right-docked floating sidebar.
</p>

</div>

---

## Highlights

- **Living Ambient Aura**: Dynamic multi-layer radial background glow with organic breathing and orbital light animations that smoothly follow the timer dial.
- **Precision Circular Dial**: SVG circular progress ring with icon-only controls, real-time countdown, and discrete session indicators.
- **Floating Right Dock Tabs**: Integrated vertical control center featuring:
  - **Quick Adjust**: Routine templates (*Classic 25/5*, *Deep Focus 50/10*, *Sprint 15/3*, *Ultradian 90/20*), fine-tuning steppers (`±5m`, `±1m`), round counters, and audio volume sliders.
  - **Preset Chains**: Build and run sequential, multi-stage productivity workflows.
  - **Focus Presets**: Save custom routines with custom intervals, colors, and iterations.
  - **Automated Schedules**: Set recurring alarms and automated session triggers (daily, weekly, monthly).
  - **Color Aesthetics**: Granular RGB/HEX color pickers, neon presets, and Dark/Light theme switching.
  - **Synthesized Audio**: Low-latency Web Audio API chime oscillators with volume slider and desktop notifications.
- **OLED Dark Design System**: Frosted glass surfaces, backdrop blurs, and high-contrast typography.
- **Adaptive Viewport**: Automatically centers the clock in the remaining visible screen space when expanding or collapsing the sidebar.

---

## Quick Start

### Prerequisites
- **Node.js**: `v18.0.0` or higher (or [Bun](https://bun.sh/))
- **Package Manager**: `npm`, `pnpm`, `yarn`, or `bun`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/HawkdotDev/pomomer.git
cd pomomer

# 2. Install dependencies
bun install
# or npm install / pnpm install / yarn

# 3. Launch development server
bun run dev
# or npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to run **modo**.

---

## Build and Deployment

```bash
# Type check and build production bundle
bun run build
# or npm run build

# Preview production build locally
bun run preview
# or npm run preview

# Run code linter
bun run lint
```

The optimized static build will be generated in the `dist/` directory, ready to deploy on **Vercel**, **Netlify**, **GitHub Pages**, or **Cloudflare Pages**.

---

## Architectural Overview

| Component | Responsibility |
| :--- | :--- |
| [`src/App.tsx`](src/App.tsx) | Core state coordinator, theme state, scheduler integration, and ambient layout synchronization. |
| [`src/components/TimerDisplay.tsx`](src/components/TimerDisplay.tsx) | Central dial with SVG circular progress ring, state indicators, and icon-only Reset/Play buttons. |
| [`src/components/FloatingSidebar.tsx`](src/components/FloatingSidebar.tsx) | Right-anchored tab dock managing Quick Adjust, Chains, Presets, Schedules, Aesthetics, and Alerts. |
| [`src/hooks/useTimer.ts`](src/hooks/useTimer.ts) | State engine managing active intervals, pauses, auto-transitions, and manual triggers. |
| [`src/hooks/useScheduler.ts`](src/hooks/useScheduler.ts) | Background recurrence engine executing scheduled focus sessions. |
| [`src/utils/notifications.ts`](src/utils/notifications.ts) | Pure Web Audio API synthesized chime sounds and Web Notifications handler. |

---

## Preset Templates Included

| Template Name | Focus Duration | Break Duration | Default Rounds | Best For |
| :--- | :---: | :---: | :---: | :--- |
| **Classic Pomodoro** | 25 min | 5 min | 4 rounds | Standard tasks, reading, structured study |
| **Deep Focus** | 50 min | 10 min | 3 rounds | Coding, writing, complex problem solving |
| **Sprint** | 15 min | 3 min | 4 rounds | Rapid reviews, email triage, inbox zero |
| **Ultradian Rhythm**| 90 min | 20 min | 2 rounds | Creative flow, architecture, peak cognitive work |

---

## Technologies Used

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom glassmorphism and keyframe aura shaders
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio**: Web Audio API AudioContext Synthesizer (harmonic sine/triangle chime oscillators)
- **Validation**: [Zod](https://zod.dev/)

---

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check out the [Issues page](https://github.com/HawkdotDev/pomomer/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add some NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

---

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## Author

**Dwaipayan Dutta**
- GitHub: [@HawkdotDev](https://github.com/HawkdotDev)
- Project: [modo](https://github.com/HawkdotDev/pomomer)
