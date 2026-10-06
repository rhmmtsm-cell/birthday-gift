import { useEffect, useRef, useState } from 'react'

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

function calc(targetMs: number): CountdownParts {
  const diff = Math.max(0, targetMs - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
    done: diff <= 0,
  }
}

export function useCountdown(targetDate: string, onComplete?: () => void): CountdownParts {
  const targetMs = new Date(targetDate).getTime()
  const [time, setTime] = useState<CountdownParts>(() => calc(targetMs))
  const fired = useRef(false)

  useEffect(() => {
    const tick = () => {
      const next = calc(targetMs)
      setTime(next)
      if (next.done && !fired.current) {
        fired.current = true
        onComplete?.()
      }
    }
    const id = window.setInterval(tick, 250)
    tick()
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetMs])

  return time
}
