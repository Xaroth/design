import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'

const meta = {
  title: 'Form/Switch',
  component: Switch,
  args: {
    children: 'Auto refresh',
    name: 'switch',
    defaultChecked: true,
    disabled: false,
    'aria-invalid': false,
  },
  argTypes: {
    children: { control: 'text' },
    'aria-invalid': { control: 'boolean' },
  },
} satisfies Meta<typeof Switch>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Switch' }

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
          <Switch
            key={label}
            name={`switch-${i}`}
            {...props}
          >
            {label}
          </Switch>
        ))}
      </Row>
      <Row label="Long label wraps">
        <div style={{ maxWidth: 280 }}>
          <Switch name="switch-long">Refresh market data every 5 minutes while this tab is open</Switch>
        </div>
      </Row>
    </Rows>
  ),
}
