'use client'

import './tooltip.scss'
import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react'
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

export function Tooltip({
  id,
  text,
  placement,
  open,
  className,
  children,
  onPointerLeave,
  onFocus,
  onBlur,
  ...rest
}: TooltipProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [dismissed, setDismissed] = useState(false)

  // Escape hides the shown tooltip (WCAG 1.4.13) until the pointer leaves or focus moves in or out.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && ref.current?.matches(':hover, :has(:focus-visible)')) {
        setDismissed(true)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const trigger = isValidElement(children)
    ? cloneElement(children as Describable, {
        'aria-describedby': describedBy((children as Describable).props['aria-describedby'], id),
      })
    : children
  return (
    <span
      {...rest}
      ref={ref}
      onPointerLeave={(event) => {
        setDismissed(false)
        onPointerLeave?.(event)
      }}
      onFocus={(event) => {
        setDismissed(false)
        onFocus?.(event)
      }}
      onBlur={(event) => {
        setDismissed(false)
        onBlur?.(event)
      }}
      className={tooltipClass({ placement, open, dismissed, className })}
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
