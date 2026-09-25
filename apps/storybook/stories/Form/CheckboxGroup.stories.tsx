import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox, CheckboxGroup } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'

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

const categories = ['Combat', 'Industry', 'Exploration']

const option = (value: string, i: number, extra: object = {}) => (
  <Checkbox
    key={value}
    name="category"
    value={value}
    defaultChecked={i >= 0 && i < 2}
    {...extra}
  >
    {value}
  </Checkbox>
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
          <CheckboxGroup
            id={`v-${orientation}`}
            legend="Category"
            description="Show achievements from these categories."
            orientation={orientation}
          >
            {categories.map((value, i) => option(value, i, { name: `v-${orientation}` }))}
          </CheckboxGroup>
        </Row>
      ))}
      <Row
        label="No description"
        stack
      >
        <CheckboxGroup
          id="v-bare"
          legend="Category"
        >
          {categories.map((value, i) => option(value, i, { name: 'v-bare' }))}
        </CheckboxGroup>
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
        <CheckboxGroup
          id="s-required"
          legend="Category"
          required
        >
          {categories.map((value, i) => option(value, i, { name: 's-required' }))}
        </CheckboxGroup>
      </Row>
      <Row
        label="Invalid"
        stack
      >
        <CheckboxGroup
          id="s-invalid"
          legend="Category"
          description="Show achievements from these categories."
          error="Pick at least one category."
          required
        >
          {categories.map((value) => option(value, -1, { name: 's-invalid' }))}
        </CheckboxGroup>
      </Row>
      <Row
        label="Disabled group"
        stack
      >
        <CheckboxGroup
          id="s-disabled"
          legend="Category"
          disabled
        >
          {categories.map((value, i) => option(value, i, { name: 's-disabled' }))}
        </CheckboxGroup>
      </Row>
      <Row
        label="One option disabled"
        stack
      >
        <CheckboxGroup
          id="s-one"
          legend="Category"
          orientation="horizontal"
        >
          {categories.map((value, i) => option(value, i, { name: 's-one', disabled: i === 2 }))}
        </CheckboxGroup>
      </Row>
    </Rows>
  ),
}
