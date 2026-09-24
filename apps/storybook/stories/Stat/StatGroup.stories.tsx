import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stat, StatGroup } from '@xaroth.nl/design/react'

const meta = {
  title: 'Stat/StatGroup',
  component: StatGroup,
  args: {
    variant: 'framed',
    columns: 4,
    'aria-label': 'Summary',
    children: (
      <>
        <Stat
          label="Completed"
          value="2"
          unit="/ 7"
          tone="success"
        />
        <Stat
          label="In progress"
          value="3"
        />
        <Stat
          label="Locked"
          value="2"
          tone="muted"
        />
        <Stat
          label="LP earned"
          value="25,000"
          tone="warning"
        />
      </>
    ),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['plain', 'framed'] },
    columns: { control: 'inline-radio', options: [2, 3, 4] },
    children: { control: false },
  },
} satisfies Meta<typeof StatGroup>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'StatGroup' }
