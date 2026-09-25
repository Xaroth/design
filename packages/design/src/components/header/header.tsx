import '../button/button.scss'
import './header.scss'
import { createElement, type HTMLAttributes, type ReactNode } from 'react'
import {
  brandTag,
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
    /** Accessible name for the brand link, when the visible text is not enough. */
    brandLabel?: string
    items?: HeaderNavItem[]
    /** Shown at the end of the bar, for example a sign in button. Moves into the menu on small screens. */
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
  return (
    <header
      className={headerClass({ layout, sticky, className })}
      {...rest}
    >
      <div className={c.inner}>
        {brand != null &&
          createElement(brandTag(brandHref), { className: c.brand, href: brandHref, 'aria-label': brandLabel }, brand)}
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
              {actions != null && <div className={c.panelActions}>{actions}</div>}
            </div>
          </details>
        )}
      </div>
    </header>
  )
}
