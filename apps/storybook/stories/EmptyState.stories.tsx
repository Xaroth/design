import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, EmptyState } from '@xaroth.nl/design/react'

const icons = {
  none: undefined,
  hex: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M12 2 21 7v10l-9 5-9-5V7z"
        strokeDasharray="3 2"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
      />
      <path d="M12 2v4M12 18v4M3 7l3.5 2M21 7l-3.5 2" />
    </svg>
  ),
  dunes: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <path d="M2 17c4-3 8-3 10-1s6 2 10-1" />
      <path d="M2 21c4-3 8-3 10-1s6 2 10-1" />
      <circle
        cx="12"
        cy="8"
        r="4"
      />
    </svg>
  ),
}

const actionRows = {
  none: undefined,
  reset: (
    <Button
      variant="secondary"
      size="sm"
    >
      Reset filters
    </Button>
  ),
}

const meta = {
  title: 'EmptyState',
  component: EmptyState,
  args: {
    icon: 'hex' as never,
    title: 'Nothing matches',
    children: 'Nothing fits the current filters. Clear the search or pick another faction to see more.',
    actions: 'reset' as never,
    headingLevel: 3,
  },
  argTypes: {
    icon: { control: 'inline-radio', options: Object.keys(icons), mapping: icons },
    title: { control: 'text' },
    children: { control: 'text' },
    actions: { control: 'inline-radio', options: Object.keys(actionRows), mapping: actionRows },
    headingLevel: { control: 'inline-radio', options: [2, 3, 4, 5, 6] },
  },
} satisfies Meta<typeof EmptyState>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'EmptyState' }
