import './breadcrumbs.scss'
import { createElement, type HTMLAttributes } from 'react'
import { breadcrumbState, breadcrumbsClass, breadcrumbsClasses as c, type BreadcrumbItem } from './index.ts'

export type BreadcrumbsProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** Trail from the root to the current page. The last item is the current page. */
  items: BreadcrumbItem[]
  label?: string
}

export function Breadcrumbs({ className, items, label = 'Breadcrumb', ...rest }: BreadcrumbsProps) {
  return (
    <nav
      {...rest}
      aria-label={label}
      className={breadcrumbsClass({ className })}
    >
      <ol className={c.list}>
        {items.map((item, i) => {
          const { tag, attrs } = breadcrumbState(item, i, items.length)
          const { class: cls, ...other } = attrs
          return (
            <li
              key={`${i}-${item.label}`}
              className={c.item}
            >
              {createElement(tag, { ...other, className: cls }, item.label)}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
