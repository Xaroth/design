import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge, Table } from '@xaroth.nl/design/react'

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
