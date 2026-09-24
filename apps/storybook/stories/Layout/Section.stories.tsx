import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container, Section } from '@xaroth.nl/design/react'

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
