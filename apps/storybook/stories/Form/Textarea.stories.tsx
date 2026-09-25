import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from '@xaroth.nl/design/react'
import { matrix, Row } from '../shared.tsx'

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

const notes = 'Drake Navy Issue, shield PvE.\nNeeds Shield Upgrades IV for the second extender.'

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <div
      className="x-gap-xl"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(18rem, 1fr))' }}
    >
      {(
        [
          ['Empty', { placeholder: 'Fitting notes' }],
          ['With value', { defaultValue: notes }],
          ['Disabled', { defaultValue: notes, disabled: true }],
          ['Read-only', { defaultValue: notes, readOnly: true }],
          ['Invalid', { defaultValue: 'Too short', 'aria-invalid': true }],
          ['Required', { placeholder: 'Fitting notes', required: true }],
        ] as const
      ).map(([label, props]) => (
        <Row
          key={label}
          label={label}
          stack
        >
          <Textarea
            aria-label={`Fitting notes, ${label}`}
            rows={3}
            {...props}
          />
        </Row>
      ))}
    </div>
  ),
}
