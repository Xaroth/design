import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination } from '@xaroth.nl/design/react'

const meta = {
  title: 'Pagination',
  component: Pagination,
  args: {
    page: 2,
    pages: 8,
    href: '#page-{page}',
    siblings: 1,
    ends: false,
    align: 'center',
    label: 'Pagination',
    prevLabel: 'Prev',
    nextLabel: 'Next',
    firstLabel: 'First',
    lastLabel: 'Last',
    summaryLabel: 'Page {page} of {pages}',
  },
  argTypes: {
    page: { control: { type: 'number', min: 1 } },
    pages: { control: { type: 'number', min: 1 } },
    siblings: { control: { type: 'number', min: 0 } },
    href: { control: 'text' },
    firstHref: { control: 'text' },
    ends: { control: 'boolean' },
    align: { control: 'inline-radio', options: ['center', 'start'] },
    label: { control: 'text' },
    prevLabel: { control: 'text' },
    nextLabel: { control: 'text' },
    firstLabel: { control: 'text' },
    lastLabel: { control: 'text' },
    summaryLabel: { control: 'text' },
  },
} satisfies Meta<typeof Pagination>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Pagination' }
