import { createElement, type ReactNode } from 'react'
import { describe, it } from 'vitest'
import { Table } from '@xaroth.nl/design/react'
import { tableCellSlot, type TableColumn } from '@xaroth.nl/design/parts'
import { expectSameHtml } from '../compare.ts'
import { Table as AstroTable } from '@xaroth.nl/design/astro'
import DefaultSlot from './fixtures/table-default-slot.astro'

const columns: TableColumn[] = [
  { key: 'name', label: 'Achievement' },
  { key: 'state', label: 'State', align: 'center' },
  { key: 'reward', label: 'Reward', numeric: true, width: '8rem' },
]

const rows = [
  { name: 'First blood', state: 'Done', reward: 1500 },
  { name: 'Explorer & <scout>', state: 'Beta', reward: '12,000' },
  { name: 'Empty reward', state: null },
]

const base = { columns, rows, label: 'Achievements' }

// Astro takes cell markup in named slots, React the same content as ReactNode row values.
const cases: {
  name: string
  props: Record<string, unknown>
  cells?: { row: number; key: string; html: string; node: ReactNode }[]
}[] = [
  { name: 'default', props: base },
  { name: 'caption', props: { ...base, caption: 'Seven achievements across the four empires.' } },
  { name: 'empty caption', props: { ...base, caption: '' } },
  { name: 'compact', props: { ...base, density: 'compact' } },
  { name: 'comfortable', props: { ...base, density: 'comfortable' } },
  { name: 'striped', props: { ...base, striped: true } },
  { name: 'hover', props: { ...base, hover: true } },
  { name: 'sticky header', props: { ...base, stickyHeader: true } },
  {
    name: 'all flags',
    props: { ...base, density: 'compact', striped: true, hover: true, stickyHeader: true, caption: 'All' },
  },
  { name: 'aria-labelledby instead of label', props: { columns, rows, 'aria-labelledby': 'h-ach' } },
  {
    name: 'numeric with explicit start align',
    props: { ...base, columns: [{ key: 'reward', label: 'Reward', numeric: true, align: 'start' }] },
  },
  { name: 'no rows', props: { ...base, rows: [] } },
  { name: 'class and attrs', props: { ...base, class: 'site-table', id: 't1', 'data-region': 'table' } },
  { name: 'user role loses', props: { ...base, role: 'grid', id: 't2' } },
  {
    name: 'cell markup',
    props: base,
    cells: [
      {
        row: 0,
        key: 'state',
        html: '<span class="x-badge x-badge--success">Done</span>',
        node: createElement('span', { className: 'x-badge x-badge--success' }, 'Done'),
      },
      { row: 1, key: 'name', html: '<strong>Explorer</strong>', node: createElement('strong', null, 'Explorer') },
    ],
  },
]

describe('Table renders the same HTML in Astro and React', () => {
  for (const { name, props, cells = [] } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      const slots: Record<string, string> = {}
      const reactRows = (props.rows as Record<string, ReactNode>[]).map((row) => ({ ...row }))
      for (const { row, key, html, node } of cells) {
        slots[tableCellSlot(row, key)] = html
        reactRows[row]![key] = node
      }
      await expectSameHtml(
        AstroTable,
        { props, slots },
        createElement(Table, { ...rest, rows: reactRows, className } as never),
      )
    })
  }
})

describe('Table default slot', () => {
  it('calls a slot function per cell', async () => {
    const reactRows = rows.map((row) => ({
      ...row,
      state: row.state == null ? row.state : createElement('b', null, row.state),
    }))
    await expectSameHtml(
      DefaultSlot,
      { props: { ...base, mode: 'function' } },
      createElement(Table, { ...base, rows: reactRows }),
    )
  })

  it('ignores plain markup', async () => {
    await expectSameHtml(DefaultSlot, { props: { ...base, mode: 'markup' } }, createElement(Table, base))
  })
})
