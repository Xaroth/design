import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stat, StatGroup, type StatGroupVariant } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'

type Args = Parameters<typeof Stat>[0] & { groupVariant: StatGroupVariant }

const meta = {
  title: 'Stat/Stat',
  component: Stat,
  args: {
    label: 'Completed',
    value: '2',
    unit: '/ 7',
    hint: '',
    tone: 'success',
    groupVariant: 'framed',
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    unit: { control: 'text' },
    hint: { control: 'text' },
    tone: { control: 'inline-radio', options: ['default', 'muted', 'success', 'warning', 'danger'] },
    groupVariant: { name: 'group variant', control: 'inline-radio', options: ['plain', 'framed'] },
    children: { control: false },
  },
  // A stat is a dt/dd pair, so it always sits in a StatGroup.
  render: ({ groupVariant, unit, hint, ...args }) => (
    <StatGroup
      variant={groupVariant}
      columns={2}
      style={{ maxWidth: 560 }}
    >
      <Stat
        {...args}
        unit={unit || undefined}
        hint={hint || undefined}
      />
    </StatGroup>
  ),
} satisfies Meta<Args>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Stat' }

const tones = [
  ['default', 'In progress', '3', undefined, 'Across four empires'],
  ['muted', 'Locked', '2', undefined, 'Needs Caldari standing 5.0'],
  ['success', 'Completed', '2', '/ 7', 'Last one on 14 Mar'],
  ['warning', 'LP earned', '25,000', 'LP', 'Expires with the season'],
  ['danger', 'Errors left', '12', '/ 100', 'Slow down: 250 ms delay'],
] as const

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      {(['framed', 'plain'] as const).map((variant) => (
        <Row
          key={variant}
          label={`Tones, ${variant}`}
          stack
        >
          <StatGroup
            variant={variant}
            columns={3}
            aria-label={`Tones, ${variant}`}
          >
            {tones.map(([tone, label, value, unit, hint]) => (
              <Stat
                key={tone}
                tone={tone}
                label={label}
                value={value}
                unit={unit}
                hint={hint}
              />
            ))}
          </StatGroup>
        </Row>
      ))}
    </Rows>
  ),
}
