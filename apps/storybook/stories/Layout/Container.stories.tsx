import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'

const meta = {
  title: 'Layout/Container',
  component: Container,
  args: {
    width: 'page',
    children: (
      <p style={{ padding: '16px 0', background: 'var(--x-color-accent-wash)' }}>
        The container holds every page to 1200px with side gutters. The prose width keeps running text at 68ch.
      </p>
    ),
  },
  argTypes: {
    width: { control: 'inline-radio', options: ['page', 'prose'] },
    as: { control: 'select', options: ['div', 'main', 'header', 'footer', 'article', 'nav'] },
    children: { control: false },
  },
} satisfies Meta<typeof Container>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Container' }

export const Variants: StoryObj<typeof meta> = {
  parameters: { ...matrix, layout: 'fullscreen' },
  render: () => (
    <div className="x-py-xl">
      <Rows>
        {(['page', 'prose'] as const).map((width) => (
          <Container
            key={width}
            width={width}
          >
            <Row
              label={`Width ${width}`}
              stack
            >
              <p style={{ padding: '16px 0', background: 'var(--x-color-accent-wash)' }}>
                Every tool on this site talks to ESI, the EVE Swagger Interface. It is a large API with its own scopes,
                cache timers and error shapes. The {width} width caps this line.
              </p>
            </Row>
          </Container>
        ))}
      </Rows>
    </div>
  ),
}
