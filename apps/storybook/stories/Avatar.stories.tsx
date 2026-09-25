import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

const photo = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#4f6b7a"/><circle cx="50" cy="40" r="18" fill="#d9c7ad"/><path d="M14 100c4-24 20-34 36-34s32 10 36 34z" fill="#1f2a31"/></svg>',
)}`
const images = { none: undefined, photo }

const meta = {
  title: 'Avatar',
  component: Avatar,
  args: { name: 'Xaroth Brook', size: 'lg' },
  argTypes: {
    name: { control: 'text' },
    initials: { control: 'text' },
    alt: { control: 'text' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
    src: { control: 'inline-radio', options: Object.keys(images), mapping: images },
  },
} satisfies Meta<typeof Avatar>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Avatar' }

const sizes = ['sm', 'md', 'lg', 'xl'] as const

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row label="Initials">
        {sizes.map((size) => (
          <Avatar
            key={size}
            name="Xaroth Brook"
            size={size}
          />
        ))}
      </Row>
      <Row label="Image">
        {sizes.map((size) => (
          <Avatar
            key={size}
            name="Xaroth Brook"
            src={photo}
            size={size}
          />
        ))}
      </Row>
      <Row label="Custom initials, single name, image with alt">
        <Avatar
          name="CCP Games"
          initials="CCP"
        />
        <Avatar name="Aura" />
        <Avatar
          name="Xaroth Brook"
          src={photo}
          alt="Xaroth Brook in the character creator"
        />
      </Row>
    </Rows>
  ),
}
