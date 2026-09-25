import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumbs } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

const meta = {
  title: 'Breadcrumbs',
  component: Breadcrumbs,
  args: {
    label: 'Breadcrumb',
    items: [{ label: 'Home', href: '#' }, { label: 'Blog', href: '#blog' }, { label: 'Typed ESI client' }],
  },
  argTypes: {
    label: { control: 'text' },
    items: { control: 'object' },
  },
} satisfies Meta<typeof Breadcrumbs>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Breadcrumbs' }

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row label="Two levels">
        <Breadcrumbs
          label="Breadcrumb, two levels"
          items={[{ label: 'Home', href: '#' }, { label: 'Tools' }]}
        />
      </Row>
      <Row label="Three levels">
        <Breadcrumbs
          label="Breadcrumb, three levels"
          items={[{ label: 'Home', href: '#' }, { label: 'Blog', href: '#blog' }, { label: 'Typed ESI client' }]}
        />
      </Row>
      <Row label="Deep, long labels">
        <Breadcrumbs
          label="Breadcrumb, deep"
          items={[
            { label: 'Home', href: '#' },
            { label: 'Tools', href: '#tools' },
            { label: 'Achievements', href: '#achievements' },
            { label: 'Caldari State', href: '#caldari' },
            { label: 'Sovereign Hauler: move 10,000 m3 through low security space' },
          ]}
        />
      </Row>
    </Rows>
  ),
}

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row label="Current page is a link">
        <Breadcrumbs
          label="Breadcrumb, linked current"
          items={[
            { label: 'Home', href: '#' },
            { label: 'Blog', href: '#blog' },
            { label: 'Typed ESI client', href: '#post' },
          ]}
        />
      </Row>
      <Row label="Single item">
        <Breadcrumbs
          label="Breadcrumb, single"
          items={[{ label: 'Home' }]}
        />
      </Row>
    </Rows>
  ),
}
