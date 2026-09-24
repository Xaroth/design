export type TagOptions = {
  active?: boolean
  className?: string
}

export type TagStateInput = {
  href?: string
  active?: boolean
}

export const tagClass = ({ active, className }: TagOptions = {}): string =>
  ['x-tag', active && 'x-tag--active', className].filter(Boolean).join(' ')

// An active link tag is the current filter, so assistive tech hears it too; a span tag is only a label.
export const tagState = ({ href, active }: TagStateInput) =>
  href !== undefined
    ? { tag: 'a' as const, attrs: { href, 'aria-current': active ? ('true' as const) : undefined } }
    : { tag: 'span' as const, attrs: {} }
