import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge, Breadcrumbs, Button, Container, PageHead, Tag } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

const crumbs = {
  none: undefined,
  trail: (
    <Breadcrumbs
      items={[{ label: 'Home', href: '#' }, { label: 'Blog', href: '#blog' }, { label: 'Typed ESI client' }]}
    />
  ),
}

const metas = {
  none: undefined,
  post: (
    <>
      <time dateTime="2026-09-02">2 Sep 2026</time>
      <span>9 min read</span>
      <Tag>ESI</Tag>
      <Tag>TypeScript</Tag>
    </>
  ),
  status: <Badge tone="success">6 live</Badge>,
}

const actionRows = {
  none: undefined,
  one: (
    <Button
      variant="secondary"
      size="sm"
    >
      Share
    </Button>
  ),
  two: (
    <>
      <Button
        variant="secondary"
        size="sm"
      >
        Share
      </Button>
      <Button size="sm">Open repo</Button>
    </>
  ),
}

const meta = {
  title: 'PageHead',
  component: PageHead,
  args: {
    breadcrumbs: 'trail' as never,
    eyebrow: 'Logbook',
    title: 'Building a typed ESI client',
    lead: 'ESI publishes an OpenAPI spec for every route. With a bit of cleanup it drives a typed client.',
    meta: 'post' as never,
    actions: 'two' as never,
    level: 1,
    align: 'start',
  },
  argTypes: {
    breadcrumbs: { control: 'inline-radio', options: Object.keys(crumbs), mapping: crumbs },
    eyebrow: { control: 'text' },
    title: { control: 'text' },
    lead: { control: 'text' },
    meta: { control: 'inline-radio', options: Object.keys(metas), mapping: metas },
    actions: { control: 'inline-radio', options: Object.keys(actionRows), mapping: actionRows },
    level: { control: 'inline-radio', options: [1, 2] },
    align: { control: 'inline-radio', options: ['start', 'center'] },
    titleId: { control: 'text' },
  },
  render: (args) => (
    <Container
      as="main"
      className="x-py-2xl"
    >
      <PageHead {...args} />
      <p>Page content starts here.</p>
    </Container>
  ),
} satisfies Meta<typeof PageHead>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'PageHead' }

const full = {
  breadcrumbs: crumbs.trail,
  eyebrow: 'Logbook',
  title: 'Building a typed ESI client',
  lead: 'ESI publishes an OpenAPI spec for every route. With a bit of cleanup it drives a typed client.',
  meta: metas.post,
  actions: actionRows.two,
}

// Each slot left out once, so every combination of present and missing neighbours renders.
const without = ['breadcrumbs', 'eyebrow', 'lead', 'meta', 'actions'] as const

export const Variants: StoryObj<typeof meta> = {
  parameters: { ...matrix, layout: 'fullscreen' },
  render: () => (
    <Container className="x-py-2xl">
      <Rows>
        {(['start', 'center'] as const).map((align) => (
          <Row
            key={align}
            label={`Align ${align}, every slot`}
            stack
          >
            <PageHead
              {...full}
              align={align}
              level={2}
            />
          </Row>
        ))}
        <Row
          label="Align center, status meta, one action"
          stack
        >
          <PageHead
            align="center"
            level={2}
            eyebrow="eve-online.tools"
            title="Tools for capsuleers"
            lead="Small tools on ESI and the SDE. No sign in unless a tool needs your character."
            meta={metas.status}
            actions={actionRows.one}
          />
        </Row>
        {without.map((slot) => (
          <Row
            key={slot}
            label={`Without ${slot}`}
            stack
          >
            <PageHead
              {...full}
              {...{ [slot]: undefined }}
              level={2}
            />
          </Row>
        ))}
        <Row
          label="Title only, level 1"
          stack
        >
          <PageHead title="About" />
        </Row>
      </Rows>
    </Container>
  ),
}
