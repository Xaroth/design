import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stat, StatGroup } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'

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

const stats = [
  { label: 'Completed', value: '2', unit: '/ 7', tone: 'success' },
  { label: 'In progress', value: '3' },
  { label: 'Locked', value: '2', tone: 'muted' },
  { label: 'LP earned', value: '25,000', tone: 'warning' },
] as const

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      {(['framed', 'plain'] as const).flatMap((variant) =>
        ([2, 3, 4] as const).map((columns) => (
          <Row
            key={`${variant}-${columns}`}
            label={`${variant}, ${columns} columns`}
            stack
          >
            <StatGroup
              variant={variant}
              columns={columns}
              aria-label={`Summary, ${variant}, ${columns} columns`}
            >
              {stats.slice(0, columns).map((stat) => (
                <Stat
                  key={stat.label}
                  {...stat}
                />
              ))}
            </StatGroup>
          </Row>
        )),
      )}
      <Row
        label="Wraps: 4 stats in 3 columns"
        stack
      >
        <StatGroup
          columns={3}
          aria-label="Summary, wrapping"
        >
          {stats.map((stat) => (
            <Stat
              key={stat.label}
              {...stat}
            />
          ))}
        </StatGroup>
      </Row>
    </Rows>
  ),
}
