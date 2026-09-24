import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge, Card, Tag } from '@xaroth.nl/design/react'

const statuses = {
  none: undefined,
  stable: <Badge tone="success">Stable</Badge>,
  beta: <Badge tone="info">Beta</Badge>,
  experimental: <Badge tone="warning">Experimental</Badge>,
}

const tagRows = {
  none: undefined,
  two: (
    <>
      <Tag>esi</Tag>
      <Tag>sde</Tag>
    </>
  ),
}

const meta = {
  title: 'Card',
  component: Card,
  args: {
    title: 'Fit checker',
    children: 'Paste a fit and see what it needs: skills, slots and a price from Jita.',
    index: 1,
    status: 'stable' as never,
    tags: 'two' as never,
    footStart: 'No sign in',
    footEnd: 'Launch →',
    href: '#',
    featured: false,
    as: 'article',
    headingLevel: 3,
  },
  argTypes: {
    title: { control: 'text' },
    children: { control: 'text' },
    index: { control: 'number' },
    status: { control: 'inline-radio', options: Object.keys(statuses), mapping: statuses },
    tags: { control: 'inline-radio', options: Object.keys(tagRows), mapping: tagRows },
    footStart: { control: 'text' },
    footEnd: { control: 'text' },
    href: { control: 'text' },
    featured: { control: 'boolean' },
    // 'li' is left out: it needs a list parent.
    as: { control: 'inline-radio', options: ['article', 'div'] },
    headingLevel: { control: 'inline-radio', options: [2, 3, 4, 5, 6] },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 380 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Card' }
