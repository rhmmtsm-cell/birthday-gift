import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface Props {
  src: string
  className?: string
}

function fmt(t: number) {
  if (!isFinite(t)) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export function CustomVideoPlayer({ src, className = '' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [time, setTime] = useState('0:00')
  const [duration, setDuration] = useState('0:00')
  const [muted, setMuted] = useState(true)

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play().catch(() => {})
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTime = () => {
      setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0)
      setTime(fmt(v.currentTime))
    }
    const onMeta = () => setDuration(fmt(v.duration))
    const onEnd = () => setPlaying(false)
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('ended', onEnd)
    return () => {
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('loadedmetadata', onMeta)
      v.removeEventListener('ended', onEnd)
    }
  }, [])

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current
    if (!v || !v.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration
  }

  return (
    <div
      className={[
        'relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/50',
        'shadow-[0_0_30px_rgba(236,72,153,0.25),0_12px_30px_rgba(0,0,0,0.5)]',
        className,
      ].join(' ')}
    >
      <video
        ref={videoRef}
        src={src}
        muted={muted}
        playsInline
        preload="metadata"
        className="aspect-video w-full object-cover"
        onClick={toggle}
      />

      {/* center play overlay */}
      {!playing && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          onClick={toggle}
          aria-label="Play video"
          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/25"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blush/90 shadow-[0_0_30px_rgba(236,72,153,0.7)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff5fa" aria-hidden>
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
        </motion.button>
      )}

      {/* bottom control strip */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-6">
        <button
          onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'}
          className="cursor-pointer text-cream/90 hover:text-blush-light"
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          )}
        </button>

        <span className="text-[0.62rem] tabular-nums text-white/70">
          {time} / {duration}
        </span>

        <div
          className="relative h-1 flex-1 cursor-pointer rounded-full bg-white/15"
          onClick={seek}
          role="slider"
          aria-label="Seek"
          aria-valuenow={Math.round(progress)}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-blush shadow-[0_0_10px_rgba(236,72,153,0.9)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={() => setMuted((currentMuted) => !currentMuted)}
          aria-label={muted ? 'Unmute' : 'Mute'}
          className="cursor-pointer text-cream/90 hover:text-blush-light"
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.6 3 2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4-2.7-2.7z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
