import { buttonClass } from './button.ts'

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

export const headerClass = ({ layout = 'inline', sticky, className }: HeaderOptions = {}): string =>
  ['x-header', `x-header--${layout}`, sticky && 'x-header--sticky', className].filter(Boolean).join(' ')

export const headerClasses = {
  inner: 'x-header__inner',
  brand: 'x-header__brand',
  nav: 'x-header__nav',
  list: 'x-header__list',
  item: 'x-header__item',
  link: 'x-header__link',
  actions: 'x-header__actions',
  menu: 'x-header__menu',
  toggle: `${buttonClass({ variant: 'tertiary', size: 'sm' })} x-header__toggle`,
  panel: 'x-header__panel',
  panelActions: 'x-header__panel-actions',
} as const

export const navLinkAttrs = ({ href, current }: HeaderNavItem) => ({
  href,
  'aria-current': current ? ('page' as const) : undefined,
})

// Brand is a home link when brandHref is set, a plain box otherwise.
export const brandTag = (href?: string) => (href === undefined ? ('div' as const) : ('a' as const))
