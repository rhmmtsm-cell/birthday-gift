import { useEffect } from 'react'
import confetti from 'canvas-confetti'

/** Radial sparkle burst from screen center — used when the gift opens. */
export function SparkleBurst({ fire }: { fire: boolean }) {
  useEffect(() => {
    if (!fire) return
    const colors = ['#f9a8d4', '#ffffff', '#fbcfe8', '#fde68a']
    confetti({
      particleCount: 60,
      spread: 360,
      startVelocity: 28,
      gravity: 0.55,
      ticks: 140,
      scalar: 0.85,
      shapes: ['star', 'circle'],
      colors,
      origin: { x: 0.5, y: 0.5 },
      disableForReducedMotion: true,
    })
    confetti({
      particleCount: 25,
      spread: 120,
      startVelocity: 18,
      gravity: 0.4,
      ticks: 180,
      scalar: 0.6,
      shapes: ['star'],
      colors,
      origin: { x: 0.5, y: 0.42 },
      disableForReducedMotion: true,
    })
  }, [fire])
  return null
}
