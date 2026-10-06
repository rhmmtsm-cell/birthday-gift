import { useEffect, useRef, useState } from 'react'
import { MUSIC } from '../config/site.config'

/** Optional background music. Autoplay-safe: starts only after the
 *  user's first interaction anywhere on the page. Toggle bottom-left. */
export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!MUSIC.enabled) return
    const audio = new Audio(MUSIC.src)
    audio.loop = true
    audio.volume = MUSIC.volume
    audioRef.current = audio

    const tryPlay = () => {
      audio.play().then(() => setPlaying(true)).catch(() => {})
      window.removeEventListener('pointerdown', tryPlay)
    }
    window.addEventListener('pointerdown', tryPlay)
    return () => {
      window.removeEventListener('pointerdown', tryPlay)
      audio.pause()
      audioRef.current = null
    }
  }, [])

  if (!MUSIC.enabled) return null

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      a.play().catch(() => {})
      setPlaying(true)
    } else {
      a.pause()
      setPlaying(false)
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      className="fixed bottom-3 left-4 z-40 cursor-pointer rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[0.62rem] tracking-widest text-white/60 backdrop-blur-sm hover:text-blush-soft"
    >
      {playing ? '♪ ON' : '♪ OFF'}
    </button>
  )
}
