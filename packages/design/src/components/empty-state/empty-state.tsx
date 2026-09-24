import './empty-state.scss'
import type { HTMLAttributes, ReactNode } from 'react'
import { emptyStateClass, type EmptyStateHeadingLevel } from './index.ts'

export type EmptyStateProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  /** Decorative line icon; hidden from screen readers. */
  icon?: ReactNode
  title?: ReactNode
  headingLevel?: EmptyStateHeadingLevel
  /** Row under the text, usually one button that clears what caused the empty result. */
  actions?: ReactNode
}

export function EmptyState({ icon, title, headingLevel = 3, actions, className, children, ...rest }: EmptyStateProps) {
  const H = `h${headingLevel}` as const
  return (
    <div
      {...rest}
      className={emptyStateClass({ className })}
    >
      {icon != null && (
        <span
          className="x-empty-state__icon"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      {title != null && <H className="x-empty-state__title">{title}</H>}
      {children != null && <div className="x-empty-state__text">{children}</div>}
      {actions != null && <div className="x-empty-state__actions">{actions}</div>}
    </div>
  )
}
