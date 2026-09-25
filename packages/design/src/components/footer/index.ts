import { bem } from '../../bem.ts'

// columns: brand and note left, one column per link group. row: brand and links on one line, note below.
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

const footer = bem('x-footer')

export const footerClass = ({ layout = 'columns', className }: FooterOptions = {}): string =>
  footer({ layout }, className)

export const footerClasses = {
  inner: footer.el('inner'),
  brand: footer.el('brand'),
  note: footer.el('note'),
  nav: footer.el('nav'),
  group: footer.el('group'),
  title: footer.el('title'),
  links: footer.el('links'),
  link: footer.el('link'),
} as const

export const footerBrandTag = (href?: string) => (href === undefined ? ('div' as const) : ('a' as const))

// Only the link takes a name: an aria-label on a plain div is not announced.
export const footerBrandState = (href?: string, label?: string) =>
  href === undefined
    ? { tag: 'div' as const, attrs: {} }
    : { tag: 'a' as const, attrs: { href, ...(label !== undefined && { 'aria-label': label }) } }
