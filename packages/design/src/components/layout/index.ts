import { clsx } from 'clsx'
import { bem } from '../../bem.ts'

const container = bem('x-container', { defaults: { width: 'page' } })
const grid = bem('x-grid')
const section = bem('x-section')
const sectionHead = bem('x-section-head')

// Page is the shared 1200px container. Prose narrows it to the reading width, for pages with no grid.
export type ContainerWidth = 'page' | 'prose'

export type ContainerOptions = {
  width?: ContainerWidth
  className?: string
}

export const containerClass = ({ width = 'page', className }: ContainerOptions = {}): string =>
  container({ width }, className)

export type GridOptions = {
  className?: string
}

export const gridClass = ({ className }: GridOptions = {}): string => grid({}, className)

export type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

// Where a span falls back to full width: under 1024px (default), under 640px, or never.
export type ColStack = 'md' | 'sm' | 'never'

export type ColOptions = {
  span: ColSpan
  stack?: ColStack
  className?: string
}

// Grid children are plain elements, so spans are a class helper rather than a component.
export const colClass = ({ span, stack = 'md', className }: ColOptions): string =>
  clsx(`x-col-${span}`, stack === 'sm' && 'x-col--stack-sm', stack === 'never' && 'x-col--keep', className)

export type SectionOptions = {
  tight?: boolean
  className?: string
}

export const sectionClass = ({ tight, className }: SectionOptions = {}): string => section({ tight }, className)

export type SectionHeadLink = { label: string; href: string }

export type SectionHeadOptions = {
  className?: string
}

export const sectionHeadClass = ({ className }: SectionHeadOptions = {}): string => sectionHead({}, className)

export type SectionHeadLevel = 2 | 3

export const sectionHeadTag = (level: SectionHeadLevel = 2) => `h${level}` as const
