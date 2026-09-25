import './tabs.scss'
import type { HTMLAttributes } from 'react'
import { tabLinkAttrs, tabsClass, tabsClasses as c, type TabItem } from './index.ts'

export type TabsProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  items: TabItem[]
  /** Accessible name of the nav, for example "Tool sections". */
  label: string
}

export function Tabs({ className, items, label, ...rest }: TabsProps) {
  return (
    <nav
      {...rest}
      aria-label={label}
      className={tabsClass({ className })}
    >
      <ul className={c.list}>
        {items.map((item) => (
          <li
            key={item.href}
            className={c.item}
          >
            <a
              className={c.link}
              {...tabLinkAttrs(item)}
            >
              {item.label}
              {item.count !== undefined && <span className={c.count}>{item.count}</span>}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
