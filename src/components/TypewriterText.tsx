import { useTypewriter } from '../hooks/useTypewriter'

interface Props {
  text: string
  speed?: number
  start?: boolean
  showCaret?: boolean
  className?: string
  onDone?: () => void
}

export function TypewriterText({
  text,
  speed = 28,
  start = true,
  showCaret = true,
  className = '',
  onDone,
}: Props) {
  const { typed, done } = useTypewriter(text, { speed, start, onDone })
  return (
    <span className={className}>
      {typed}
      {showCaret && !done && <span className="tw-caret" aria-hidden />}
    </span>
  )
}
