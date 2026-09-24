import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container, FilterLayout } from '@xaroth.nl/design/react'
import { filterForm, results } from './shared.tsx'

const meta = {
  title: 'Filters/FilterLayout',
  component: FilterLayout,
  args: {
    position: 'top',
    switchable: true,
    switchLabel: 'Filter position',
    filters: filterForm,
    children: results,
  },
  argTypes: {
    position: { control: 'inline-radio', options: ['top', 'side'] },
    switchable: { control: 'boolean' },
    switchLabel: { control: 'text' },
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
