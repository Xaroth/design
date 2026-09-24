export type TableAlign = 'start' | 'end' | 'center'
export type TableDensity = 'comfortable' | 'compact'

export type TableColumn = {
  key: string
  label: string
  // Defaults to 'end' for numeric columns, 'start' otherwise.
  align?: TableAlign
  // Tabular figures, no wrapping, end aligned.
  numeric?: boolean
  // Any CSS width, set on the header cell.
  width?: string
}

export type TableRow<T = string | number> = Record<string, T | null | undefined>

// What an Astro cell renderer receives.
export type TableCell = {
  row: TableRow
  rowIndex: number
  column: TableColumn
  value: TableRow[string]
}

// The scroll region needs a name: pass `label` or point `aria-labelledby` at a visible heading.
export type TableLabel =
  | { label: string; 'aria-labelledby'?: string }
  | { label?: undefined; 'aria-labelledby': string }

export type TableOptions = {
  density?: TableDensity
  striped?: boolean
  hover?: boolean
  className?: string
}

export type TableWrapOptions = {
  stickyHeader?: boolean
  className?: string
}

// className goes on the wrapper, the outermost element.
export const tableWrapClass = ({ stickyHeader, className }: TableWrapOptions = {}): string =>
  ['x-table-wrap', stickyHeader && 'x-table-wrap--sticky', className].filter(Boolean).join(' ')

export const tableClass = ({ density = 'comfortable', striped, hover }: TableOptions = {}): string =>
  [
    'x-table',
    density !== 'comfortable' && `x-table--${density}`,
    striped && 'x-table--striped',
    hover && 'x-table--hover',
  ]
    .filter(Boolean)
    .join(' ')

export const tableCellAlign = ({ align, numeric }: Pick<TableColumn, 'align' | 'numeric'>): TableAlign =>
  align ?? (numeric ? 'end' : 'start')

// Header cells only take the alignment; the numeric look is for body cells.
export const tableCellClass = (column: TableColumn, part: 'head' | 'body'): string | undefined => {
  const align = tableCellAlign(column)
  const numeric = part === 'body' && column.numeric
  if (align === 'start' && !numeric) {
    return undefined
  }
  return ['x-table__cell', align !== 'start' && `x-table__cell--${align}`, numeric && 'x-table__cell--num']
    .filter(Boolean)
    .join(' ')
}

// Astro: markup for one cell goes in a named slot, overriding the row value.
export const tableCellSlot = (rowIndex: number, key: string): string => `cell-${rowIndex}-${key}`
