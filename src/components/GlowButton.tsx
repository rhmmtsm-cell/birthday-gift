import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  /** pulsing-glow active state (enabled) */
  active?: boolean
  className?: string
}

export function GlowButton({ children, onClick, disabled = false, active = true, className = '' }: Props) {
  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: disabled ? 0.5 : 1, y: 0 }}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={[
        'relative rounded-full px-8 py-3.5 text-[0.72rem] sm:text-[0.8rem] font-medium',
        'uppercase tracking-[0.18em] select-none',
        'border border-blush/50 bg-black/40 backdrop-blur-sm',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      ].join(' ')}
      style={{
        boxShadow: active
          ? '0 0 24px rgba(236,72,153,0.45), inset 0 0 14px rgba(236,72,153,0.12)'
          : '0 0 10px rgba(236,72,153,0.12)',
        animation: active && !disabled ? 'glowPulse 1.8s ease-in-out infinite' : undefined,
      }}
    >
      <style>{`
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 18px rgba(236,72,153,.35), inset 0 0 12px rgba(236,72,153,.10); }
          50%      { box-shadow: 0 0 34px rgba(236,72,153,.65), inset 0 0 18px rgba(236,72,153,.20); }
        }
      `}</style>
      <span className="text-cream">{children}</span>
    </motion.button>
  )
}
