import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '@xaroth.nl/design/react'

const search = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
  >
    <circle
      cx="11"
      cy="11"
      r="7"
    />
    <path d="M20 20l-4-4" />
  </svg>
)

const icons = { none: undefined, search }

const meta = {
  title: 'Form/Input',
  component: Input,
  args: {
    'aria-label': 'Character name',
    type: 'text',
    placeholder: 'Character name',
    disabled: false,
    readOnly: false,
    'aria-invalid': false,
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['text', 'email', 'search', 'number', 'password', 'url', 'tel'] },
    start: { control: 'inline-radio', options: Object.keys(icons), mapping: icons },
    'aria-invalid': { control: 'boolean' },
  },
} satisfies Meta<typeof Input>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Input' }
