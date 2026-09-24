import { bem } from '../../bem.ts'

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

const tabs = bem('x-tabs')

export const tabsClass = ({ className }: TabsOptions = {}): string => tabs({}, className)

export const tabsClasses = {
  list: tabs.el('list'),
  item: tabs.el('item'),
  link: tabs.el('link'),
  count: tabs.el('count'),
} as const

export const tabLinkAttrs = ({ href, current }: TabItem) => ({
  href,
  'aria-current': current ? ('page' as const) : undefined,
})
