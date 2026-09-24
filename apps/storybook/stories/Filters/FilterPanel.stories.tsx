import type { Meta, StoryObj } from '@storybook/react-vite'
import { FilterPanel } from '@xaroth.nl/design/react'
import { filterFields } from './shared.tsx'

// Outside a FilterLayout the panel uses its stacked grid: one column, two from 640px.
const meta = {
  title: 'Filters/FilterPanel',
  component: FilterPanel,
  args: {
    'aria-label': 'Filter achievements',
    children: filterFields,
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof FilterPanel>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'FilterPanel' }
