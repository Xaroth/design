import './panel.scss'
import type { HTMLAttributes } from 'react'
import { panelClass, type PanelElement, type PanelOptions } from './index.ts'

export type PanelProps = Omit<PanelOptions, 'className'> &
  HTMLAttributes<HTMLElement> & {
    as?: PanelElement
  }

export function Panel({ variant, marks, padding, as: El = 'div', className, ...rest }: PanelProps) {
  return (
    <El
      {...(rest as HTMLAttributes<HTMLElement>)}
      className={panelClass({ variant, marks, padding, className })}
    />
  )
}
