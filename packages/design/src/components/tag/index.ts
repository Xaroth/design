import { bem } from '../../bem.ts'

export type TagOptions = {
  active?: boolean
  className?: string
}

export type TagStateInput = {
  href?: string
  active?: boolean
}

const tag = bem('x-tag')

export const tagClass = ({ active, className }: TagOptions = {}): string => tag({ active }, className)

// An active link tag is the current filter, so assistive tech hears it too; a span tag is only a label.
export const tagState = ({ href, active }: TagStateInput) =>
  href !== undefined
    ? { tag: 'a' as const, attrs: { href, 'aria-current': active ? ('true' as const) : undefined } }
    : { tag: 'span' as const, attrs: {} }
