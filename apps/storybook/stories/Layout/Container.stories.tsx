import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container } from '@xaroth.nl/design/react'

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
