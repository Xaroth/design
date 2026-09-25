import { bem } from '../../bem.ts'

export type PageHeadAlign = 'start' | 'center'

export type PageHeadLevel = 1 | 2

export type PageHeadOptions = {
  align?: PageHeadAlign
  className?: string
}

const pageHead = bem('x-page-head', { defaults: { align: 'start' } })

export const pageHeadClass = ({ align = 'start', className }: PageHeadOptions = {}): string =>
  pageHead({ align }, className)

export const pageHeadClasses = {
  crumbs: pageHead.el('crumbs'),
  body: pageHead.el('body'),
  titles: pageHead.el('titles'),
  eyebrow: pageHead.el('eyebrow'),
  title: pageHead.el('title'),
  lead: pageHead.el('lead'),
  meta: pageHead.el('meta'),
  actions: pageHead.el('actions'),
} as const

export const pageHeadTag = (level: PageHeadLevel = 1) => `h${level}` as const
