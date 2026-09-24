import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from '@xaroth.nl/design/react'

const meta = {
  title: 'Form/Select',
  component: Select,
  args: {
    'aria-label': 'Faction',
    disabled: false,
    'aria-invalid': false,
    children: ['Caldari State', 'Amarr Empire', 'Gallente Federation', 'Minmatar Republic'].map((f) => (
      <option key={f}>{f}</option>
    )),
  },
  argTypes: {
    'aria-invalid': { control: 'boolean' },
    children: { control: false },
  },
} satisfies Meta<typeof Select>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Select' }
