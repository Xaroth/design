import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { buttonClass, buttonState, type ButtonOptions } from '../parts/button.ts'

type Common = Omit<ButtonOptions, 'className'> & {
  /** Shown before the label, usually an icon. */
  start?: ReactNode
  /** Shown after the label, usually an icon. */
  end?: ReactNode
}

export type ButtonProps =
  | (Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (Common & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> & { href: string; disabled?: boolean })

export function Button(props: ButtonProps) {
  const { variant, tone, size, fullWidth, loading, disabled, className, start, end, children, onClick, ...rest } = props
  const classes = buttonClass({ variant, tone, size, fullWidth, loading, className })
  const { tag, attrs } = buttonState({ href: props.href, disabled, loading })

  // aria-disabled does not stop clicks or Enter, so inactive buttons swallow them here.
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (disabled || loading) {
      event.preventDefault()
      return
    }
    ;(onClick as ((e: MouseEvent<HTMLElement>) => void) | undefined)?.(event)
  }

  const content = (
    <>
      {start != null && <span className="x-button__start">{start}</span>}
      <span className="x-button__label">{children}</span>
      {end != null && <span className="x-button__end">{end}</span>}
      {loading && (
        <span
          className="x-button__spinner"
          aria-hidden="true"
        />
      )}
    </>
  )

  if (tag === 'a') {
    return (
      <a
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        {...attrs}
        className={classes}
        onClick={handleClick}
      >
        {content}
      </a>
    )
  }
  return (
    <button
      type="button"
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      {...attrs}
      className={classes}
      onClick={handleClick}
    >
      {content}
    </button>
  )
}
