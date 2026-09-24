import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { buttonClass, type ButtonSize, type ButtonVariant } from '../parts/button.ts'

type Common = { variant?: ButtonVariant; size?: ButtonSize }

export type ButtonProps =
  | (Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })

export function Button({ variant, size, className, ...rest }: ButtonProps) {
  const classes = buttonClass({ variant, size, className })
  if (typeof rest.href === 'string') {
    return (
      <a
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    )
  }
  return (
    <button
      className={classes}
      type="button"
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  )
}
