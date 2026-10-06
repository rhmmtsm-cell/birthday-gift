// ============================================================
// CENTRAL CONFIG — edit everything here.
// ============================================================

/** The gift is unlocked immediately on every run. */
export function getCountdownTarget(): string {
  const target = new Date(Date.now() - 1000)
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${target.getFullYear()}-${pad(target.getMonth() + 1)}-${pad(target.getDate())}T${pad(target.getHours())}:${pad(target.getMinutes())}:${pad(target.getSeconds())}`
}

/** Small caption under the countdown (locked state). */
export const COUNTDOWN_CAPTION_LOCKED = 'Something beautiful is waiting for something special ❤'
export const COUNTDOWN_CAPTION_UNLOCKED = '🎉 Today is a special day! 🎉'
export const COUNTDOWN_WAIT_LINE = '⏳ Just a few seconds to go...'

/** Watermark handle shown bottom-right on every scene. */
export const WATERMARK_HANDLE = '@codecoder404'

/** Background music (file is in /public/assets/audio/background-music.mp3). */
export const MUSIC = {
  enabled: true,
  src: '/assets/audio/background-music.mp3',
  volume: 0.35,
}
