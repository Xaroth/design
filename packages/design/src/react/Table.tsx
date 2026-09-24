import type { HTMLAttributes, ReactNode } from 'react'
import {
  tableCellClass,
  tableClass,
  tableWrapClass,
  type TableColumn,
  type TableLabel,
  type TableOptions,
  type TableRow,
} from '../parts/table.ts'

export type TableProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'aria-label' | 'aria-labelledby'> &
  Omit<TableOptions, 'className'> &
  TableLabel & {
    columns: TableColumn[]
    rows: TableRow<ReactNode>[]
    caption?: ReactNode
    /** Header stays in view while the wrapper scrolls; the wrapper caps its height (--x-table-max-height). */
    stickyHeader?: boolean
  }

export function Table({
  columns,
  rows,
  caption,
  density,
  striped,
  hover,
  stickyHeader,
  label,
  className,
  ...rest
}: TableProps) {
  return (
    // A focusable named region lets keyboard users scroll a wide table (WCAG 2.1.1).
    <div
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
      role="region"
      // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      aria-label={label}
      {...rest}
      className={tableWrapClass({ stickyHeader, className })}
    >
      <table className={tableClass({ density, striped, hover })}>
        {caption != null && caption !== '' && <caption className="x-table__caption">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={tableCellClass(column, 'head')}
                scope="col"
                style={column.width ? { width: column.width } : undefined}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={tableCellClass(column, 'body')}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
