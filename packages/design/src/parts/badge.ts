// What the badge reports. Each tone maps to the theme's --x-color-<tone> token.
export type BadgeTone = 'default' | 'info' | 'success' | 'warning' | 'danger'

export type BadgeOptions = {
  tone?: BadgeTone
  className?: string
}

export const badgeClass = ({ tone = 'default', className }: BadgeOptions = {}): string =>
  ['x-badge', tone !== 'default' && `x-badge--${tone}`, className].filter(Boolean).join(' ')
