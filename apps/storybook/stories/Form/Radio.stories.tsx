import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radio } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'

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
          <Radio
            key={label}
            name={`radio-${i}`}
            {...props}
          >
            {label}
          </Radio>
        ))}
      </Row>
      <Row label="Long label wraps">
        <div style={{ maxWidth: 280 }}>
          <Radio name="radio-long">Singularity, the public test server, reset every few weeks</Radio>
        </div>
      </Row>
    </Rows>
  ),
}
