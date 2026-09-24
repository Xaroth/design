import { bem } from '../../bem.ts'

// Same tone mapping as Badge: each tone maps to the theme's --x-color-<tone> token.
export type ProgressTone = 'default' | 'info' | 'success' | 'warning' | 'danger'
export type ProgressSize = 'sm' | 'md'

// A progressbar needs an accessible name: `label`, or `aria-labelledby` pointing at visible text.
export type ProgressName = { label: string } | { label?: string; 'aria-labelledby': string }

export type ProgressOptions = {
  /** 0..max. Leave undefined for an indeterminate (busy) bar. */
  value?: number
  max?: number
  tone?: ProgressTone
  /** Makes the fill a gradient from this tone (left) to `tone` (right), spanning the whole track. */
  startTone?: ProgressTone
  size?: ProgressSize
  /** Shows the percentage next to the bar. */
  showValue?: boolean
  className?: string
}

export const progressProperty = '--x-progress'

const resolve = (value: number | undefined, max = 100) => {
  const top = max > 0 ? max : 100
  if (value === undefined || Number.isNaN(value)) {
    return { top, now: undefined, ratio: undefined }
  }
  const now = Math.min(Math.max(value, 0), top)
  return { top, now, ratio: now / top }
}

const progress = bem('x-progress', { defaults: { tone: 'default', size: 'md' }, prefixed: ['from'] })

export const progressClass = ({
  value,
  max,
  tone = 'default',
  startTone,
  size = 'md',
  className,
}: Omit<ProgressOptions, 'showValue'> = {}): string => {
  const { ratio } = resolve(value, max)
  return progress(
    {
      size,
      indeterminate: ratio === undefined,
      empty: ratio === 0,
      done: ratio === 1,
      tone,
      gradient: Boolean(startTone),
      from: startTone,
    },
    className,
  )
}

// Attributes for the progressbar root, plus the visible text. Style is a string so Astro and React
// (which serializes a style object the same way) emit the same attribute.
export const progressState = ({
  value,
  max,
  label,
  showValue,
}: Pick<ProgressOptions, 'value' | 'max' | 'showValue'> & { label?: string }) => {
  const { top, now, ratio } = resolve(value, max)
  const text = ratio === undefined ? undefined : `${Math.round(ratio * 100)}%`
  const width = ratio === undefined ? undefined : `${Math.round(ratio * 10000) / 100}%`
  return {
    width,
    text: showValue ? text : undefined,
    attrs: {
      role: 'progressbar' as const,
      'aria-label': label,
      'aria-valuemin': 0,
      'aria-valuemax': top,
      'aria-valuenow': now,
      'aria-valuetext': showValue ? text : undefined,
    },
  }
}

export const progressStyle = (width: string | undefined): string | undefined =>
  width === undefined ? undefined : `${progressProperty}:${width}`
