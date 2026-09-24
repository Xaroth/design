import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@xaroth.nl/design/react'

const arrow = (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
)

const star = (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M8 1l1.8 4.6L14.5 6l-3.6 3.1L12 14 8 11.3 4 14l1.1-4.9L1.5 6l4.7-.4z" />
  </svg>
)

const icons = { none: undefined, arrow, star }

const meta = {
  title: 'Button',
  component: Button,
  args: {
    children: 'Launch',
    variant: 'primary',
    tone: 'default',
    size: 'md',
    fullWidth: false,
    loading: false,
    disabled: false,
  },
  argTypes: {
    children: { control: 'text' },
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'tertiary'] },
    tone: { control: 'inline-radio', options: ['default', 'danger', 'warning', 'success'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    start: { control: 'inline-radio', options: Object.keys(icons), mapping: icons },
    end: { control: 'inline-radio', options: Object.keys(icons), mapping: icons },
    href: { control: 'text' },
  },
} satisfies Meta<typeof Button>

export default meta

// Named like the component so Storybook shows it as a single "Button" entry, no folder.
export const Default: StoryObj<typeof meta> = { name: 'Button' }
