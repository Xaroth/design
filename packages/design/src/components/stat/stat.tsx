import './stat.scss'
import type { HTMLAttributes, ReactNode } from 'react'
import { statClass, statGroupClass, type StatGroupOptions, type StatOptions } from './index.ts'

export type StatGroupProps = Omit<StatGroupOptions, 'className'> & HTMLAttributes<HTMLDListElement>

// A dl: each stat is a name and value pair, which screen readers announce as the label followed by its value.
export function StatGroup({ variant, columns, className, ...rest }: StatGroupProps) {
  return (
    <dl
      {...rest}
      className={statGroupClass({ variant, columns, className })}
    />
  )
}

export type StatProps = Omit<StatOptions, 'className'> &
  HTMLAttributes<HTMLDivElement> & {
    label: ReactNode
    /** The value; children work too. */
    value?: ReactNode
    /** Small text after the value: a unit or "/ 44". */
    unit?: ReactNode
    /** Note under the value. */
    hint?: ReactNode
  }

export function Stat({ tone, label, value, unit, hint, className, children, ...rest }: StatProps) {
  return (
    <div
      {...rest}
      className={statClass({ tone, className })}
    >
      <dt className="x-stat__label">{label}</dt>
      <dd className="x-stat__value">
        {value ?? children}
        {unit != null && <span className="x-stat__unit">{unit}</span>}
      </dd>
      {hint != null && <dd className="x-stat__hint">{hint}</dd>}
    </div>
  )
}
