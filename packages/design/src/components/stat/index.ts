import { bem } from '../../bem.ts'

// Plain: bare numbers, for a row under a hero. Framed: boxed readouts, for a tool summary.
export type StatGroupVariant = 'plain' | 'framed'
export type StatGroupColumns = 2 | 3 | 4
// What the value means. Muted steps a value back; the rest map to the theme's --x-color-<tone> token.
export type StatTone = 'default' | 'muted' | 'success' | 'warning' | 'danger'

export type StatGroupOptions = {
  variant?: StatGroupVariant
  /** Columns from 640px up; below that the group is two across. */
  columns?: StatGroupColumns
  className?: string
}

export type StatOptions = {
  tone?: StatTone
  className?: string
}

const statGroup = bem('x-stat-group', { defaults: { cols: 4 }, prefixed: ['cols'] })
const stat = bem('x-stat', { defaults: { tone: 'default' } })

export const statGroupClass = ({ variant = 'plain', columns = 4, className }: StatGroupOptions = {}): string =>
  statGroup({ variant, cols: columns }, className)

export const statClass = ({ tone = 'default', className }: StatOptions = {}): string => stat({ tone }, className)
