import type { Meta, StoryObj } from '@storybook/react-vite'
import { Timeline } from '@xaroth.nl/design/react'

const meta = {
  title: 'Timeline',
  component: Timeline,
  args: {
    headingLevel: 3,
    items: [
      {
        date: '2026',
        datetime: '2026',
        title: 'eve-online.tools',
        text: 'Rebuilt the tool collection on typed ESI and a pinned SDE.',
        current: true,
      },
      {
        date: '2024',
        datetime: '2024',
        title: 'Fanfest schedule',
        text: 'Shipped the unofficial Fanfest schedule site.',
      },
      { date: '2019', datetime: '2019', title: 'Joined CCP Games', text: 'Started working on EVE Online services.' },
      { date: '2006', title: 'Undocked', text: 'First login to New Eden. Lost a Rifter within the hour.' },
    ],
  },
  argTypes: {
    items: { control: 'object' },
    headingLevel: { control: 'inline-radio', options: [2, 3, 4, 5, 6] },
  },
} satisfies Meta<typeof Timeline>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Timeline' }
