import type { AnchorHTMLAttributes, HTMLAttributes } from 'react'
import { tagClass, tagState, type TagOptions } from '../parts/tag.ts'

export type TagProps =
  | (Omit<TagOptions, 'className'> & HTMLAttributes<HTMLSpanElement> & { href?: undefined })
  | (Omit<TagOptions, 'className'> & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })

export function Tag(props: TagProps) {
  const { active, className, children, href, ...rest } = props
  const classes = tagClass({ active, className })
  const { tag, attrs } = tagState({ href, active })
  if (tag === 'a') {
    return (
      <a
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        {...attrs}
        className={classes}
      >
        {children}
      </a>
    )
  }
  return (
    <span
      {...rest}
      className={classes}
    >
      {children}
    </span>
  )
}
