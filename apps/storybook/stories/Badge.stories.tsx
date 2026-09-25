import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

const meta = {
  title: 'Badge',
  component: Badge,
  args: { children: 'Stable', tone: 'success' },
  argTypes: {
    children: { control: 'text' },
    tone: { control: 'inline-radio', options: ['default', 'info', 'success', 'warning', 'danger'] },
  },
} satisfies Meta<typeof Badge>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Badge' }

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row label="Tones">
        <Badge>Locked</Badge>
        <Badge tone="info">Beta</Badge>
        <Badge tone="success">Stable</Badge>
        <Badge tone="warning">Experimental</Badge>
        <Badge tone="danger">Offline</Badge>
      </Row>
      <Row label="Counts and long text">
        <Badge tone="info">7</Badge>
        <Badge tone="success">6 live</Badge>
        <Badge tone="warning">Deprecated after 2026-12-01</Badge>
      </Row>
    </Rows>
  ),
}
