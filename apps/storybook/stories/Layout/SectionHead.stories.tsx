import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container, SectionHead } from '@xaroth.nl/design/react'

type Args = {
  title: string
  eyebrow: string
  sub: string
  linkLabel: string
  linkHref: string
  level: 2 | 3
}

const meta = {
  title: 'Layout/SectionHead',
  args: {
    title: 'Recent posts',
    eyebrow: 'Logbook',
    sub: 'Notes from building tools on ESI and the SDE.',
    linkLabel: 'All posts',
    linkHref: '#',
    level: 2,
  },
  argTypes: {
    level: { control: 'inline-radio', options: [2, 3] },
  },
  render: ({ linkLabel, linkHref, ...args }) => (
    <Container>
      <SectionHead
        {...args}
        link={linkLabel ? { label: linkLabel, href: linkHref } : undefined}
      />
    </Container>
  ),
} satisfies Meta<Args>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'SectionHead' }
