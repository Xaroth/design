import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Tooltip } from '@xaroth.nl/design/react'

const meta = {
  title: 'Tooltip',
  component: Tooltip,
  args: {
    id: 'scopes',
    text: 'Two scopes: achievements and standings.',
    placement: 'top',
    open: true,
    children: (
      <Button
        variant="secondary"
        size="sm"
      >
        Scopes
      </Button>
    ),
  },
  argTypes: {
    text: { control: 'text' },
    placement: { control: 'inline-radio', options: ['top', 'bottom'] },
    open: { control: 'boolean' },
    children: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '96px 160px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Tooltip' }
