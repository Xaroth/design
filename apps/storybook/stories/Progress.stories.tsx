import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress, type ProgressProps } from '@xaroth.nl/design/react'

// `indeterminate` is a story-only switch: the component is indeterminate when `value` is undefined.
type Args = ProgressProps & { indeterminate?: boolean }

const meta = {
  title: 'Progress',
  component: Progress,
  args: {
    value: 72,
    max: 100,
    label: 'Upload progress',
    tone: 'default',
    size: 'md',
    showValue: true,
    indeterminate: false,
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: { type: 'number', min: 1 } },
    label: { control: 'text' },
    tone: { control: 'inline-radio', options: ['default', 'info', 'success', 'warning', 'danger'] },
    startTone: {
      control: 'select',
      options: ['none', 'default', 'info', 'success', 'warning', 'danger'],
      mapping: { none: undefined },
      description: 'Gradient start. none keeps a solid fill.',
    },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    showValue: { control: 'boolean' },
    indeterminate: { control: 'boolean', description: 'Story only: renders with value undefined.' },
  },
  render: ({ indeterminate, value, ...args }) => (
    <div style={{ maxWidth: '28rem' }}>
      <Progress
        {...(args as ProgressProps)}
        value={indeterminate ? undefined : value}
      />
    </div>
  ),
} satisfies Meta<Args>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Progress' }
