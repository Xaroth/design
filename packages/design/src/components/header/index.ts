import { bem } from '../../bem.ts'
import { buttonClass } from '../button/index.ts'

// inline: one 72px row, brand left, nav right. stacked: centered brand over a centered nav. The site picks one.
export type HeaderLayout = 'inline' | 'stacked'

export type HeaderNavItem = {
  label: string
  href: string
  current?: boolean
}

export type HeaderOptions = {
  layout?: HeaderLayout
  sticky?: boolean
  className?: string
}

const header = bem('x-header')

export const headerClass = ({ layout = 'inline', sticky, className }: HeaderOptions = {}): string =>
  header({ layout, sticky }, className)

export const headerClasses = {
  inner: header.el('inner'),
  brand: header.el('brand'),
  nav: header.el('nav'),
  list: header.el('list'),
  item: header.el('item'),
  link: header.el('link'),
  actions: header.el('actions'),
  menu: header.el('menu'),
  toggle: header.el('toggle', {}, buttonClass({ variant: 'tertiary', size: 'sm' })),
  panel: header.el('panel'),
  panelActions: header.el('panel-actions'),
} as const

export const navLinkAttrs = ({ href, current }: HeaderNavItem) => ({
  href,
  'aria-current': current ? ('page' as const) : undefined,
})

export const brandTag = (href?: string) => (href === undefined ? ('div' as const) : ('a' as const))
