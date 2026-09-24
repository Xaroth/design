import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox, CheckboxGroup } from '@xaroth.nl/design/react'

const meta = {
  title: 'Form/CheckboxGroup',
  component: CheckboxGroup,
  args: {
    id: 'category',
    legend: 'Category',
    description: 'Show achievements from these categories.',
    error: '',
    required: false,
    orientation: 'vertical',
    children: ['Combat', 'Industry', 'Exploration'].map((category, i) => (
      <Checkbox
        key={category}
        name="category"
        value={category}
        defaultChecked={i < 2}
      >
        {category}
      </Checkbox>
    )),
  },
  argTypes: {
    legend: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    children: { control: false },
  },
} satisfies Meta<typeof CheckboxGroup>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'CheckboxGroup' }
