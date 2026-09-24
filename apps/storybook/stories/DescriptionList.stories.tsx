import type { Meta, StoryObj } from '@storybook/react-vite'
import { DescriptionList } from '@xaroth.nl/design/react'

const meta = {
  title: 'DescriptionList',
  component: DescriptionList,
  args: {
    layout: 'inline',
    dividers: true,
    items: [
      { term: 'Published', value: <time dateTime="2026-03-14">14 Mar 2026</time> },
      { term: 'Read time', value: '6 min' },
      { term: 'Author', value: 'Xaroth Brook' },
      { term: 'GitHub', value: <a href="https://github.com/xaroth">github.com/xaroth</a> },
    ],
  },
  argTypes: {
    layout: { control: 'inline-radio', options: ['stacked', 'inline', 'columns'] },
    dividers: { control: 'boolean' },
    items: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DescriptionList>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'DescriptionList' }
