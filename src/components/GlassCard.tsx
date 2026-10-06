import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={[
        'rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl',
        'shadow-[0_12px_30px_rgba(0,0,0,0.5)]',
        className,
      ].join(' ')}
    >
      {children}
    </motion.div>
  )
}
