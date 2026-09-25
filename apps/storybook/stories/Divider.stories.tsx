import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

const meta = {
  title: 'Divider',
  component: Divider,
  args: { variant: 'ornament', children: 'Or continue with' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['plain', 'ornament', 'label'] },
    children: { control: 'text', if: { arg: 'variant', eq: 'label' } },
  },
} satisfies Meta<typeof Divider>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Divider' }

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows width={720}>
      <Row
        label="Plain"
        stack
      >
        <Divider variant="plain" />
      </Row>
      <Row
        label="Ornament"
        stack
      >
        <Divider variant="ornament" />
      </Row>
      <Row
        label="Label"
        stack
      >
        <Divider variant="label">Or continue with</Divider>
        <Divider variant="label">Older posts</Divider>
      </Row>
    </Rows>
  ),
}
