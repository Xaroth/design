import type { HTMLAttributes } from 'react'
import { badgeClass, type BadgeOptions } from '../parts/badge.ts'

export type BadgeProps = Omit<BadgeOptions, 'className'> & HTMLAttributes<HTMLSpanElement>

export function Badge({ tone, className, children, ...rest }: BadgeProps) {
  return (
    <span
      {...rest}
      className={badgeClass({ tone, className })}
    >
      {children}
    </span>
  )
}
