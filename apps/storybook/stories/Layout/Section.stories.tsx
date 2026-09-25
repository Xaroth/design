import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container, Section } from '@xaroth.nl/design/react'
import { matrix, Row } from '../shared.tsx'

const meta = {
  title: 'Layout/Section',
  component: Section,
  args: {
    tight: false,
    children: (
      <Container>
        <p style={{ background: 'var(--x-color-accent-wash)' }}>
          Section content. The padding above and below is the section gap.
        </p>
      </Container>
    ),
  },
  argTypes: {
    as: { control: 'select', options: ['section', 'div', 'article', 'aside'] },
    children: { control: false },
  },
} satisfies Meta<typeof Section>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Section' }

export const Variants: StoryObj<typeof meta> = {
  parameters: { ...matrix, layout: 'fullscreen' },
  render: () => (
    <div>
      {[false, true].map((tight) => (
        <Section
          key={String(tight)}
          tight={tight}
          aria-label={tight ? 'Tight section' : 'Default section'}
          style={{ outline: '1px dashed var(--x-color-accent-edge)' }}
        >
          <Container>
            <Row
              label={tight ? 'Tight' : 'Default'}
              stack
            >
              <p style={{ background: 'var(--x-color-accent-wash)' }}>
                The dashed outline is the section; the space around this line is its padding.
              </p>
            </Row>
          </Container>
        </Section>
      ))}
    </div>
  ),
}
