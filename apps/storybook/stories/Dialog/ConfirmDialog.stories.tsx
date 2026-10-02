import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import { Button, ConfirmDialog } from '@xaroth.nl/design/react'
import { InlineDialogs, matrix, Row, Rows } from '../shared.tsx'

const meta = {
  title: 'Dialog/ConfirmDialog',
  component: ConfirmDialog,
  args: {
    open: true,
    title: 'Remove character',
    children: 'Remove Xaroth Brook and its stored token? Its synced data is deleted too.',
    tone: 'danger',
    confirmLabel: 'Remove',
    cancelLabel: 'Cancel',
    pending: false,
    size: 'sm',
    onClose: () => {},
    onConfirm: () => {},
  },
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    children: { control: 'text' },
    tone: { control: 'inline-radio', options: ['default', 'danger'] },
    confirmLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    pending: { control: 'boolean' },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    onClose: { control: false },
    onConfirm: { control: false },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <>
        <Button
          variant="secondary"
          tone={args.tone}
          onClick={() => updateArgs({ open: true, pending: false })}
        >
          {args.confirmLabel}
        </Button>
        <ConfirmDialog
          {...args}
          onClose={() => updateArgs({ open: false })}
          onConfirm={() => {
            updateArgs({ pending: true })
            setTimeout(() => updateArgs({ open: false, pending: false }), 1500)
          }}
        />
      </>
    )
  },
} satisfies Meta<typeof ConfirmDialog>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'ConfirmDialog' }

const closed = { open: false, onClose: () => {}, onConfirm: () => {} }

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row label="Tone default, danger">
        <InlineDialogs>
          <ConfirmDialog
            {...closed}
            id="variant-default"
            title="Sync standings"
            confirmLabel="Sync now"
          >
            Fetch standings for all linked characters now?
          </ConfirmDialog>
          <ConfirmDialog
            {...closed}
            id="variant-danger"
            tone="danger"
            title="Remove character"
            confirmLabel="Remove"
          >
            Remove Xaroth Brook and its stored token? Its synced data is deleted too.
          </ConfirmDialog>
        </InlineDialogs>
      </Row>
    </Rows>
  ),
}

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row label="Pending: buttons disabled, dismissal blocked, progress on confirm">
        <InlineDialogs>
          <ConfirmDialog
            {...closed}
            id="state-pending"
            tone="danger"
            title="Remove character"
            confirmLabel="Remove"
            pending
          >
            Removing Xaroth Brook.
          </ConfirmDialog>
        </InlineDialogs>
      </Row>
    </Rows>
  ),
}
