import type { Meta, StoryObj } from '@storybook/react-vite'
import { Field, Input } from '@xaroth.nl/design/react'

const meta = {
  title: 'Form/Field',
  component: Field,
  args: {
    id: 'character',
    label: 'Character name',
    description: 'As shown in the character sheet.',
    error: '',
    required: false,
    children: <Input placeholder="Xaroth Brook" />,
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    children: { control: false },
  },
} satisfies Meta<typeof Field>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Field' }
