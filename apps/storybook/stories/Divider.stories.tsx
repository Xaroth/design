import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider } from '@xaroth.nl/design/react'

const meta = {
  title: 'Divider',
  component: Divider,
  args: { variant: 'ornament', children: 'Or continue with' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['plain', 'ornament', 'label'] },
    children: { control: 'text', if: { arg: 'variant', eq: 'label' } },
  },
} satisfies Meta<typeof Divider>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Divider' }
