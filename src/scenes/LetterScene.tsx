import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { GlassCard } from '../components/GlassCard'
import { GlowButton } from '../components/GlowButton'
import { SceneShell } from '../components/SceneShell'
import { TypewriterText } from '../components/TypewriterText'
import { letterText } from '../data/content'

export function LetterScene({ onNext }: { onNext: () => void }) {
  const [done, setDone] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // auto-scroll as the letter types
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  })

  return (
    <SceneShell>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif text-3xl italic text-cream drop-shadow-[0_0_22px_rgba(244,114,182,0.45)] sm:text-5xl"
      >
        Happy Birthday
      </motion.h2>

      <GlassCard className="letter-scroll mt-6 max-h-[52dvh] w-full max-w-xl overflow-y-auto p-6 text-left sm:p-9">
        <TypewriterText
          text={letterText}
          speed={24}
          className="block whitespace-pre-line text-[0.8rem] leading-[1.8] text-cream/90 sm:text-[0.92rem]"
          onDone={() => setDone(true)}
        />
      </GlassCard>

      <motion.div
        initial={false}
        animate={{ opacity: done ? 1 : 0, y: done ? 0 : 14 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-7"
      >
        <GlowButton onClick={onNext} active={done} disabled={!done}>
          OUR MEMORIES ➜
        </GlowButton>
      </motion.div>
    </SceneShell>
  )
}
