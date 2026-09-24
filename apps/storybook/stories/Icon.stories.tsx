import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon, iconNames, type IconProps } from '@xaroth.nl/design/react'

function IconGallery(props: IconProps) {
  return (
    <div style={{ display: 'grid', gap: 32 }}>
      <p style={{ display: 'flex', gap: 16, alignItems: 'center', color: 'var(--x-color-accent)' }}>
        <Icon {...props} />
        <span style={{ fontFamily: 'var(--x-font-mono)' }}>{props.name}</span>
      </p>
      <ul
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: 8,
          padding: 0,
          margin: 0,
          listStyle: 'none',
        }}
      >
        {iconNames.map((name) => (
          <li
            key={name}
            style={{
              display: 'grid',
              justifyItems: 'center',
              gap: 8,
              padding: '16px 8px',
              border: '1px solid var(--x-color-line)',
            }}
          >
            <Icon
              name={name}
              size={24}
            />
            <span style={{ fontFamily: 'var(--x-font-mono)', fontSize: 13, color: 'var(--x-color-text-muted)' }}>
              {name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const meta = {
  title: 'Icon',
  component: Icon,
  render: (args) => <IconGallery {...args} />,
  args: { name: 'arrow-right', size: 32 },
  argTypes: {
    name: { control: 'select', options: iconNames },
    size: { control: 'text' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Icon>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Icon' }
