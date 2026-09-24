import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumbs } from '@xaroth.nl/design/react'

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
