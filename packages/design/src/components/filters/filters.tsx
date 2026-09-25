'use client'

import './filters.scss'
import { useState, type FormHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react'
import {
  filterClasses as c,
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
    /** Below 1024px the filters fold behind a closed disclosure. */
    collapsible?: boolean
    collapsibleLabel?: string
    /** Number of active filters, shown on the disclosure. */
    activeCount?: number
    activeLabel?: string
    onPositionChange?: (position: FilterPosition) => void
  }

export function FilterLayout({
  position = 'top',
  switchable,
  switchLabel = 'Filter position',
  collapsible,
  collapsibleLabel = 'Filters',
  activeCount,
  activeLabel = 'active',
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
        <fieldset className={c.switch}>
          <legend className={c.switchLabel}>{switchLabel}</legend>
          <span className={c.switchOptions}>
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
      {collapsible && (
        <details className={c.disclosure}>
          <summary className={c.toggle}>
            {collapsibleLabel}
            {activeCount !== undefined && activeCount > 0 && (
              <span className={c.count}>
                {activeCount}
                <span className="x-visually-hidden">{` ${activeLabel}`}</span>
              </span>
            )}
          </summary>
        </details>
      )}
      <div className={c.controls}>{filters}</div>
      <div className={c.results}>{children}</div>
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
