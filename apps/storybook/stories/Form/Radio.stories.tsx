import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radio } from '@xaroth.nl/design/react'

const meta = {
  title: 'Form/Radio',
  component: Radio,
  args: {
    children: 'Tranquility',
    name: 'radio',
    defaultChecked: true,
    disabled: false,
    'aria-invalid': false,
  },
  argTypes: {
    children: { control: 'text' },
    'aria-invalid': { control: 'boolean' },
  },
} satisfies Meta<typeof Radio>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Radio' }
