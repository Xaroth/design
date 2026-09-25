import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert, Button } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

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

const copy = {
  info: ['Cached data', 'ESI caches achievement data for 1 hour. Next refresh at 15:02 EVE time.'],
  success: ['Fit saved', 'Drake Navy Issue, shield PvE. Shared link copied to the clipboard.'],
  warning: ['Token expires soon', 'Your ESI token expires in 3 days. Sign in again to keep syncing standings.'],
  danger: ['ESI unavailable', 'Tranquility is in downtime. Tools show cached data until it comes back.'],
} as const
const tones = Object.keys(copy) as (keyof typeof copy)[]

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows width={720}>
      {[false, true].map((framed) => (
        <Row
          key={String(framed)}
          label={framed ? 'Framed' : 'Plain'}
          stack
        >
          {tones.map((tone) => (
            <Alert
              key={tone}
              tone={tone}
              framed={framed}
              title={copy[tone][0]}
            >
              {copy[tone][1]}
            </Alert>
          ))}
        </Row>
      ))}
      <Row
        label="Title only, body only, with actions"
        stack
      >
        <Alert
          tone="success"
          title="Standings synced"
        />
        <Alert tone="info">SDE updated to build 3104256. Type names may have changed.</Alert>
        <Alert
          tone="warning"
          framed
          title="Signed out"
          actions={actionRows.signIn}
        >
          Sign in to see your own achievements next to the list.
        </Alert>
      </Row>
    </Rows>
  ),
}
