import '../button/button.scss'
import './header.scss'
import type { HTMLAttributes, ReactNode } from 'react'
import {
  brandState,
  headerClass,
  headerClasses as c,
  navLinkAttrs,
  type HeaderNavItem,
  type HeaderOptions,
} from './index.ts'

export type HeaderProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  Omit<HeaderOptions, 'className'> & {
    /** Logo and site name. */
    brand?: ReactNode
    /** Makes the brand a link, usually to the home page. */
    brandHref?: string
    /** Accessible name for the brand link, when the visible text is not enough. Ignored without `brandHref`. */
    brandLabel?: string
    items?: HeaderNavItem[]
    /** Shown at the end of the bar, for example a sign in button. Stays in the bar at every width. */
    actions?: ReactNode
    navLabel?: string
    menuLabel?: string
  }

export function Header({
  layout,
  sticky,
  className,
  brand,
  brandHref,
  brandLabel,
  items = [],
  actions,
  navLabel = 'Main',
  menuLabel = 'Menu',
  ...rest
}: HeaderProps) {
  const list = (
    <ul className={c.list}>
      {items.map((item) => (
        <li
          key={item.href}
          className={c.item}
        >
          <a
            className={c.link}
            {...navLinkAttrs(item)}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  )
  const { tag: Brand, attrs: brandAttrs } = brandState(brandHref, brandLabel)
  return (
    <header
      {...rest}
      className={headerClass({ layout, sticky, className })}
    >
      <div className={c.inner}>
        {brand != null && (
          <Brand
            {...brandAttrs}
            className={c.brand}
          >
            {brand}
          </Brand>
        )}
        {items.length > 0 && (
          <nav
            className={c.nav}
            aria-label={navLabel}
          >
            {list}
          </nav>
        )}
        {actions != null && <div className={c.actions}>{actions}</div>}
        {items.length > 0 && (
          <details className={c.menu}>
            <summary className={c.toggle}>
              <span className="x-button__label">{menuLabel}</span>
            </summary>
            <div className={c.panel}>
              <nav aria-label={navLabel}>{list}</nav>
            </div>
          </details>
        )}
      </div>
    </header>
  )
}
