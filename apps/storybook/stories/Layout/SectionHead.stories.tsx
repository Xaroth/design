import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container, SectionHead } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'

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

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Container>
      <Rows>
        {([2, 3] as const).map((level) => (
          <Row
            key={level}
            label={`Level ${level}, every slot`}
            stack
          >
            <SectionHead
              level={level}
              eyebrow="Logbook"
              title="Recent posts"
              sub="Notes from building tools on ESI and the SDE."
              link={{ label: 'All posts', href: '#blog' }}
            />
          </Row>
        ))}
        <Row
          label="No link"
          stack
        >
          <SectionHead
            eyebrow="Tools"
            title="Featured tools"
            sub="Six tools, no sign in needed."
          />
        </Row>
        <Row
          label="No eyebrow, no sub"
          stack
        >
          <SectionHead
            title="Timeline"
            link={{ label: 'About', href: '#about' }}
          />
        </Row>
        <Row
          label="Title only"
          stack
        >
          <SectionHead title="Open source" />
        </Row>
      </Rows>
    </Container>
  ),
}
