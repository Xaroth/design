import './alert.scss'
import type { HTMLAttributes, ReactNode } from 'react'
import { alertClass, alertIcon, alertRole, type AlertOptions } from './index.ts'

export type AlertProps = Omit<AlertOptions, 'className'> &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    title?: ReactNode
    /** Sets role="alert" so screen readers interrupt. Only for messages shown in response to an action. */
    urgent?: boolean
    /** Row under the text, usually small buttons or a link. */
    actions?: ReactNode
  }

export function Alert({ tone, framed, title, urgent, role, actions, className, children, ...rest }: AlertProps) {
  return (
    <div
      {...rest}
      role={alertRole(urgent, role)}
      className={alertClass({ tone, framed, className })}
    >
      <svg
        className="x-alert__icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        {alertIcon(tone).map(({ className: pathClass, d }) => (
          <path
            key={d}
            className={pathClass}
            d={d}
          />
        ))}
      </svg>
      <div className="x-alert__content">
        {title != null && <p className="x-alert__title">{title}</p>}
        {children != null && <div className="x-alert__body">{children}</div>}
        {actions != null && <div className="x-alert__actions">{actions}</div>}
      </div>
    </div>
  )
}
