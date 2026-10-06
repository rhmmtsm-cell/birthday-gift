import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { GlowButton } from '../components/GlowButton'
import { SceneShell } from '../components/SceneShell'
import { finalePhrases, finaleStaticText } from '../data/content'
import { useTypewriter } from '../hooks/useTypewriter'

const PHRASE_MS = 3000

export function FinaleScene({ onReplay }: { onReplay: () => void }) {
  const [index, setIndex] = useState(0)
  const [glitchKey, setGlitchKey] = useState(0)
  const phrase = finalePhrases[index]

  // cycle phrases
  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % finalePhrases.length)
    }, PHRASE_MS)
    return () => window.clearInterval(id)
  }, [])

  const { typed, done } = useTypewriter(phrase, { speed: 55 })

  // trigger RGB-slice glitch whenever the phrase changes
  useEffect(() => {
    setGlitchKey((k) => k + 1)
  }, [phrase])

  return (
    <SceneShell>
      {/* cycling typewriter headline with glitch on change */}
      <div key={glitchKey} className="glitch" data-text={typed || ' '}>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-[1.3em] font-serif text-4xl text-cream drop-shadow-[0_0_26px_rgba(244,114,182,0.55)] sm:text-6xl"
        >
          {typed}
          {!done && <span className="tw-caret" aria-hidden />}
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' }}
        className="mt-8 max-w-md whitespace-pre-line text-center text-[0.78rem] leading-[1.9] text-white/70 sm:text-sm"
      >
        {finaleStaticText}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="mt-9"
      >
        <GlowButton onClick={onReplay}>↻ REPLAY FROM START</GlowButton>
      </motion.div>
    </SceneShell>
  )
}
