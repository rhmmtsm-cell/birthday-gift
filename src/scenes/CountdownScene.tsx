import { motion } from 'framer-motion'
import { Eyebrow } from '../components/Eyebrow'
import { GlowButton } from '../components/GlowButton'
import { SceneShell } from '../components/SceneShell'
import { useCountdown } from '../hooks/useCountdown'
import {
  COUNTDOWN_CAPTION_LOCKED,
  COUNTDOWN_CAPTION_UNLOCKED,
  COUNTDOWN_WAIT_LINE,
} from '../config/site.config'

const pad = (n: number) => String(n).padStart(2, '0')

function TimeCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex w-16 flex-col items-center gap-1.5 sm:w-24">
      <motion.div
        key={value}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex h-16 w-full items-center justify-center rounded-xl border border-white/10 bg-black/45 shadow-[0_0_24px_rgba(236,72,153,0.35)] sm:h-20"
      >
        <span className="text-2xl font-semibold tracking-wide text-blush-pale drop-shadow-[0_0_10px_rgba(244,114,182,0.9)] tabular-nums sm:text-3xl">
          {value}
        </span>
      </motion.div>
      <span className="text-[0.55rem] uppercase tracking-[0.25em] text-white/60 sm:text-[0.62rem]">
        {label}
      </span>
    </div>
  )
}

export function CountdownScene({
  targetDate,
  onOpen,
}: {
  targetDate: string
  onOpen: () => void
}) {
  const { days, hours, minutes, seconds, done } = useCountdown(targetDate)

  return (
    <SceneShell>
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush/15 blur-[110px]" />

      <Eyebrow>I Was Counting down the days</Eyebrow>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 font-serif text-4xl italic leading-tight text-cream drop-shadow-[0_0_24px_rgba(244,114,182,0.45)] sm:text-6xl"
      >
        Her Special Day
        <span className="block text-2xl not-italic text-white/85 sm:text-4xl">is Coming</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-4 max-w-md text-[0.78rem] text-white/60 sm:text-sm"
      >
        {done ? COUNTDOWN_CAPTION_UNLOCKED : COUNTDOWN_CAPTION_LOCKED}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
        className="mt-9 flex gap-3 sm:gap-4"
      >
        <TimeCard value={pad(days)} label="Hari" />
        <TimeCard value={pad(hours)} label="Jam" />
        <TimeCard value={pad(minutes)} label="Menit" />
        <TimeCard value={pad(seconds)} label="Detik" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="mt-9 flex flex-col items-center gap-4"
      >
        {!done && (
          <span className="text-[0.7rem] text-white/45">{COUNTDOWN_WAIT_LINE}</span>
        )}
        <GlowButton
          disabled={!done}
          active={done}
          onClick={onOpen}
        >
          {done ? '✨ OPEN YOUR GIFT ✨' : '🔒 WAIT UNTIL IT’S YOUR TIME 🔒'}
        </GlowButton>
      </motion.div>
    </SceneShell>
  )
}
