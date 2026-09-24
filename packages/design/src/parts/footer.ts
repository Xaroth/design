// columns: brand and note left, one column per link group (EVE v3). row: brand and links on one line, note below (Dune v3).
export type FooterLayout = 'columns' | 'row'

export type FooterLink = {
  label: string
  href: string
}

export type FooterGroup = {
  title?: string
  links: FooterLink[]
}

export type FooterOptions = {
  layout?: FooterLayout
  className?: string
}

export const footerClass = ({ layout = 'columns', className }: FooterOptions = {}): string =>
  ['x-footer', `x-footer--${layout}`, className].filter(Boolean).join(' ')

export const footerClasses = {
  inner: 'x-footer__inner',
  brand: 'x-footer__brand',
  note: 'x-footer__note',
  nav: 'x-footer__nav',
  group: 'x-footer__group',
  title: 'x-footer__title',
  links: 'x-footer__links',
  link: 'x-footer__link',
} as const
