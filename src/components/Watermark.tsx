import { WATERMARK_HANDLE } from '../config/site.config'

export function Watermark() {
  return (
    <div className="pointer-events-none fixed bottom-3 right-4 z-40 select-none text-[0.6rem] sm:text-[0.65rem] tracking-widest text-white/35">
      {WATERMARK_HANDLE}
    </div>
  )
}
