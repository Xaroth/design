import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import { Button, Modal } from '@xaroth.nl/design/react'
import { InlineDialogs, matrix, Row, Rows } from './shared.tsx'

const meta = {
  title: 'Modal',
  component: Modal,
  args: {
    open: true,
    size: 'sm',
    dismissible: true,
    'aria-label': 'Fit preview',
    onClose: () => {},
    children: <p>Drake Navy Issue, shield PvE. Escape or a backdrop click closes this.</p>,
  },
  argTypes: {
    open: { control: 'boolean' },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    dismissible: { control: 'boolean' },
    children: { control: false },
    onClose: { control: false },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <>
        <Button
          variant="secondary"
          onClick={() => updateArgs({ open: true })}
        >
          Open modal
        </Button>
        <Modal
          {...args}
          onClose={() => updateArgs({ open: false })}
        />
      </>
    )
  },
} satisfies Meta<typeof Modal>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Modal' }

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row label="Size sm, md">
        <InlineDialogs>
          {(['sm', 'md'] as const).map((size) => (
            <Modal
              key={size}
              open={false}
              onClose={() => {}}
              size={size}
              aria-label={`Size ${size}`}
            >
              <p>Size {size}. Raw surface for custom content.</p>
            </Modal>
          ))}
        </InlineDialogs>
      </Row>
    </Rows>
  ),
}
