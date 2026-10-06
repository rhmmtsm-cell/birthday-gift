import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/** Full-screen scene wrapper with the cinematic fade+scale transition. */
export function SceneShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.section
      className={[
        'absolute inset-0 flex flex-col items-center justify-center',
        'px-6 text-center min-h-[100dvh]',
        className,
      ].join(' ')}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}
