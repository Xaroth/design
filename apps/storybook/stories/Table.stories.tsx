import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties } from 'react'
import { Badge, EmptyState, Table } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

const columns = [
  { key: 'name', label: 'Achievement' },
  { key: 'faction', label: 'Faction' },
  { key: 'category', label: 'Category' },
  { key: 'progress', label: 'Progress', numeric: true },
  { key: 'state', label: 'State' },
  { key: 'reward', label: 'Reward LP', numeric: true, width: '9rem' },
]

const rows = [
  {
    name: 'Wardec Veteran',
    faction: 'Amarr Empire',
    category: 'Combat',
    progress: '100%',
    state: 'done',
    reward: '25,000',
  },
  {
    name: 'Sovereign Hauler',
    faction: 'Caldari State',
    category: 'Industry',
    progress: '72%',
    state: 'progress',
    reward: '4,800',
  },
  {
    name: 'Sisters of Mercy',
    faction: 'Gallente Federation',
    category: 'Exploration',
    progress: '40%',
    state: 'progress',
    reward: '10,000',
  },
  {
    name: 'Tribal Liberator',
    faction: 'Minmatar Republic',
    category: 'Combat',
    progress: '100%',
    state: 'done',
    reward: '1,250',
  },
  {
    name: 'Deep Core Miner',
    faction: 'Caldari State',
    category: 'Industry',
    progress: '8%',
    state: 'locked',
    reward: '600',
  },
]

const badges = {
  done: <Badge tone="success">Done</Badge>,
  progress: <Badge tone="info">In progress</Badge>,
  locked: <Badge>Locked</Badge>,
}

const rowSets = {
  text: rows,
  badges: rows.map((row) => ({ ...row, state: badges[row.state as keyof typeof badges] })),
  empty: [],
}

const meta = {
  title: 'Table',
  component: Table,
  args: {
    label: 'Achievements',
    columns,
    rows: 'badges' as never,
    caption: 'Five achievements across the four empires.',
    density: 'comfortable',
    striped: false,
    hover: true,
    stickyHeader: false,
  },
  argTypes: {
    label: { control: 'text' },
    columns: { control: 'object' },
    rows: { control: 'inline-radio', options: Object.keys(rowSets), mapping: rowSets },
    caption: { control: 'text' },
    density: { control: 'inline-radio', options: ['comfortable', 'compact'] },
    striped: { control: 'boolean' },
    hover: { control: 'boolean' },
    stickyHeader: { control: 'boolean' },
  },
} satisfies Meta<typeof Table>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Table' }

const aligned = [
  { key: 'name', label: 'Achievement' },
  { key: 'category', label: 'Category', align: 'center' as const },
  { key: 'progress', label: 'Progress', numeric: true },
  { key: 'reward', label: 'Reward LP', align: 'end' as const },
]

const many = Array.from({ length: 4 }, (_, i) =>
  rowSets.badges.map((row) => ({ ...row, name: `${row.name} ${i + 1}` })),
).flat()

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      {(['comfortable', 'compact'] as const).flatMap((density) =>
        [false, true].map((striped) => (
          <Row
            key={`${density}-${striped}`}
            label={`${density}${striped ? ', striped' : ''}`}
            stack
          >
            <Table
              label={`Achievements, ${density}${striped ? ', striped' : ''}`}
              columns={columns}
              rows={rowSets.badges.slice(0, 3)}
              density={density}
              striped={striped}
              hover
            />
          </Row>
        )),
      )}
      <Row
        label="Alignment: start, center, numeric, end"
        stack
      >
        <Table
          label="Alignment"
          columns={aligned}
          rows={rows.slice(0, 3)}
          caption="Numeric columns use tabular figures and align to the end."
        />
      </Row>
      <Row
        label="Sticky header, scrolls at 16rem"
        stack
      >
        <Table
          label="Achievements, sticky header"
          columns={columns}
          rows={many}
          stickyHeader
          striped
          style={{ '--x-table-max-height': '16rem' } as CSSProperties}
        />
      </Row>
      <Row
        label="Wide, scrolls sideways"
        stack
      >
        <div style={{ maxWidth: 480 }}>
          <Table
            label="Achievements, wide"
            columns={columns}
            rows={rowSets.badges.slice(0, 3)}
            density="compact"
          />
        </div>
      </Row>
    </Rows>
  ),
}

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row
        label="No rows"
        stack
      >
        <Table
          label="Achievements, empty"
          columns={columns}
          rows={[]}
          caption="No achievements match the filters."
        />
      </Row>
      <Row
        label="Empty cells"
        stack
      >
        <Table
          label="Achievements, missing values"
          columns={columns}
          rows={[
            { ...rowSets.badges[0], reward: null },
            { ...rowSets.badges[1], faction: undefined, progress: '' },
          ]}
        />
      </Row>
      <Row
        label="Empty state instead of rows"
        stack
      >
        <EmptyState title="Nothing matches">Clear the search or pick another faction to see more.</EmptyState>
      </Row>
    </Rows>
  ),
}
