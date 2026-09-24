import './filters.scss'
import { useState, type FormHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react'
import {
  filterLayoutClass,
  filterPanelClass,
  filterPositions,
  filterSwitchButtonAttrs,
  filterSwitchLabels,
  type FilterLayoutOptions,
  type FilterPosition,
} from './index.ts'

export type FilterLayoutProps = HTMLAttributes<HTMLDivElement> &
  Omit<FilterLayoutOptions, 'className'> & {
    /** The filter form, usually a FilterPanel. */
    filters?: ReactNode
    /** Adds a Top / Side switch above the filters (hidden below 1024px). */
    switchable?: boolean
    switchLabel?: string
    onPositionChange?: (position: FilterPosition) => void
  }

export function FilterLayout({
  position = 'top',
  switchable,
  switchLabel = 'Filter position',
  onPositionChange,
  filters,
  className,
  children,
  ...rest
}: FilterLayoutProps) {
  const [current, setCurrent] = useState(position)
  // A new position prop resets the switch; clicks change it until then.
  const [prop, setProp] = useState(position)
  if (prop !== position) {
    setProp(position)
    setCurrent(position)
  }

  return (
    <div
      {...rest}
      className={filterLayoutClass({ position: current, className })}
    >
      {switchable && (
        <fieldset className="x-filters__switch">
          <legend className="x-filters__switch-label">{switchLabel}</legend>
          <span className="x-filters__switch-options">
            {filterPositions.map((option) => {
              const { class: optionClass, ...attrs } = filterSwitchButtonAttrs(option, current)
              return (
                <button
                  key={option}
                  {...attrs}
                  type="button"
                  className={optionClass}
                  onClick={() => {
                    setCurrent(option)
                    onPositionChange?.(option)
                  }}
                >
                  {filterSwitchLabels[option]}
                </button>
              )
            })}
          </span>
        </fieldset>
      )}
      <div className="x-filters__controls">{filters}</div>
      <div className="x-filters__results">{children}</div>
    </div>
  )
}

export type FilterPanelProps = FormHTMLAttributes<HTMLFormElement>

export function FilterPanel({ className, ...rest }: FilterPanelProps) {
  return (
    <form
      {...rest}
      className={filterPanelClass({ className })}
    />
  )
}
