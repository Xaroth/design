import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import {
  cardClass,
  cardIndexProperty,
  cardIndexValue,
  type CardElement,
  type CardHeadingLevel,
  type CardOptions,
} from '../parts/card.ts'

export type CardProps = Omit<CardOptions, 'className' | 'link'> &
  Omit<HTMLAttributes<HTMLElement>, 'title'> & {
    /** Makes the whole card one link, through the title. Needs a title; keep other content non-interactive. */
    href?: string
    title?: ReactNode
    /** Number shown in the head; the theme formats it (T-01, IV). */
    index?: number
    /** Head row, right side. Usually a Badge. */
    status?: ReactNode
    /** Row of Tag chips under the body. */
    tags?: ReactNode
    footStart?: ReactNode
    footEnd?: ReactNode
    as?: CardElement
    headingLevel?: CardHeadingLevel
  }

export function Card({
  featured,
  href,
  title,
  index,
  status,
  tags,
  footStart,
  footEnd,
  as: El = 'article',
  headingLevel = 3,
  className,
  children,
  ...rest
}: CardProps) {
  const H = `h${headingLevel}` as const
  return (
    <El
      {...rest}
      className={cardClass({ featured, link: href !== undefined, className })}
    >
      {(index !== undefined || status != null) && (
        <div className="x-card__head">
          {index !== undefined && (
            <span
              className="x-card__index"
              style={{ [cardIndexProperty]: cardIndexValue(index) } as CSSProperties}
              aria-hidden="true"
            />
          )}
          {status != null && <span className="x-card__status">{status}</span>}
        </div>
      )}
      {title != null && (
        <H className="x-card__title">
          {href !== undefined ? (
            <a
              className="x-card__link"
              href={href}
            >
              {title}
            </a>
          ) : (
            title
          )}
        </H>
      )}
      {children != null && <div className="x-card__body">{children}</div>}
      {tags != null && <div className="x-card__tags">{tags}</div>}
      {(footStart != null || footEnd != null) && (
        <div className="x-card__foot">
          {footStart != null && <div className="x-card__foot-start">{footStart}</div>}
          {footEnd != null && <div className="x-card__foot-end">{footEnd}</div>}
        </div>
      )}
    </El>
  )
}
