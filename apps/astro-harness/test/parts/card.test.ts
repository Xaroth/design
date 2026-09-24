import { createElement, type ReactNode } from 'react'
import { describe, it } from 'vitest'
import AstroCard from '@xaroth.nl/design/astro/Card.astro'
import { Card } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'

type Slot = 'title' | 'status' | 'tags' | 'footStart' | 'footEnd'

// Astro takes named slots as HTML strings, React the same content as ReactNode props.
const cases: {
  name: string
  props: Record<string, unknown>
  body?: string
  slots?: Partial<Record<Slot, [string, ReactNode]>>
}[] = [
  { name: 'body only', props: {}, body: 'Plain text.' },
  { name: 'title prop', props: { title: 'Ship tree' }, body: 'Browse ships.' },
  {
    name: 'title slot with markup',
    props: {},
    slots: { title: ['<em>Ship</em> tree', [createElement('em', { key: 1 }, 'Ship'), ' tree']] },
  },
  { name: 'index only', props: { index: 3, title: 'Resfile' } },
  { name: 'index zero', props: { index: 0, title: 'Zero' } },
  { name: 'status only', props: { title: 'Resfile' }, slots: { status: ['Beta', 'Beta'] } },
  {
    name: 'full link card',
    props: { href: '/tools/fit', index: 1, title: 'Fit checker' },
    body: 'Paste a fit.',
    slots: {
      status: ['Stable', 'Stable'],
      tags: ['esi sde', 'esi sde'],
      footStart: ['No sign in', 'No sign in'],
      footEnd: ['Launch →', 'Launch →'],
    },
  },
  { name: 'foot end only', props: { title: 'Meta' }, slots: { footEnd: ['1 scope', '1 scope'] } },
  { name: 'foot start only', props: { title: 'Tags' }, slots: { footStart: ['esi', 'esi'] } },
  { name: 'featured', props: { featured: true, title: 'Planner' }, body: 'Text.' },
  { name: 'featured link', props: { featured: true, href: '/p', title: 'Planner' } },
  { name: 'as li, heading level 2', props: { as: 'li', headingLevel: 2, title: 'Item' } },
  { name: 'as div, heading level 4', props: { as: 'div', headingLevel: 4, title: 'Item' } },
  { name: 'extra class and attrs', props: { class: 'site-card', id: 'c1', 'aria-label': 'Tool' }, body: 'x' },
]

describe('Card renders the same HTML in Astro and React', () => {
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
      await expectSameHtml(AstroCard, { props, slots: astroSlots }, createElement(Card, reactProps as never, body))
    })
  }
})
