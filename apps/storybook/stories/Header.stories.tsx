import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Header } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

const brands = {
  xaroth: (
    <>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <circle
          cx="20"
          cy="20"
          r="18.5"
        />
        <circle
          cx="20"
          cy="20"
          r="11"
        />
        <path
          d="M20 1.5v37M1.5 20h37"
          strokeWidth="0.75"
        />
        <path
          d="M20 12l8 8-8 8-8-8z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
      <span>Xaroth</span>
    </>
  ),
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
  text: <span>Site name</span>,
  none: undefined,
}

const actions = {
  none: undefined,
  'sign in': (
    <Button
      variant="secondary"
      size="sm"
      href="#signin"
    >
      Sign in
    </Button>
  ),
}

const meta = {
  title: 'Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
  args: {
    layout: 'inline',
    sticky: false,
    brand: 'eve-online' as never,
    brandHref: '#',
    actions: 'sign in' as never,
    items: [
      { label: 'Home', href: '#', current: true },
      { label: 'Tools', href: '#tools' },
      { label: 'Blog', href: '#blog' },
      { label: 'About', href: '#about' },
      { label: 'Kit', href: '#kit' },
    ],
    navLabel: 'Main',
    menuLabel: 'Menu',
  },
  argTypes: {
    layout: { control: 'inline-radio', options: ['inline', 'stacked'] },
    brand: { control: 'inline-radio', options: Object.keys(brands), mapping: brands },
    actions: { control: 'inline-radio', options: Object.keys(actions), mapping: actions },
    items: { control: 'object' },
    brandHref: { control: 'text' },
    brandLabel: { control: 'text' },
    navLabel: { control: 'text' },
    menuLabel: { control: 'text' },
  },
} satisfies Meta<typeof Header>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Header' }

const nav = (current?: string) =>
  ['Home', 'Tools', 'Blog', 'About'].map((label) => ({
    label,
    href: label === 'Home' ? '#' : `#${label.toLowerCase()}`,
    current: label === current,
  }))

// Headers stack with a gap so each bar reads as its own example.
export const Variants: StoryObj<typeof meta> = {
  parameters: { ...matrix, layout: 'fullscreen' },
  render: () => (
    <div className="x-py-xl">
      <Rows>
        {(['inline', 'stacked'] as const).flatMap((layout) =>
          (['eve-online', 'xaroth'] as const).map((brand) => (
            <Row
              key={`${layout}-${brand}`}
              label={`${layout}, ${brand} brand`}
              stack
              inset
            >
              <Header
                layout={layout}
                brand={brands[brand]}
                brandHref="#"
                items={nav('Home')}
                actions={actions['sign in']}
                navLabel={`Main, ${layout} ${brand}`}
              />
            </Row>
          )),
        )}
        <Row
          label="Text brand, no link, no actions"
          stack
          inset
        >
          <Header
            brand={brands.text}
            items={nav('Blog')}
            navLabel="Main, text brand"
          />
        </Row>
        <Row
          label="Brand and actions, no nav"
          stack
          inset
        >
          <Header
            brand={brands['eve-online']}
            brandHref="#"
            brandLabel="eve-online.tools home"
            actions={actions['sign in']}
          />
        </Row>
      </Rows>
    </div>
  ),
}

export const States: StoryObj<typeof meta> = {
  parameters: { ...matrix, layout: 'fullscreen' },
  render: () => (
    <div className="x-py-xl">
      <Rows>
        {['Home', 'Blog', 'About', undefined].map((current) => (
          <Row
            key={current ?? 'none'}
            label={current ? `Current: ${current}` : 'No current page'}
            stack
            inset
          >
            <Header
              brand={brands['eve-online']}
              brandHref="#"
              items={nav(current)}
              navLabel={`Main, current ${current ?? 'none'}`}
            />
          </Row>
        ))}
      </Rows>
    </div>
  ),
}
