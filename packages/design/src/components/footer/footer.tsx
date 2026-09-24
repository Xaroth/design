import './footer.scss'
import { createElement, type HTMLAttributes, type ReactNode } from 'react'
import { footerClass, footerClasses as c, type FooterGroup, type FooterOptions } from './index.ts'
import { brandTag } from '../header/index.ts'

export type FooterProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  Omit<FooterOptions, 'className'> & {
    /** Logo and site name. */
    brand?: ReactNode
    /** Makes the brand a link, usually to the home page. */
    brandHref?: string
    brandLabel?: string
    /** Legal line. */
    note?: ReactNode
    groups?: FooterGroup[]
    navLabel?: string
  }

export function Footer({
  layout,
  className,
  brand,
  brandHref,
  brandLabel,
  note,
  groups = [],
  navLabel = 'Footer',
  ...rest
}: FooterProps) {
  return (
    <footer
      className={footerClass({ layout, className })}
      {...rest}
    >
      <div className={c.inner}>
        {brand != null &&
          createElement(brandTag(brandHref), { className: c.brand, href: brandHref, 'aria-label': brandLabel }, brand)}
        {note != null && note !== '' && <p className={c.note}>{note}</p>}
        {groups.length > 0 && (
          <nav
            className={c.nav}
            aria-label={navLabel}
          >
            {groups.map((group, i) => (
              <div
                key={group.title ?? i}
                className={c.group}
              >
                {group.title && <h2 className={c.title}>{group.title}</h2>}
                <ul className={c.links}>
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <a
                        className={c.link}
                        href={link.href}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        )}
      </div>
    </footer>
  )
}
