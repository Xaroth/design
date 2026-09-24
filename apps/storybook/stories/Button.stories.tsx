import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@xaroth.nl/design/react'

const meta = {
  title: 'Parts/Button',
  component: Button,
  args: { children: 'Launch', variant: 'primary', size: 'md' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const All: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button size="sm">Small</Button>
      <Button
        size="lg"
        href="#"
      >
        Large link
      </Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
}
