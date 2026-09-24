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
