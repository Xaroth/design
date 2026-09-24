import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from '@xaroth.nl/design/react'

const meta = {
  title: 'Form/Textarea',
  component: Textarea,
  args: {
    'aria-label': 'Fitting notes',
    placeholder: 'Fitting notes',
    rows: 5,
    disabled: false,
    readOnly: false,
    'aria-invalid': false,
  },
  argTypes: {
    'aria-invalid': { control: 'boolean' },
  },
} satisfies Meta<typeof Textarea>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Textarea' }
