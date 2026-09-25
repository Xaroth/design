import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

const meta = {
  title: 'Tag',
  component: Tag,
  args: { children: 'esi', active: false },
  argTypes: {
    children: { control: 'text' },
    active: { control: 'boolean' },
    href: { control: 'text' },
  },
} satisfies Meta<typeof Tag>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Tag' }

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row label="Static">
        <Tag>esi</Tag>
        <Tag>sde</Tag>
        <Tag>typescript</Tag>
      </Row>
      <Row label="Links">
        <Tag href="#esi">esi</Tag>
        <Tag href="#sde">sde</Tag>
        <Tag href="#market">market</Tag>
      </Row>
    </Rows>
  ),
}

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row label="Active static">
        <Tag active>esi</Tag>
        <Tag>sde</Tag>
      </Row>
      <Row label="Active link">
        <Tag
          href="#esi"
          active
        >
          esi
        </Tag>
        <Tag href="#sde">sde</Tag>
        <Tag href="#market">market</Tag>
      </Row>
    </Rows>
  ),
}
