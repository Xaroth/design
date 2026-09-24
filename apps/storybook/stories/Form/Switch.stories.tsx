import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from '@xaroth.nl/design/react'

const meta = {
  title: 'Form/Switch',
  component: Switch,
  args: {
    children: 'Auto refresh',
    name: 'switch',
    defaultChecked: true,
    disabled: false,
    'aria-invalid': false,
  },
  argTypes: {
    children: { control: 'text' },
    'aria-invalid': { control: 'boolean' },
  },
} satisfies Meta<typeof Switch>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Switch' }
