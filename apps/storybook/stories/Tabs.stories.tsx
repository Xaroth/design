import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs } from '@xaroth.nl/design/react'

const meta = {
  title: 'Tabs',
  component: Tabs,
  args: {
    label: 'Tool sections',
    items: [
      { label: 'Overview', href: '#', current: true },
      { label: 'Achievements', href: '#achievements', count: 7 },
      { label: 'Settings', href: '#settings' },
    ],
  },
  argTypes: {
    label: { control: 'text' },
    items: { control: 'object' },
  },
} satisfies Meta<typeof Tabs>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Tabs' }
