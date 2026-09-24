import './progress.scss'
import type { CSSProperties, HTMLAttributes } from 'react'
import { progressClass, progressProperty, progressState, type ProgressName, type ProgressOptions } from './index.ts'

export type ProgressProps = Omit<ProgressOptions, 'className'> &
  ProgressName &
  Omit<HTMLAttributes<HTMLDivElement>, 'style' | 'role' | 'children'>

export function Progress({ value, max, tone, startTone, size, showValue, label, className, ...rest }: ProgressProps) {
  const { width, text, attrs } = progressState({ value, max, label, showValue })
  return (
    <div
      {...rest}
      {...attrs}
      className={progressClass({ value, max, tone, startTone, size, className })}
      style={width === undefined ? undefined : ({ [progressProperty]: width } as CSSProperties)}
    >
      <span className="x-progress__track">
        <span className="x-progress__fill" />
      </span>
      {text !== undefined && <span className="x-progress__value">{text}</span>}
    </div>
  )
}
