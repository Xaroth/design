import './tooltip.scss'
import { cloneElement, isValidElement, type HTMLAttributes, type ReactElement, type ReactNode } from 'react'
import { describedBy, tooltipClass, tooltipId, type TooltipOptions } from './index.ts'

export type TooltipProps = Omit<TooltipOptions, 'className'> &
  Omit<HTMLAttributes<HTMLSpanElement>, 'id'> & {
    /** Base for the tooltip id that the trigger's aria-describedby points at. Unique per page. */
    id: string
    /** Short hint. Never the only place for information needed to use the page. */
    text: string
    /** The trigger: one focusable element. */
    children: ReactNode
  }

type Describable = ReactElement<{ 'aria-describedby'?: string }>

export function Tooltip({ id, text, placement, open, className, children, ...rest }: TooltipProps) {
  const trigger = isValidElement(children)
    ? cloneElement(children as Describable, {
        'aria-describedby': describedBy((children as Describable).props['aria-describedby'], id),
      })
    : children
  return (
    <span
      {...rest}
      className={tooltipClass({ placement, open, className })}
    >
      {trigger}
      <span
        className="x-tooltip__bubble"
        role="tooltip"
        id={tooltipId(id)}
      >
        {text}
      </span>
    </span>
  )
}
