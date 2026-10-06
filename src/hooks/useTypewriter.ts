import { useEffect, useRef, useState } from 'react'

interface Options {
  /** ms per character */
  speed?: number
  /** start typing immediately (default true) */
  start?: boolean
  onDone?: () => void
}

export function useTypewriter(text: string, opts: Options = {}) {
  const { speed = 28, start = true, onDone } = opts
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)
  const doneRef = useRef(false)

  useEffect(() => {
    setTyped('')
    setDone(false)
    doneRef.current = false
    if (!start) return

    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setTyped(text.slice(0, i))
      if (i >= text.length) {
        window.clearInterval(id)
        if (!doneRef.current) {
          doneRef.current = true
          setDone(true)
          onDone?.()
        }
      }
    }, speed)

    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, start])

  return { typed, done }
}
