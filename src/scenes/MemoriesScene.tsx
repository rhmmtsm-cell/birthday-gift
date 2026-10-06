import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { GlowButton } from '../components/GlowButton'
import { SceneShell } from '../components/SceneShell'
import { memoryPhotos } from '../data/media'

const BATCH_SIZE = 8

export function MemoriesScene({ onNext }: { onNext: () => void }) {
  const [batch, setBatch] = useState(0)
  const photos = memoryPhotos.slice(batch * BATCH_SIZE, batch * BATCH_SIZE + BATCH_SIZE)

  // re-flow ~2s after the first batch settles
  useEffect(() => {
    if (batch !== 0) return
    const id = window.setTimeout(() => setBatch(1), 2600)
    return () => window.clearTimeout(id)
  }, [batch])

  return (
    <SceneShell className="justify-start overflow-y-auto py-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="font-serif text-3xl italic text-cream drop-shadow-[0_0_22px_rgba(244,114,182,0.45)] sm:text-5xl"
      >
        Our Memories
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] text-blush-soft/80 sm:text-xs"
      >
        ✦ every moment captured in love ✦
      </motion.p>

      <div className="mt-7 grid w-full max-w-3xl grid-cols-4 gap-3 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {photos.map((src, i) => (
            <motion.div
              key={src}
              layout
              initial={{ opacity: 0, y: 46, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: [-3, 2, -2, 3, -1, 2, -2, 1][i] }}
              exit={{ opacity: 0, y: -36, rotate: 5 }}
              transition={{ duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-1.5 pb-4 shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
            >
              <img
                src={src}
                alt={`memory ${i + 1}`}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover bg-plum"
                draggable={false}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: batch === 1 ? 1 : 0.35, y: batch === 1 ? 0 : 12 }}
        transition={{ duration: 0.5, delay: batch === 1 ? 0.7 : 0 }}
        className="mt-8"
      >
        <GlowButton onClick={batch === 1 ? onNext : undefined} active={batch === 1} disabled={batch !== 1}>
          ▶ WATCH VIDEO
        </GlowButton>
      </motion.div>
    </SceneShell>
  )
}
