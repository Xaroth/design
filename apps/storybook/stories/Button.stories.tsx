import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

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
    type: { control: 'inline-radio', options: ['button', 'submit', 'reset'] },
  },
} satisfies Meta<typeof Button>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Button' }

const variants = ['primary', 'secondary', 'tertiary'] as const
const tones = ['default', 'danger', 'warning', 'success'] as const
const toneLabels = { default: 'Launch', danger: 'Delete fit', warning: 'Overwrite', success: 'Save fit' }

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      {variants.map((variant) => (
        <Row
          key={variant}
          label={variant}
        >
          {tones.map((tone) => (
            <Button
              key={tone}
              variant={variant}
              tone={tone}
            >
              {toneLabels[tone]}
            </Button>
          ))}
        </Row>
      ))}
      {variants.map((variant) => (
        <Row
          key={`${variant}-sizes`}
          label={`${variant} sizes`}
        >
          <Button
            variant={variant}
            size="sm"
          >
            Small
          </Button>
          <Button variant={variant}>Medium</Button>
          <Button
            variant={variant}
            size="lg"
          >
            Large
          </Button>
        </Row>
      ))}
      <Row label="Icons">
        <Button start={star}>Watchlist</Button>
        <Button
          variant="secondary"
          end={arrow}
        >
          Browse tools
        </Button>
        <Button
          variant="tertiary"
          start={star}
          end={arrow}
        >
          Featured
        </Button>
      </Row>
      <Row label="Link">
        <Button href="#tools">Browse tools</Button>
        <Button
          href="#blog"
          variant="secondary"
        >
          Read the blog
        </Button>
        <Button
          href="#about"
          variant="tertiary"
        >
          About
        </Button>
      </Row>
      <div style={{ maxWidth: 360 }}>
        <Row
          label="Full width"
          stack
        >
          <Button fullWidth>Sign in with EVE Online</Button>
          <Button
            fullWidth
            variant="secondary"
          >
            Continue without signing in
          </Button>
        </Row>
      </div>
    </Rows>
  ),
}

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      {variants.map((variant) => (
        <Row
          key={variant}
          label={variant}
        >
          <Button variant={variant}>Enabled</Button>
          <Button
            variant={variant}
            disabled
          >
            Disabled
          </Button>
          <Button
            variant={variant}
            loading
          >
            Fetching
          </Button>
          <Button
            variant={variant}
            href="#tools"
            disabled
          >
            Disabled link
          </Button>
        </Row>
      ))}
      {tones
        .filter((tone) => tone !== 'default')
        .map((tone) => (
          <Row
            key={tone}
            label={`${tone} disabled and loading`}
          >
            {variants.map((variant) => (
              <Button
                key={variant}
                variant={variant}
                tone={tone}
                disabled
              >
                {toneLabels[tone]}
              </Button>
            ))}
            <Button
              tone={tone}
              loading
            >
              {toneLabels[tone]}
            </Button>
          </Row>
        ))}
    </Rows>
  ),
}
