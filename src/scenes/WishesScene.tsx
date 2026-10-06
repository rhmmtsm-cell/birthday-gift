import { GlassCard } from '../components/GlassCard'
import { GlowButton } from '../components/GlowButton'
import { SceneShell } from '../components/SceneShell'
import { wishesText } from '../data/content'

export function WishesScene({ onNext }: { onNext: () => void }) {
  const [first, ...rest] = wishesText.split('\n\n')
  return (
    <SceneShell>
      <GlassCard className="w-full max-w-lg p-7 text-center sm:p-10">
        <h2 className="font-serif text-2xl italic text-cream drop-shadow-[0_0_20px_rgba(244,114,182,0.45)] sm:text-4xl">
          Birthday Wishes
        </h2>
        <div className="mt-5 space-y-4">
          <p className="text-[0.82rem] text-blush-soft sm:text-[0.92rem]">{first}</p>
          {rest.map((p, i) => (
            <p key={i} className="text-[0.78rem] leading-[1.8] text-cream/85 sm:text-[0.88rem]">
              {p}
            </p>
          ))}
        </div>
      </GlassCard>

      <div className="mt-8">
        <GlowButton onClick={onNext}>ONE MORE THING ➜</GlowButton>
      </div>
    </SceneShell>
  )
}
