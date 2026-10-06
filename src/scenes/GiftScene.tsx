import { motion } from 'framer-motion'
import { useState } from 'react'
import { Eyebrow } from '../components/Eyebrow'
import { GiftBox } from '../components/GiftBox'
import { SceneShell } from '../components/SceneShell'
import { SparkleBurst } from '../components/SparkleBurst'

export function GiftScene({ onOpened }: { onOpened: () => void }) {
  const [opening, setOpening] = useState(false)

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    window.setTimeout(onOpened, 1100)
  }

  return (
    <SceneShell>
      <SparkleBurst fire={opening} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Eyebrow>THERE’S SOMETHING FOR YOU</Eyebrow>
      </motion.div>

      {/* radial glow behind the gift */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush/20 blur-[120px]" />

      <motion.button
        onClick={handleOpen}
        disabled={opening}
        aria-label="Buka hadiah"
        className="mt-8 cursor-pointer bg-transparent p-6"
        animate={
          opening
            ? { scale: [1, 1.1, 0.9], opacity: [1, 1, 0] }
            : { scale: [1, 1.04, 1] }
        }
        transition={
          opening
            ? { duration: 1.0, ease: 'easeOut' }
            : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }
        whileHover={opening ? undefined : { scale: 1.06 }}
        whileTap={opening ? undefined : { scale: 0.97 }}
      >
        <GiftBox opened={opening} />
      </motion.button>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-4 text-[0.8rem] text-white/60 sm:text-sm"
      >
        🎀 Click to open your gift 🎀
      </motion.p>
    </SceneShell>
  )
}
