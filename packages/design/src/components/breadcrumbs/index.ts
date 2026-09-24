export type BreadcrumbItem = {
  label: string
  href?: string
}

export type BreadcrumbsOptions = {
  className?: string
}

export const breadcrumbsClass = ({ className }: BreadcrumbsOptions = {}): string =>
  ['x-breadcrumbs', className].filter(Boolean).join(' ')

export const breadcrumbsClasses = {
  list: 'x-breadcrumbs__list',
  item: 'x-breadcrumbs__item',
  link: 'x-breadcrumbs__link',
  text: 'x-breadcrumbs__text',
  current: 'x-breadcrumbs__current',
} as const

// The last item is the page itself, so it is never a link even when it has an href.
export const breadcrumbState = (item: BreadcrumbItem, index: number, count: number) =>
  index === count - 1
    ? { tag: 'span' as const, attrs: { class: breadcrumbsClasses.current, 'aria-current': 'page' as const } }
    : item.href !== undefined
      ? { tag: 'a' as const, attrs: { class: breadcrumbsClasses.link, href: item.href } }
      : { tag: 'span' as const, attrs: { class: breadcrumbsClasses.text } }
