import { motion } from 'framer-motion'
import { Eyebrow } from '../components/Eyebrow'
import { GlowButton } from '../components/GlowButton'
import { Polaroid } from '../components/Polaroid'
import { SceneShell } from '../components/SceneShell'
import { galleryPhotos } from '../data/media'

/** 3 photos from the left edge, 5 from the right edge. */
const layout = [
  { from: 'left' as const, top: '12%', left: '3%', rot: -6, w: 'w-20 sm:w-28' },
  { from: 'left' as const, top: '38%', left: '1%', rot: 4, w: 'w-24 sm:w-32' },
  { from: 'left' as const, top: '64%', left: '5%', rot: -3, w: 'w-20 sm:w-28' },
  { from: 'right' as const, top: '8%', right: '3%', rot: 5, w: 'w-20 sm:w-28' },
  { from: 'right' as const, top: '30%', right: '1%', rot: -4, w: 'w-24 sm:w-32' },
  { from: 'right' as const, top: '56%', right: '4%', rot: 6, w: 'w-20 sm:w-28' },
  { from: 'right' as const, top: '74%', right: '10%', rot: -5, w: 'w-16 sm:w-24' },
  { from: 'right' as const, top: '18%', right: '16%', rot: 2, w: 'w-16 sm:w-24' },
]

export function GalleryScene({ onNext }: { onNext: () => void }) {
  return (
    <SceneShell>
      {layout.map((p, i) => (
        <div
          key={i}
          className="absolute hidden sm:block"
          style={{ top: p.top, left: p.left, right: p.right }}
        >
          <Polaroid
            src={galleryPhotos[i]}
            from={p.from}
            rotate={p.rot}
            delay={0.25 + i * 0.1}
            floatSeed={i}
            widthClass={p.w}
          />
        </div>
      ))}

      {/* mobile: single top row + single bottom row of 3 */}
      <div className="absolute left-0 right-0 top-[6%] flex justify-center gap-3 sm:hidden">
        {galleryPhotos.slice(0, 3).map((s, i) => (
          <Polaroid key={i} src={s} from="top" rotate={[-4, 3, -2][i]} delay={0.25 + i * 0.1} widthClass="w-20" />
        ))}
      </div>
      <div className="absolute bottom-[6%] left-0 right-0 flex justify-center gap-3 sm:hidden">
        {galleryPhotos.slice(3, 6).map((s, i) => (
          <Polaroid key={i} src={s} from="bottom" rotate={[3, -3, 4][i]} delay={0.55 + i * 0.1} widthClass="w-20" />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-w-xl flex-col items-center"
      >
        <Eyebrow>A LOVE LETTER FOR YOU</Eyebrow>
        <h2 className="mt-5 font-serif text-4xl leading-tight text-cream drop-shadow-[0_0_24px_rgba(244,114,182,0.45)] sm:text-6xl">
          Your Special Day
        </h2>
        <p className="mt-3 text-[0.8rem] italic text-white/60 sm:text-sm">
          Created with love, just for you
        </p>
        <div className="mt-8">
          <GlowButton onClick={onNext}>✉ READ MY LETTER ✉</GlowButton>
        </div>
      </motion.div>
    </SceneShell>
  )
}
