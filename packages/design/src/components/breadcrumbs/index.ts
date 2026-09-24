import { bem } from '../../bem.ts'

export type BreadcrumbItem = {
  label: string
  href?: string
}

export type BreadcrumbsOptions = {
  className?: string
}

const breadcrumbs = bem('x-breadcrumbs')

export const breadcrumbsClass = ({ className }: BreadcrumbsOptions = {}): string => breadcrumbs({}, className)

export const breadcrumbsClasses = {
  list: breadcrumbs.el('list'),
  item: breadcrumbs.el('item'),
  link: breadcrumbs.el('link'),
  text: breadcrumbs.el('text'),
  current: breadcrumbs.el('current'),
} as const

// The last item is the page itself, so it is never a link even when it has an href.
export const breadcrumbState = (item: BreadcrumbItem, index: number, count: number) =>
  index === count - 1
    ? { tag: 'span' as const, attrs: { class: breadcrumbsClasses.current, 'aria-current': 'page' as const } }
    : item.href !== undefined
      ? { tag: 'a' as const, attrs: { class: breadcrumbsClasses.link, href: item.href } }
      : { tag: 'span' as const, attrs: { class: breadcrumbsClasses.text } }
