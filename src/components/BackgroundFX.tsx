import { useEffect, useRef } from 'react'

/**
 * Persistent atmosphere: drifting bokeh blobs, twinkling stars and a
 * continuous layer of falling hearts / sparkles / dots.
 * One canvas, one rAF loop, pointer-events: none.
 */
export function BackgroundFX() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const rand = (a: number, b: number) => a + Math.random() * (b - a)
    const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

    type Star = { x: number; y: number; r: number; p: number; s: number }
    type Bokeh = { x: number; y: number; r: number; c: string; a: number; dx: number; dy: number }
    type Particle = {
      x: number; y: number; size: number; kind: 'heart' | 'dot' | 'spark'
      vy: number; sway: number; ph: number; c: string; a: number; rot: number; vr: number
    }

    const starColors = ['#ffffff', '#fbcfe8', '#f9a8d4']
    const bokehColors = ['236,72,153', '244,114,182', '214,190,170', '150,90,170']
    const particleColors = ['#f9a8d4', '#ffffff', '#fbcfe8', '#fde68a']

    let stars: Star[] = []
    let bokeh: Bokeh[] = []
    let parts: Particle[] = []

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      stars = Array.from({ length: 70 }, () => ({
        x: rand(0, w), y: rand(0, h), r: rand(0.5, 1.6),
        p: rand(0, Math.PI * 2), s: rand(0.5, 1.5),
      }))
      bokeh = Array.from({ length: 6 }, () => ({
        x: rand(0, w), y: rand(0, h), r: rand(140, 280),
        c: pick(bokehColors), a: rand(0.12, 0.28),
        dx: rand(-0.08, 0.08), dy: rand(-0.05, 0.05),
      }))
      parts = Array.from({ length: 34 }, () => spawn(true))
    }

    const spawn = (anywhere = false): Particle => ({
      x: rand(0, w),
      y: anywhere ? rand(-h, h) : rand(-80, -10),
      size: rand(2.5, 7),
      kind: pick(['heart', 'heart', 'dot', 'spark'] as const),
      vy: rand(0.25, 0.7),
      sway: rand(0.3, 1.2),
      ph: rand(0, Math.PI * 2),
      c: pick(particleColors),
      a: rand(0.35, 0.85),
      rot: rand(0, Math.PI * 2),
      vr: rand(-0.01, 0.01),
    })

    const drawHeart = (x: number, y: number, s: number, rot: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rot)
      ctx.beginPath()
      ctx.moveTo(0, s * 0.35)
      ctx.bezierCurveTo(-s, -s * 0.55, -s * 0.45, -s * 1.25, 0, -s * 0.45)
      ctx.bezierCurveTo(s * 0.45, -s * 1.25, s, -s * 0.55, 0, s * 0.35)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    let t = 0
    const loop = () => {
      t += 1 / 60
      ctx.clearRect(0, 0, w, h)

      // bokeh
      for (const b of bokeh) {
        b.x += b.dx
        b.y += b.dy
        if (b.x < -b.r) b.x = w + b.r
        if (b.x > w + b.r) b.x = -b.r
        if (b.y < -b.r) b.y = h + b.r
        if (b.y > h + b.r) b.y = -b.r
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        g.addColorStop(0, `rgba(${b.c},${b.a})`)
        g.addColorStop(1, `rgba(${b.c},0)`)
        ctx.fillStyle = g
        ctx.fillRect(b.x - b.r, b.y - b.r, b.r * 2, b.r * 2)
      }

      // stars
      for (const s of stars) {
        const o = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * s.s + s.p))
        ctx.globalAlpha = o
        ctx.fillStyle = pick(starColors)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // falling particles
      for (const p of parts) {
        p.y += p.vy
        p.ph += 0.012
        p.rot += p.vr
        const x = p.x + Math.sin(p.ph) * 12 * p.sway
        ctx.globalAlpha = p.a
        ctx.fillStyle = p.c
        if (p.kind === 'heart') drawHeart(x, p.y, p.size, p.rot)
        else if (p.kind === 'spark') {
          ctx.save()
          ctx.translate(x, p.y)
          ctx.rotate(p.rot + t * 0.3)
          const s = p.size
          ctx.fillRect(-s * 0.12, -s * 0.7, s * 0.24, s * 1.4)
          ctx.fillRect(-s * 0.7, -s * 0.12, s * 1.4, s * 0.24)
          ctx.restore()
        } else {
          ctx.beginPath()
          ctx.arc(x, p.y, p.size * 0.4, 0, Math.PI * 2)
          ctx.fill()
        }
        if (p.y > h + 30) Object.assign(p, spawn())
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(loop)
    }

    resize()
    loop()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}
