import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Panel } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

const meta = {
  title: 'Panel',
  component: Panel,
  args: {
    variant: 'raised',
    marks: true,
    padding: 'lg',
    as: 'section',
    'aria-label': 'Open source',
    children: (
      <>
        <p className="x-label">Open source</p>
        <h2 style={{ marginTop: 12 }}>Build your own tool on the same stack</h2>
        <p style={{ marginTop: 12, color: 'var(--x-color-text-muted)' }}>
          The typed ESI client, SDE loaders and this design kit are all public.
        </p>
        <p style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
          <Button href="#">View on GitHub</Button>
          <Button
            href="#"
            variant="tertiary"
          >
            Design kit
          </Button>
        </p>
      </>
    ),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['plain', 'raised', 'accent', 'callout'] },
    marks: { control: 'boolean' },
    padding: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'xl'] },
    // 'li' is left out: it needs a list parent. 'form' needs form content.
    as: { control: 'inline-radio', options: ['div', 'section', 'article', 'aside', 'header', 'footer'] },
    children: { control: false },
  },
} satisfies Meta<typeof Panel>

export default meta

export const Default: StoryObj<typeof meta> = {
  name: 'Panel',
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 720, paddingTop: 16 }}>
        <Story />
      </div>
    ),
  ],
}

const variants = ['plain', 'raised', 'accent', 'callout'] as const
const paddings = ['none', 'sm', 'md', 'lg', 'xl'] as const

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      {[false, true].map((marks) => (
        <Row
          key={String(marks)}
          label={marks ? 'With marks' : 'Without marks'}
          stack
        >
          <div
            className="x-gap-lg"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))', paddingTop: 8 }}
          >
            {variants.map((variant) => (
              <Panel
                key={variant}
                variant={variant}
                marks={marks}
                padding="md"
              >
                <p className="x-label">{variant}</p>
                <p className="x-mt-xs">Typed ESI client, SDE loaders and this kit are public.</p>
                <p className="x-mt-sm">
                  <a href="#github">View on GitHub</a>
                </p>
              </Panel>
            ))}
          </div>
        </Row>
      ))}
      <Row
        label="Padding"
        stack
      >
        <div
          className="x-gap-lg"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))', alignItems: 'start' }}
        >
          {paddings.map((padding) => (
            <Panel
              key={padding}
              variant="raised"
              padding={padding}
            >
              <p className="x-small">padding {padding}</p>
            </Panel>
          ))}
        </div>
      </Row>
      <Row
        label="Callout with actions"
        stack
      >
        <Panel
          variant="callout"
          marks
          as="aside"
          aria-label="Open source"
        >
          <h2>Build your own tool on the same stack</h2>
          <p className="x-mt-sm x-muted">The typed ESI client, SDE loaders and this design kit are all public.</p>
          <div className="x-cluster-sm x-mt-lg">
            <Button href="#">View on GitHub</Button>
            <Button
              href="#"
              variant="tertiary"
            >
              Design kit
            </Button>
          </div>
        </Panel>
      </Row>
    </Rows>
  ),
}
