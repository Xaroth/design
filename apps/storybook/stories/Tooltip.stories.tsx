import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Icon, Tooltip } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

const meta = {
  title: 'Tooltip',
  component: Tooltip,
  args: {
    id: 'scopes',
    text: 'Two scopes: achievements and standings.',
    placement: 'top',
    open: true,
    children: (
      <Button
        variant="secondary"
        size="sm"
      >
        Scopes
      </Button>
    ),
  },
  argTypes: {
    text: { control: 'text' },
    placement: { control: 'inline-radio', options: ['top', 'bottom', 'left', 'right'] },
    open: { control: 'boolean' },
    children: { control: false },
  },
} satisfies Meta<typeof Tooltip>

export default meta

export const Default: StoryObj<typeof meta> = {
  name: 'Tooltip',
  decorators: [
    (Story) => (
      <div style={{ padding: '96px 160px' }}>
        <Story />
      </div>
    ),
  ],
}

// One wide cell per tooltip, with room above and below, so open bubbles do not overlap or clip.
const slot = { display: 'grid', gridTemplateColumns: 'repeat(3, 20rem)', justifyItems: 'center', paddingBlock: 72 }
// Side bubbles need the cell's width beside the trigger instead of height.
const sideSlot = (placement: 'left' | 'right') => ({
  ...slot,
  gridTemplateColumns: 'repeat(3, 24rem)',
  justifyItems: placement === 'left' ? 'end' : 'start',
  paddingBlock: 24,
})

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
        <Row
          key={placement}
          label={`Placement ${placement}`}
        >
          <div style={placement === 'left' || placement === 'right' ? sideSlot(placement) : slot}>
            <Tooltip
              id={`scopes-${placement}`}
              text="Two scopes: achievements and standings."
              placement={placement}
              open
            >
              <Button
                variant="secondary"
                size="sm"
              >
                Scopes
              </Button>
            </Tooltip>
            <Tooltip
              id={`copy-${placement}`}
              text="Copy fit"
              placement={placement}
              open
            >
              <Button
                variant="tertiary"
                size="sm"
                aria-label="Copy"
              >
                <Icon name="copy" />
              </Button>
            </Tooltip>
            <Tooltip
              id={`isk-${placement}`}
              text="Average Jita sell price over the last 7 days, updated every 5 minutes from ESI."
              placement={placement}
              open
            >
              <a href="#price">1.2B ISK</a>
            </Tooltip>
          </div>
        </Row>
      ))}
    </Rows>
  ),
}

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row label="Open, closed (hover or focus to show), dismissed with Escape">
        <div style={slot}>
          <Tooltip
            id="state-open"
            text="Shown for docs and previews."
            open
          >
            <Button
              variant="secondary"
              size="sm"
            >
              Open
            </Button>
          </Tooltip>
          <Tooltip
            id="state-closed"
            text="Shown on hover and focus."
          >
            <Button
              variant="secondary"
              size="sm"
            >
              Closed
            </Button>
          </Tooltip>
          <Tooltip
            id="state-dismissed"
            text="Hidden until the pointer leaves."
            open
            className="x-tooltip--dismissed"
          >
            <Button
              variant="secondary"
              size="sm"
            >
              Dismissed
            </Button>
          </Tooltip>
        </div>
      </Row>
      <Row label="Closed, at the end of a scroll container: the bubble never adds overflow and stays in the viewport">
        <div style={{ overflow: 'auto', display: 'flex', justifyContent: 'flex-end', padding: 8 }}>
          <Tooltip
            id="state-edge"
            text="Remove this pilot from the fleet roster and all of their scopes."
          >
            <Button
              variant="secondary"
              size="sm"
            >
              Remove
            </Button>
          </Tooltip>
        </div>
      </Row>
    </Rows>
  ),
}
