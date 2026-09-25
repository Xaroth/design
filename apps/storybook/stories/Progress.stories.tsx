import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress, type ProgressProps } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

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

const tones = ['default', 'info', 'success', 'warning', 'danger'] as const
const toneLabels = {
  default: 'Skill queue',
  info: 'SDE download',
  success: 'Achievements done',
  warning: 'Error budget used',
  danger: 'Cargo hold',
}

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows width="28rem">
      {(['md', 'sm'] as const).map((size) => (
        <Row
          key={size}
          label={`Tones, ${size}`}
          stack
        >
          {tones.map((tone, i) => (
            <Progress
              key={tone}
              tone={tone}
              size={size}
              value={[64, 38, 100, 81, 97][i]}
              label={`${toneLabels[tone]}, ${size}`}
              showValue
            />
          ))}
        </Row>
      ))}
      <Row
        label="Gradient start tone"
        stack
      >
        <Progress
          value={72}
          startTone="info"
          tone="success"
          label="Standings to next tier"
          showValue
        />
        <Progress
          value={88}
          startTone="warning"
          tone="danger"
          label="Structure damage"
          showValue
        />
      </Row>
      <Row
        label="Custom max, no value text"
        stack
      >
        <Progress
          value={3}
          max={7}
          label="Achievements, 3 of 7"
          showValue
        />
        <Progress
          value={40}
          label="Upload progress without value"
        />
      </Row>
    </Rows>
  ),
}

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows width="28rem">
      <Row
        label="Empty, full"
        stack
      >
        <Progress
          value={0}
          label="Not started"
          showValue
        />
        <Progress
          value={100}
          tone="success"
          label="Complete"
          showValue
        />
      </Row>
      <Row
        label="Indeterminate"
        stack
      >
        {(['md', 'sm'] as const).map((size) => (
          <Progress
            key={size}
            size={size}
            label={`Fetching ESI, ${size}`}
          />
        ))}
      </Row>
    </Rows>
  ),
}
