import { bem } from '../../bem.ts'

// Maps to the --x-color-<tone> token.
export type BadgeTone = 'default' | 'info' | 'success' | 'warning' | 'danger'

export type BadgeOptions = {
  tone?: BadgeTone
  className?: string
}

const badge = bem('x-badge', { defaults: { tone: 'default' } })

export const badgeClass = ({ tone = 'default', className }: BadgeOptions = {}): string => badge({ tone }, className)
