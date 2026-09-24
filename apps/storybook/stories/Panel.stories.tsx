import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Panel } from '@xaroth.nl/design/react'

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
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 720, paddingTop: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Panel>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Panel' }
