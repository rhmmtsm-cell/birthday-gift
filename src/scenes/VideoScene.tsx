import { motion } from 'framer-motion'
import { CustomVideoPlayer } from '../components/CustomVideoPlayer'
import { GlowButton } from '../components/GlowButton'
import { SceneShell } from '../components/SceneShell'
import { momentVideo } from '../data/media'

export function VideoScene({ onNext }: { onNext: () => void }) {
  return (
    <SceneShell className="justify-start overflow-y-auto py-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif text-3xl italic text-cream drop-shadow-[0_0_22px_rgba(244,114,182,0.45)] sm:text-5xl"
      >
        A Moment For You
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] text-blush-soft/80 sm:text-xs"
      >
        ✦ a special video message ✦
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-7 w-full max-w-2xl"
      >
        <CustomVideoPlayer src={momentVideo} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8"
      >
        <GlowButton onClick={onNext}>BIRTHDAY WISHES ➜</GlowButton>
      </motion.div>
    </SceneShell>
  )
}
