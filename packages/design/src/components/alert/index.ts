// What the alert reports. Each tone maps to the theme's --x-color-<tone> token and picks the built-in icon.
export type AlertTone = 'info' | 'success' | 'warning' | 'danger'

export type AlertOptions = {
  tone?: AlertTone
  /** Toned frame and caps title, for alerts that sit in a tool page rather than in text. */
  framed?: boolean
  className?: string
}

export const alertClass = ({ tone = 'info', framed, className }: AlertOptions = {}): string =>
  ['x-alert', `x-alert--${tone}`, framed && 'x-alert--framed', className].filter(Boolean).join(' ')

// status is polite and silent for content present on load, so it suits static pages for every tone.
// alert interrupts the reader; keep it for messages inserted in response to an action. An explicit role wins.
export const alertRole = (urgent?: boolean, role?: string | null): string => role ?? (urgent ? 'alert' : 'status')

export type AlertIconPath = { className: string; d: string }

// Every icon carries both outline shapes; each theme shows one of them (facet or round).
const frames = {
  badge: { facet: 'M12 2 21 7v10l-9 5-9-5V7z', round: 'M12 2 22 12 12 22 2 12z' },
  stop: { facet: 'M8 2h8l6 6v8l-6 6H8l-6-6V8z', round: 'M21.5 12a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0z' },
}

const frame = (shape: keyof typeof frames): AlertIconPath[] => [
  { className: 'x-alert__frame x-alert__frame--facet', d: frames[shape].facet },
  { className: 'x-alert__frame x-alert__frame--round', d: frames[shape].round },
]

const glyph = (d: string): AlertIconPath => ({ className: 'x-alert__glyph', d })

export const alertIcon = (tone: AlertTone = 'info'): AlertIconPath[] => {
  switch (tone) {
    case 'success':
      return [...frame('badge'), glyph('m8 12 3 3 5-6')]
    case 'warning':
      return [{ className: 'x-alert__frame', d: 'M12 3 22 20H2z' }, glyph('M12 9v5M12 16.5v.5')]
    case 'danger':
      return [...frame('stop'), glyph('m9 9 6 6M15 9l-6 6')]
    default:
      return [...frame('badge'), glyph('M12 11v6M12 7.5v.5')]
  }
}
