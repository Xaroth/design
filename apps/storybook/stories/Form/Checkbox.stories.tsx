import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from '@xaroth.nl/design/react'

const meta = {
  title: 'Form/Checkbox',
  component: Checkbox,
  args: {
    children: 'Combat',
    name: 'checkbox',
    defaultChecked: true,
    disabled: false,
    'aria-invalid': false,
  },
  argTypes: {
    children: { control: 'text' },
    'aria-invalid': { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Checkbox' }
