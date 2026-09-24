import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '@xaroth.nl/design/react'

const meta = {
  title: 'Badge',
  component: Badge,
  args: { children: 'Stable', tone: 'success' },
  argTypes: {
    children: { control: 'text' },
    tone: { control: 'inline-radio', options: ['default', 'info', 'success', 'warning', 'danger'] },
  },
} satisfies Meta<typeof Badge>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Badge' }
