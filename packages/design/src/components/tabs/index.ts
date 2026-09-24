export type TabItem = {
  label: string
  href: string
  current?: boolean
  /** Shown after the label, for example the number of rows behind the tab. */
  count?: number | string
}

export type TabsOptions = {
  className?: string
}

export const tabsClass = ({ className }: TabsOptions = {}): string => ['x-tabs', className].filter(Boolean).join(' ')

export const tabsClasses = {
  list: 'x-tabs__list',
  item: 'x-tabs__item',
  link: 'x-tabs__link',
  count: 'x-tabs__count',
} as const

export const tabLinkAttrs = ({ href, current }: TabItem) => ({
  href,
  'aria-current': current ? ('page' as const) : undefined,
})
