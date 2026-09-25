import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

const meta = {
  title: 'Tabs',
  component: Tabs,
  args: {
    label: 'Tool sections',
    items: [
      { label: 'Overview', href: '#', current: true },
      { label: 'Achievements', href: '#achievements', count: 7 },
      { label: 'Settings', href: '#settings' },
    ],
  },
  argTypes: {
    label: { control: 'text' },
    items: { control: 'object' },
  },
} satisfies Meta<typeof Tabs>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Tabs' }

const sections = ['Overview', 'Achievements', 'Standings', 'Assets', 'Settings']
const counts: Record<string, number | string> = { Achievements: 7, Standings: 42, Assets: '1.2k' }

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      {[2, 3, 5].map((n) => (
        <Row
          key={n}
          label={`${n} tabs`}
          stack
        >
          <Tabs
            label={`Tool sections, ${n} tabs`}
            items={sections.slice(0, n).map((label, i) => ({ label, href: `#${label}`, current: i === 0 }))}
          />
        </Row>
      ))}
      <Row
        label="With counts"
        stack
      >
        <Tabs
          label="Tool sections, counts"
          items={sections.map((label, i) => ({ label, href: `#${label}`, current: i === 1, count: counts[label] }))}
        />
      </Row>
    </Rows>
  ),
}

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      {sections.slice(0, 3).map((current, i) => (
        <Row
          key={current}
          label={`Current: ${['first', 'middle', 'last'][i]}`}
          stack
        >
          <Tabs
            label={`Tool sections, current ${current}`}
            items={sections.slice(0, 3).map((label) => ({
              label,
              href: `#${label}`,
              current: label === sections.slice(0, 3)[i],
              count: counts[label],
            }))}
          />
        </Row>
      ))}
      <Row
        label="No current tab"
        stack
      >
        <Tabs
          label="Tool sections, none current"
          items={sections.slice(0, 3).map((label) => ({ label, href: `#${label}` }))}
        />
      </Row>
    </Rows>
  ),
}
