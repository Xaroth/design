import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input, type InputType } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'

const search = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
  >
    <circle
      cx="11"
      cy="11"
      r="7"
    />
    <path d="M20 20l-4-4" />
  </svg>
)

const icons = { none: undefined, search }

const meta = {
  title: 'Form/Input',
  component: Input,
  args: {
    'aria-label': 'Character name',
    type: 'text',
    placeholder: 'Character name',
    disabled: false,
    readOnly: false,
    'aria-invalid': false,
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['text', 'email', 'search', 'number', 'password', 'url', 'tel'] },
    start: { control: 'inline-radio', options: Object.keys(icons), mapping: icons },
    'aria-invalid': { control: 'boolean' },
  },
} satisfies Meta<typeof Input>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Input' }

const types: [InputType, string, string][] = [
  ['text', 'Character name', 'Xaroth Brook'],
  ['email', 'Email', 'capsuleer@example.com'],
  ['search', 'Search achievements', 'Wardec'],
  ['number', 'Quantity', '250'],
  ['password', 'Password', 'hunter2'],
  ['url', 'Website', 'https://xaroth.nl'],
  ['tel', 'Phone', '+354 555 0100'],
]

const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))' }

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row
        label="Types, with value"
        stack
      >
        <div
          className="x-gap-md"
          style={grid}
        >
          {types.map(([type, label, value]) => (
            <Input
              key={type}
              type={type}
              aria-label={label}
              defaultValue={value}
            />
          ))}
        </div>
      </Row>
      <Row
        label="Placeholder, start icon"
        stack
      >
        <div
          className="x-gap-md"
          style={grid}
        >
          <Input
            aria-label="Character name, empty"
            placeholder="Character name"
          />
          <Input
            type="search"
            aria-label="Search, with icon"
            placeholder="Achievement name"
            start={search}
          />
          <Input
            type="search"
            aria-label="Search, with icon and value"
            defaultValue="Sovereign Hauler"
            start={search}
          />
        </div>
      </Row>
    </Rows>
  ),
}

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <div
      className="x-gap-xl"
      style={grid}
    >
      <Row
        label="Disabled"
        stack
      >
        <Input
          aria-label="Disabled, empty"
          placeholder="Character name"
          disabled
        />
        <Input
          aria-label="Disabled, value"
          defaultValue="Xaroth Brook"
          disabled
        />
      </Row>
      <Row
        label="Read-only"
        stack
      >
        <Input
          aria-label="Character id"
          defaultValue="2112625428"
          readOnly
        />
        <Input
          aria-label="Read-only, icon"
          defaultValue="Jita IV - Moon 4"
          start={search}
          readOnly
        />
      </Row>
      <Row
        label="Invalid"
        stack
      >
        <Input
          aria-label="Invalid, empty"
          placeholder="Character name"
          aria-invalid
        />
        <Input
          type="email"
          aria-label="Invalid, value"
          defaultValue="capsuleer@"
          aria-invalid
        />
      </Row>
      <Row
        label="Required"
        stack
      >
        <Input
          aria-label="Required"
          placeholder="Character name"
          required
        />
      </Row>
    </div>
  ),
}
