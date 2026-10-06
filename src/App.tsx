import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { getCountdownTarget } from './config/site.config'
import { BackgroundFX } from './components/BackgroundFX'
import { MusicToggle } from './components/MusicToggle'
import { Watermark } from './components/Watermark'
import { CountdownScene } from './scenes/CountdownScene'
import { FinaleScene } from './scenes/FinaleScene'
import { GalleryScene } from './scenes/GalleryScene'
import { GiftScene } from './scenes/GiftScene'
import { LetterScene } from './scenes/LetterScene'
import { MemoriesScene } from './scenes/MemoriesScene'
import { VideoScene } from './scenes/VideoScene'
import { WishesScene } from './scenes/WishesScene'

type SceneId =
  | 'countdown'
  | 'gift'
  | 'gallery'
  | 'letter'
  | 'memories'
  | 'video'
  | 'wishes'
  | 'finale'

export default function App() {
  const [scene, setScene] = useState<SceneId>('countdown')
  /** bumps on replay so every scene fully resets its animations */
  const [runId, setRunId] = useState(0)
  const [countdownTarget, setCountdownTarget] = useState(getCountdownTarget)

  const go = (s: SceneId) => setScene(s)
  const replay = () => {
    setRunId((r) => r + 1)
    setCountdownTarget(getCountdownTarget())
    setScene('countdown')
  }

  return (
    <main className="relative min-h-[100dvh] overflow-hidden">
      <BackgroundFX />
      <MusicToggle />
      <Watermark />

      <AnimatePresence mode="wait">
        {scene === 'countdown' && (
          <CountdownScene
            key={`cd-${runId}`}
            targetDate={countdownTarget}
            onOpen={() => go('gift')}
          />
        )}
        {scene === 'gift' && (
          <GiftScene key={`gift-${runId}`} onOpened={() => go('gallery')} />
        )}
        {scene === 'gallery' && (
          <GalleryScene key={`gal-${runId}`} onNext={() => go('letter')} />
        )}
        {scene === 'letter' && (
          <LetterScene key={`let-${runId}`} onNext={() => go('memories')} />
        )}
        {scene === 'memories' && (
          <MemoriesScene key={`mem-${runId}`} onNext={() => go('video')} />
        )}
        {scene === 'video' && (
          <VideoScene key={`vid-${runId}`} onNext={() => go('wishes')} />
        )}
        {scene === 'wishes' && (
          <WishesScene key={`wish-${runId}`} onNext={() => go('finale')} />
        )}
        {scene === 'finale' && <FinaleScene key={`fin-${runId}`} onReplay={replay} />}
      </AnimatePresence>
    </main>
  )
}
