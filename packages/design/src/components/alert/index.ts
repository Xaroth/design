import { bem } from '../../bem.ts'

// Maps to the --x-color-<tone> token and picks the built-in icon.
export type AlertTone = 'info' | 'success' | 'warning' | 'danger'

export type AlertOptions = {
  tone?: AlertTone
  /** Toned frame and caps title, for alerts that sit in a tool page rather than in text. */
  framed?: boolean
  className?: string
}

const alert = bem('x-alert')

export const alertClass = ({ tone = 'info', framed, className }: AlertOptions = {}): string =>
  alert({ tone, framed }, className)

// status is silent for content present on load; alert interrupts, so keep it for messages inserted after an action.
export const alertRole = <R extends string>(urgent?: boolean, role?: R | null): R | 'alert' | 'status' =>
  role ?? (urgent ? 'alert' : 'status')

export type AlertIconPath = { className: string; d: string }

// Every icon carries both outline shapes; each theme shows one.
const frames = {
  badge: { facet: 'M12 2 21 7v10l-9 5-9-5V7z', round: 'M12 2 22 12 12 22 2 12z' },
  stop: { facet: 'M8 2h8l6 6v8l-6 6H8l-6-6V8z', round: 'M21.5 12a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0z' },
}

const frame = (shape: keyof typeof frames): AlertIconPath[] => [
  { className: alert.el('frame', { facet: true }), d: frames[shape].facet },
  { className: alert.el('frame', { round: true }), d: frames[shape].round },
]

const glyph = (d: string): AlertIconPath => ({ className: alert.el('glyph'), d })

export const alertIcon = (tone: AlertTone = 'info'): AlertIconPath[] => {
  switch (tone) {
    case 'success':
      return [...frame('badge'), glyph('m8 12 3 3 5-6')]
    case 'warning':
      return [{ className: alert.el('frame'), d: 'M12 3 22 20H2z' }, glyph('M12 9v5M12 16.5v.5')]
    case 'danger':
      return [...frame('stop'), glyph('m9 9 6 6M15 9l-6 6')]
    default:
      return [...frame('badge'), glyph('M12 11v6M12 7.5v.5')]
  }
}
