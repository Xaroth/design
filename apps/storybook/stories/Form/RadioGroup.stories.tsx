import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radio, RadioGroup } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'

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

const servers = ['Tranquility', 'Singularity', 'Duality']

const option = (value: string, i: number, extra: object = {}) => (
  <Radio
    key={value}
    name="server"
    value={value}
    defaultChecked={i === 0}
    {...extra}
  >
    {value}
  </Radio>
)

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      {(['vertical', 'horizontal'] as const).map((orientation) => (
        <Row
          key={orientation}
          label={orientation}
          stack
        >
          <RadioGroup
            id={`v-${orientation}`}
            legend="Server"
            description="Where the tool reads data from."
            orientation={orientation}
          >
            {servers.map((value, i) => option(value, i, { name: `v-${orientation}` }))}
          </RadioGroup>
        </Row>
      ))}
      <Row
        label="No description"
        stack
      >
        <RadioGroup
          id="v-bare"
          legend="Server"
        >
          {servers.map((value, i) => option(value, i, { name: 'v-bare' }))}
        </RadioGroup>
      </Row>
    </Rows>
  ),
}

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row
        label="Required"
        stack
      >
        <RadioGroup
          id="s-required"
          legend="Server"
          required
        >
          {servers.map((value, i) => option(value, i, { name: 's-required' }))}
        </RadioGroup>
      </Row>
      <Row
        label="Invalid"
        stack
      >
        <RadioGroup
          id="s-invalid"
          legend="Server"
          description="Where the tool reads data from."
          error="Pick a server."
          required
        >
          {servers.map((value) => option(value, -1, { name: 's-invalid' }))}
        </RadioGroup>
      </Row>
      <Row
        label="Disabled group"
        stack
      >
        <RadioGroup
          id="s-disabled"
          legend="Server"
          disabled
        >
          {servers.map((value, i) => option(value, i, { name: 's-disabled' }))}
        </RadioGroup>
      </Row>
      <Row
        label="One option disabled"
        stack
      >
        <RadioGroup
          id="s-one"
          legend="Server"
          orientation="horizontal"
        >
          {servers.map((value, i) => option(value, i, { name: 's-one', disabled: i === 2 }))}
        </RadioGroup>
      </Row>
    </Rows>
  ),
}
