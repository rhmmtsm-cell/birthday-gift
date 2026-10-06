import { motion } from 'framer-motion'

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="text-[0.68rem] sm:text-xs tracking-[0.3em] uppercase text-blush-soft/90"
    >
      ✦&nbsp;&nbsp;{children}&nbsp;&nbsp;✦
    </motion.p>
  )
}
