import type { Meta, StoryObj } from '@storybook/react-vite'
import { Footer } from '@xaroth.nl/design/react'

const brands = {
  'eve-online': (
    <>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M16 2 28 9v14l-12 7-12-7V9z" />
        <path
          d="M16 8 23 12v8l-7 4-7-4v-8z"
          strokeOpacity="0.45"
        />
        <path
          d="M11 17.5 16 13l5 4.5"
          strokeWidth="2"
        />
      </svg>
      <span>eve-online.tools</span>
    </>
  ),
  text: <span>Xaroth</span>,
  none: undefined,
}

const meta = {
  title: 'Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
  args: {
    layout: 'columns',
    brand: 'eve-online' as never,
    brandHref: '#',
    note: 'EVE Online and the EVE logo are the registered trademarks of CCP hf. This site is not affiliated with CCP.',
    groups: [
      {
        title: 'Navigate',
        links: [
          { label: 'Home', href: '#' },
          { label: 'Tools', href: '#tools' },
          { label: 'Blog', href: '#blog' },
          { label: 'About', href: '#about' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'GitHub', href: '#github' },
          { label: 'ESI docs', href: '#esi' },
          { label: 'Status', href: '#status' },
          { label: 'Privacy', href: '#privacy' },
        ],
      },
    ],
    navLabel: 'Footer',
  },
  argTypes: {
    layout: { control: 'inline-radio', options: ['columns', 'row'] },
    brand: { control: 'inline-radio', options: Object.keys(brands), mapping: brands },
    note: { control: 'text' },
    groups: { control: 'object' },
    brandHref: { control: 'text' },
    brandLabel: { control: 'text' },
    navLabel: { control: 'text' },
  },
} satisfies Meta<typeof Footer>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Footer' }
