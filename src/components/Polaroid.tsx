import { motion } from 'framer-motion'

interface Props {
  src: string
  alt?: string
  rotate?: number
  delay?: number
  /** which screen edge the photo flies in from */
  from?: 'left' | 'right' | 'bottom' | 'top'
  className?: string
  floatSeed?: number
  /** width class, e.g. 'w-24 sm:w-32' */
  widthClass?: string
}

export function Polaroid({
  src,
  alt = 'memory',
  rotate = 0,
  delay = 0,
  from = 'left',
  className = '',
  floatSeed = 0,
  widthClass = 'w-24 sm:w-32',
}: Props) {
  const offscreen =
    from === 'left'
      ? { x: -420, y: -40 }
      : from === 'right'
        ? { x: 420, y: -40 }
        : from === 'top'
          ? { x: 0, y: -320 }
          : { x: 0, y: 320 }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offscreen.x, y: offscreen.y, rotate: rotate * 3.5 }}
      animate={{ opacity: 1, x: 0, y: 0, rotate }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* perpetual gentle float */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 4.5 + (floatSeed % 3),
          repeat: Infinity,
          ease: 'easeInOut',
          delay: floatSeed * 0.35,
        }}
        className={`${widthClass} bg-white p-[6%] pb-[14%] shadow-[0_12px_30px_rgba(0,0,0,0.5)]`}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover bg-plum"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  )
}
