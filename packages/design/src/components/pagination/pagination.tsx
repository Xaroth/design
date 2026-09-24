import './pagination.scss'
import type { HTMLAttributes } from 'react'
import {
  paginationClass,
  paginationClasses as c,
  paginationEntries,
  paginationPageAttrs,
  type PaginationInput,
  type PaginationOptions,
} from './index.ts'

export type PaginationProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  Omit<PaginationOptions, 'className'> &
  PaginationInput & {
    /** Accessible name of the nav. */
    label?: string
  }

export function Pagination({
  align,
  className,
  page,
  pages,
  href,
  firstHref,
  siblings,
  ends,
  prevLabel,
  nextLabel,
  firstLabel,
  lastLabel,
  label = 'Pagination',
  ...rest
}: PaginationProps) {
  const entries = paginationEntries({
    page,
    pages,
    href,
    firstHref,
    siblings,
    ends,
    prevLabel,
    nextLabel,
    firstLabel,
    lastLabel,
  })
  return (
    <nav
      className={paginationClass({ align, className })}
      aria-label={label}
      {...rest}
    >
      <ul className={c.list}>
        {entries.map((entry) => (
          <li
            key={entry.key}
            className={c.item}
          >
            {entry.kind === 'page' ? (
              <a
                className={c.link}
                {...paginationPageAttrs(entry)}
              >
                {entry.label}
              </a>
            ) : entry.kind === 'gap' ? (
              <span className={c.gap}>…</span>
            ) : entry.href === undefined ? (
              <span className={c.disabled}>{entry.label}</span>
            ) : (
              <a
                className={c.edge}
                href={entry.href}
                rel={entry.rel}
              >
                {entry.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
