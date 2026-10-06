# Birthday Love Letter 💌

A cinematic, scene-based romantic birthday experience recreated from the
reference video: dark purple atmosphere, falling hearts, glowing gift,
flying polaroids, typewriter letter, memory wall, custom video player,
glitch finale and replay.

## Run it

```bash
npm install
npm run dev
```

Production build: `npm run build` → static files in `dist/`.

## Configuration

| What | Where |
|---|---|
| Countdown unlock (5 minutes after page load) | `src/config/site.config.ts` |
| All texts (letter, wishes, finale, captions, buttons) | `src/data/content.ts` |
| Photo/video paths | `src/data/media.ts` |
| Watermark handle | `src/config/site.config.ts` |
| Optional background music | `src/config/site.config.ts` → `MUSIC.enabled` |

## Experience flow

Countdown (locked) → unlock → gift pulse → sparkle burst → gallery
polaroids fly in → typewriter letter → memories wall (re-flow) → video →
wishes card → glitch finale → replay.

## MEDIA TO REPLACE

| Placeholder | Used in |
|---|---|
| `/assets/images/polaroid-01.jpeg` … `polaroid-08.jpeg` | Gallery scene, 8 flying polaroids (3 from left, 5 from right) |
| `/assets/images/memory-02.jpeg` … `memory-16.jpeg` | Memories wall, batch 1 (8) then re-flow batch 2 (7) |
| `/assets/videos/moment.mp4` | "A Moment For You" custom video player |
| `/assets/audio/background-music.mp3` | Optional music (off by default — set `MUSIC.enabled = true`) |

Drop your real files into `public/assets/...` using the same filenames
(4:5 portrait photos look best; 16:9 video).

## Tech

React 18 + Vite + TypeScript, Tailwind CSS, Framer Motion (`AnimatePresence
mode="wait"`), canvas-confetti (gift burst), one persistent canvas for
bokeh/stars/falling particles, custom `useCountdown` + `useTypewriter` hooks.
No Three.js, no GSAP.

## Assumptions made

- The small caption under the countdown was unclear in the video; the
  readable Indonesian line was used as documented in the spec.
- Watermark handle taken from the reference: `@codecoder404` (editable).
- Countdown unlocks five minutes after the page loads.
- Memory wall re-flow swaps the first 8 photos for the remaining 7 once, then enables
  the WATCH VIDEO button.
