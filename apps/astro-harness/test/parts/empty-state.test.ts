import { createElement, type ReactNode } from 'react'
import { describe, it } from 'vitest'
import { EmptyState } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'
import { EmptyState as AstroEmptyState } from '@xaroth.nl/design/astro'

type Slot = 'title' | 'icon' | 'actions'

const icon: [string, ReactNode] = [
  '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle></svg>',
  createElement('svg', { viewBox: '0 0 24 24' }, createElement('circle', { cx: '12', cy: '12', r: '3' })),
]

// Astro takes named slots as HTML strings, React the same content as ReactNode props.
const cases: {
  name: string
  props: Record<string, unknown>
  body?: string
  slots?: Partial<Record<Slot, [string, ReactNode]>>
}[] = [
  { name: 'empty', props: {} },
  { name: 'title only', props: { title: 'Nothing matches' } },
  { name: 'text only', props: {}, body: 'No results.' },
  { name: 'title and text', props: { title: 'Nothing matches' }, body: 'Clear the search.' },
  {
    name: 'title slot with markup',
    props: {},
    slots: { title: ['No <em>results</em>', ['No ', createElement('em', { key: 1 }, 'results')]] },
  },
  {
    name: 'full',
    props: { title: 'Nothing matches' },
    body: 'Clear the search or pick another faction.',
    slots: {
      icon,
      actions: [
        '<button type="button">Clear filters</button>',
        createElement('button', { type: 'button' }, 'Clear filters'),
      ],
    },
  },
  { name: 'icon only', props: {}, slots: { icon } },
  { name: 'actions only', props: {}, slots: { actions: ['Reset', 'Reset'] } },
  { name: 'heading level 2', props: { title: 'Empty', headingLevel: 2 } },
  { name: 'heading level 6', props: { title: 'Empty', headingLevel: 6 } },
  { name: 'extra class and attrs', props: { class: 'site-empty', id: 'e1', 'aria-live': 'polite' }, body: 'x' },
]

describe('EmptyState renders the same HTML in Astro and React', () => {
  for (const { name, props, body, slots = {} } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      const astroSlots: Record<string, string> = {}
      const reactProps: Record<string, unknown> = { ...rest, className }
      if (body) {
        astroSlots.default = body
      }
      for (const [slot, [html, node]] of Object.entries(slots) as [Slot, [string, ReactNode]][]) {
        astroSlots[slot] = html
        reactProps[slot] = node
      }
      await expectSameHtml(
        AstroEmptyState,
        { props, slots: astroSlots },
        createElement(EmptyState, reactProps as never, body),
      )
    })
  }
})
