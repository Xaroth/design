import type { Meta, StoryObj } from '@storybook/react-vite'
import { Timeline } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

const meta = {
  title: 'Timeline',
  component: Timeline,
  args: {
    headingLevel: 3,
    items: [
      {
        date: '2026',
        title: 'eve-online.tools',
        text: 'Rebuilt the tool collection on typed ESI and a pinned SDE.',
        current: true,
      },
      {
        date: '2024',
        title: 'Fanfest schedule',
        text: 'Shipped the unofficial Fanfest schedule site.',
      },
      { date: '2019', title: 'Joined CCP Games', text: 'Started working on EVE Online services.' },
      { date: '2006-05-06', title: 'Undocked', text: 'First login to New Eden. Lost a Rifter within the hour.' },
    ],
  },
  argTypes: {
    items: { control: 'object' },
    headingLevel: { control: 'inline-radio', options: [2, 3, 4, 5, 6] },
  },
} satisfies Meta<typeof Timeline>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Timeline' }

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows width="40rem">
      <Row
        label="Dates, labels and text"
        stack
      >
        <Timeline
          headingLevel={3}
          items={[
            { date: '2026-09', label: 'Sep 2026', title: 'Design kit', text: 'One core, two themes.', current: true },
            { date: '2024', title: 'Fanfest schedule' },
            { label: 'Some time in 2019', title: 'Joined CCP Games', text: 'Started on EVE Online services.' },
          ]}
        />
      </Row>
      <Row
        label="Title only, no current"
        stack
      >
        <Timeline
          headingLevel={4}
          items={[
            { date: '2026', title: 'eve-online.tools' },
            { date: '2024', title: 'Fanfest schedule' },
            { date: '2006-05-06', title: 'Undocked' },
          ]}
        />
      </Row>
      <Row
        label="Single entry"
        stack
      >
        <Timeline
          headingLevel={3}
          items={[{ date: '2026', title: 'eve-online.tools', text: 'Typed ESI and a pinned SDE.', current: true }]}
        />
      </Row>
    </Rows>
  ),
}

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows width="28rem">
      {[0, 2].map((i) => (
        <Row
          key={i}
          label={`Current: ${i === 0 ? 'first' : 'last'}`}
          stack
        >
          <Timeline
            headingLevel={3}
            items={['2026', '2024', '2019'].map((date, j) => ({
              date,
              title: ['eve-online.tools', 'Fanfest schedule', 'Joined CCP Games'][j],
              current: j === i,
            }))}
          />
        </Row>
      ))}
    </Rows>
  ),
}
