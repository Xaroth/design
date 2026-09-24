import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stat, StatGroup, type StatGroupVariant } from '@xaroth.nl/design/react'

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
