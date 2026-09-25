import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from '@xaroth.nl/design/react'
import { matrix, Row } from '../shared.tsx'

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

const factions = ['Caldari State', 'Amarr Empire', 'Gallente Federation', 'Minmatar Republic']

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <div
      className="x-gap-xl"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))' }}
    >
      {(
        [
          ['Enabled', {}],
          ['Disabled', { disabled: true }],
          ['Invalid', { 'aria-invalid': true }],
          ['Required', { required: true }],
        ] as const
      ).map(([label, props]) => (
        <Row
          key={label}
          label={label}
          stack
        >
          <Select
            aria-label={`Faction, ${label}`}
            {...props}
          >
            {factions.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </Select>
        </Row>
      ))}
      <Row
        label="Placeholder option"
        stack
      >
        <Select
          aria-label="Faction, placeholder"
          defaultValue=""
        >
          <option
            value=""
            disabled
          >
            Pick a faction
          </option>
          {factions.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </Select>
      </Row>
    </div>
  ),
}
