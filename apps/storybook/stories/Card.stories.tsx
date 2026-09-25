import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge, Card, Tag } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

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
} satisfies Meta<typeof Card>

export default meta

export const Default: StoryObj<typeof meta> = {
  name: 'Card',
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 380 }}>
        <Story />
      </div>
    ),
  ],
}

const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(18rem, 1fr))', alignItems: 'start' }

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row
        label="Link, featured, static"
        stack
      >
        <div
          className="x-gap-lg"
          style={grid}
        >
          <Card
            href="#fit"
            index={1}
            status={statuses.stable}
            title="Fit checker"
            tags={tagRows.two}
            footStart="No sign in"
            footEnd="Launch →"
          >
            Paste a fit and see what it needs: skills, slots and a price from Jita.
          </Card>
          <Card
            href="#achievements"
            featured
            index={2}
            status={statuses.beta}
            title="Achievement tracker"
            footStart="Sign in with EVE"
            footEnd="Launch →"
          >
            Every achievement across the four empires, with your progress next to it.
          </Card>
          <Card
            index={3}
            status={statuses.experimental}
            title="Route planner"
            footStart="Coming soon"
          >
            Plan a hauling route that avoids low security space and gate camps.
          </Card>
        </div>
      </Row>
      <Row
        label="Each status, index and no index"
        stack
      >
        <ul
          className="x-gap-lg"
          style={{ ...grid, padding: 0, margin: 0, listStyle: 'none' }}
        >
          {(['stable', 'beta', 'experimental'] as const).map((status, i) => (
            <Card
              key={status}
              as="li"
              index={i + 4}
              status={statuses[status]}
              title={['Skill planner', 'LP store', 'Wormhole mapper'][i]}
            >
              {
                [
                  'Plan skills for a fit and see the training time.',
                  'Compare LP store offers by ISK per LP.',
                  'Map a wormhole chain with your corp.',
                ][i]
              }
            </Card>
          ))}
          <Card
            as="li"
            title="No head row"
          >
            A card without index or status starts at the title.
          </Card>
        </ul>
      </Row>
      <Row
        label="Body only and title only"
        stack
      >
        <div
          className="x-gap-lg"
          style={grid}
        >
          <Card>A card with only a body, for short notes next to a tool list.</Card>
          <Card
            title="Market history"
            as="div"
            headingLevel={4}
          />
        </div>
      </Row>
    </Rows>
  ),
}
