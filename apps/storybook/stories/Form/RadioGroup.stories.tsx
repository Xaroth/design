import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radio, RadioGroup } from '@xaroth.nl/design/react'

const meta = {
  title: 'Form/RadioGroup',
  component: RadioGroup,
  args: {
    id: 'server',
    legend: 'Server',
    description: 'Where the tool reads data from.',
    error: '',
    required: false,
    orientation: 'vertical',
    children: ['Tranquility', 'Singularity', 'Duality'].map((server, i) => (
      <Radio
        key={server}
        name="server"
        value={server}
        defaultChecked={i === 0}
      >
        {server}
      </Radio>
    )),
  },
  argTypes: {
    legend: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    children: { control: false },
  },
} satisfies Meta<typeof RadioGroup>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'RadioGroup' }
