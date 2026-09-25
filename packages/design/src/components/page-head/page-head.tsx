import './page-head.scss'
import { createElement, type HTMLAttributes, type ReactNode } from 'react'
import { pageHeadClass, pageHeadClasses as c, pageHeadTag, type PageHeadAlign, type PageHeadLevel } from './index.ts'

export type PageHeadProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  title: ReactNode
  /** Usually a Breadcrumbs part. */
  breadcrumbs?: ReactNode
  eyebrow?: ReactNode
  lead?: ReactNode
  /** Badges, date, tags. */
  meta?: ReactNode
  /** Buttons; right of the titles on wide screens, below them on narrow ones. */
  actions?: ReactNode
  level?: PageHeadLevel
  titleId?: string
  align?: PageHeadAlign
}

const has = (node: ReactNode) => node != null && node !== '' && node !== false

export function PageHead({
  title,
  breadcrumbs,
  eyebrow,
  lead,
  meta,
  actions,
  level,
  titleId,
  align,
  className,
  ...rest
}: PageHeadProps) {
  return (
    <header
      {...rest}
      className={pageHeadClass({ align, className })}
    >
      {has(breadcrumbs) && <div className={c.crumbs}>{breadcrumbs}</div>}
      <div className={c.body}>
        <div className={c.titles}>
          {has(eyebrow) && <p className={c.eyebrow}>{eyebrow}</p>}
          {createElement(pageHeadTag(level), { className: c.title, id: titleId }, title)}
          {has(lead) && <p className={c.lead}>{lead}</p>}
          {has(meta) && <div className={c.meta}>{meta}</div>}
        </div>
        {has(actions) && <div className={c.actions}>{actions}</div>}
      </div>
    </header>
  )
}
