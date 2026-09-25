import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Icon, iconNames, type IconProps } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

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

const sizes = [16, 20, 24, 32] as const

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row
        label={`Every icon at ${sizes.join(', ')} px`}
        stack
      >
        <ul
          className="x-gap-sm"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(13rem, 1fr))',
            padding: 0,
            margin: 0,
            listStyle: 'none',
          }}
        >
          {iconNames.map((name) => (
            <li
              key={name}
              className="x-stack-xs x-p-sm"
              style={{ border: '1px solid var(--x-color-line)' }}
            >
              <span className="x-cluster-md">
                {sizes.map((size) => (
                  <Icon
                    key={size}
                    name={name}
                    size={size}
                  />
                ))}
              </span>
              <span className="x-small x-muted">{name}</span>
            </li>
          ))}
        </ul>
      </Row>
      <Row label="Colour follows the text: body, muted, accent, in a button">
        <Icon
          name="info"
          size={24}
        />
        <span className="x-muted">
          <Icon
            name="clock"
            size={24}
          />
        </span>
        <span style={{ color: 'var(--x-color-accent)' }}>
          <Icon
            name="map-pin"
            size={24}
          />
        </span>
        <Button
          variant="secondary"
          start={<Icon name="download" />}
        >
          Download SDE
        </Button>
      </Row>
      <Row label="Labelled (announced) and decorative">
        <Icon
          name="github"
          size={24}
          label="GitHub"
        />
        <span className="x-cluster-xs">
          <Icon name="mail" />
          <span>xaroth@example.com</span>
        </span>
      </Row>
    </Rows>
  ),
}
