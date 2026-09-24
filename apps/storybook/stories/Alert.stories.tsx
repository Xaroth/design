import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert, Button } from '@xaroth.nl/design/react'

const actionRows = {
  none: undefined,
  signIn: (
    <>
      <Button size="sm">Sign in</Button>
      <Button
        size="sm"
        variant="tertiary"
      >
        Dismiss
      </Button>
    </>
  ),
}

const meta = {
  title: 'Alert',
  component: Alert,
  args: {
    tone: 'info',
    title: 'Cached data',
    children: 'ESI caches achievement data for 1 hour. Last fetched 14:02 EVE time, next refresh at 15:02.',
    framed: false,
    urgent: false,
    actions: 'none' as never,
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['info', 'success', 'warning', 'danger'] },
    title: { control: 'text' },
    children: { control: 'text' },
    framed: { control: 'boolean' },
    urgent: { control: 'boolean' },
    actions: { control: 'inline-radio', options: Object.keys(actionRows), mapping: actionRows },
  },
} satisfies Meta<typeof Alert>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Alert' }
