import { motion } from 'framer-motion'

/** Elegant neon-outline gift box. The lid is a separate group so the
 *  parent scene can animate "opening". */
export function GiftBox({ opened }: { opened: boolean }) {
  const stroke = '#f9a8d4'
  return (
    <motion.svg
      viewBox="0 0 200 220"
      className="w-44 sm:w-56"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        filter:
          'drop-shadow(0 0 18px rgba(236,72,153,0.55)) drop-shadow(0 0 44px rgba(236,72,153,0.25))',
      }}
      role="img"
      aria-label="A gift for you"
    >
      {/* glow core */}
      <circle cx="100" cy="120" r="70" fill="url(#giftGlow)" />
      <defs>
        <radialGradient id="giftGlow">
          <stop offset="0%" stopColor="rgba(244,114,182,0.35)" />
          <stop offset="100%" stopColor="rgba(244,114,182,0)" />
        </radialGradient>
      </defs>

      {/* box body */}
      <g stroke={stroke} strokeWidth="3" fill="rgba(236,72,153,0.06)" strokeLinejoin="round">
        <rect x="45" y="105" width="110" height="90" rx="6" />
        <line x1="100" y1="105" x2="100" y2="195" strokeWidth="4" />
      </g>

      {/* lid (animates open) */}
      <motion.g
        stroke={stroke}
        strokeWidth="3"
        fill="rgba(236,72,153,0.10)"
        strokeLinejoin="round"
        animate={
          opened
            ? { y: -42, rotate: -12, opacity: 0 }
            : { y: 0, rotate: 0, opacity: 1 }
        }
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ originX: '100px', originY: '105px' }}
      >
        <rect x="35" y="82" width="130" height="26" rx="6" />
        <line x1="100" y1="82" x2="100" y2="108" strokeWidth="4" />
        {/* bow */}
        <path d="M100 82 C 78 62, 62 78, 78 86 C 88 90, 96 86, 100 82 Z" fill="none" />
        <path d="M100 82 C 122 62, 138 78, 122 86 C 112 90, 104 86, 100 82 Z" fill="none" />
        <circle cx="100" cy="80" r="5" fill="none" />
      </motion.g>
    </motion.svg>
  )
}
