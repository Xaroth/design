import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@xaroth.nl/design/react'

const meta = {
  title: 'Button',
  component: Button,
  args: { children: 'Launch', variant: 'primary', size: 'md', disabled: false },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Button>

export default meta

// Named like the component so Storybook shows it as a single "Button" entry, no folder.
export const Default: StoryObj<typeof meta> = { name: 'Button' }
