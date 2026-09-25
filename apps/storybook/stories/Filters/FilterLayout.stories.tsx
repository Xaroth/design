import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container, FilterLayout } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'
import { filterForm, makeFilterForm, results } from './shared.tsx'

const meta = {
  title: 'Filters/FilterLayout',
  component: FilterLayout,
  args: {
    position: 'top',
    switchable: true,
    switchLabel: 'Filter position',
    collapsible: true,
    collapsibleLabel: 'Filters',
    activeCount: 2,
    activeLabel: 'active',
    filters: filterForm,
    children: results,
  },
  argTypes: {
    position: { control: 'inline-radio', options: ['top', 'side'] },
    switchable: { control: 'boolean' },
    switchLabel: { control: 'text' },
    collapsible: { control: 'boolean' },
    collapsibleLabel: { control: 'text' },
    activeCount: { control: { type: 'number', min: 0 } },
    activeLabel: { control: 'text' },
    filters: { control: false },
    children: { control: false },
    onPositionChange: { action: 'position' },
  },
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <Container style={{ paddingBlock: 32 }}>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof FilterLayout>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'FilterLayout' }

const combos = [
  { position: 'top', label: 'Top' },
  { position: 'side', label: 'Side' },
  { position: 'top', switchable: true, label: 'Top, switchable' },
  { position: 'side', switchable: true, collapsible: true, activeCount: 2, label: 'Side, switchable, collapsible' },
] as const

// The collapsible disclosure only shows below 1024px; narrow the preview to see it.
export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      {combos.map(({ label, ...props }, i) => (
        <Row
          key={label}
          label={label}
          stack
        >
          <FilterLayout
            {...props}
            filters={makeFilterForm(`v${i}`)}
          >
            {results}
          </FilterLayout>
        </Row>
      ))}
    </Rows>
  ),
}
