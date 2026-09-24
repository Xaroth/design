import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from '@xaroth.nl/design/react'

const meta = {
  title: 'Tag',
  component: Tag,
  args: { children: 'esi', active: false },
  argTypes: {
    children: { control: 'text' },
    active: { control: 'boolean' },
    href: { control: 'text' },
  },
} satisfies Meta<typeof Tag>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Tag' }
