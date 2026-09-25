import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'

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

const states = [
  ['Unchecked', {}],
  ['Checked', { defaultChecked: true }],
  ['Disabled', { disabled: true }],
  ['Disabled, checked', { disabled: true, defaultChecked: true }],
  ['Invalid', { 'aria-invalid': true }],
  ['Invalid, checked', { 'aria-invalid': true, defaultChecked: true }],
] as const

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row label="States">
        {states.map(([label, props], i) => (
          <Checkbox
            key={label}
            name={`checkbox-${i}`}
            {...props}
          >
            {label}
          </Checkbox>
        ))}
      </Row>
      <Row label="Long label wraps">
        <div style={{ maxWidth: 280 }}>
          <Checkbox name="checkbox-long">Show achievements that need standings I do not have yet</Checkbox>
        </div>
      </Row>
    </Rows>
  ),
}
