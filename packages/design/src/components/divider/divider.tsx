import './divider.scss'
import type { HTMLAttributes } from 'react'
import { dividerClass, dividerState, type DividerOptions } from './index.ts'

export type DividerProps = Omit<DividerOptions, 'className'> & HTMLAttributes<HTMLElement>

export function Divider({ variant, className, children, ...rest }: DividerProps) {
  const { tag: Tag, attrs } = dividerState({ variant })
  const classes = dividerClass({ variant, className })
  if (Tag === 'hr') {
    return (
      <hr
        {...rest}
        className={classes}
      />
    )
  }
  return (
    <Tag
      {...rest}
      {...attrs}
      className={classes}
    >
      {variant === 'label' ? (
        <span className="x-divider__label">{children}</span>
      ) : (
        <span className="x-divider__mark" />
      )}
    </Tag>
  )
}
