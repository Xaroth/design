import { createElement, type ReactNode } from 'react'
import { describe, it } from 'vitest'
import AstroAlert from '@xaroth.nl/design/astro/alert'
import { Alert } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'

type Slot = 'title' | 'actions'

// Astro takes named slots as HTML strings, React the same content as ReactNode props.
const cases: {
  name: string
  props: Record<string, unknown>
  body?: string
  slots?: Partial<Record<Slot, [string, ReactNode]>>
}[] = [
  { name: 'body only', props: {}, body: 'ESI data is cached for 30 minutes.' },
  { name: 'info with title', props: { tone: 'info', title: 'Cached data' }, body: 'Refreshes hourly.' },
  { name: 'success', props: { tone: 'success', title: 'Linked' }, body: 'Character linked.' },
  { name: 'warning', props: { tone: 'warning', title: 'Slow' }, body: 'Error budget low.' },
  { name: 'danger', props: { tone: 'danger', title: 'Expired' }, body: 'Sign in again.' },
  { name: 'title only', props: { tone: 'warning', title: 'Downtime at 11:00' } },
  {
    name: 'title slot with markup',
    props: { tone: 'info' },
    slots: { title: ['<em>Sample</em> data', [createElement('em', { key: 1 }, 'Sample'), ' data']] },
    body: 'Sign in to load yours.',
  },
  { name: 'framed', props: { framed: true, title: 'Cached data' }, body: 'Refreshes hourly.' },
  { name: 'framed danger', props: { tone: 'danger', framed: true, title: 'Offline' }, body: 'ESI returned 503.' },
  { name: 'urgent', props: { tone: 'danger', urgent: true, title: 'Token expired' }, body: 'Sign in again.' },
  { name: 'urgent false', props: { tone: 'danger', urgent: false }, body: 'Static note.' },
  {
    name: 'actions',
    props: { tone: 'danger', title: 'Token expired' },
    body: 'Sign in again.',
    slots: { actions: ['<a href="/login">Sign in</a>', createElement('a', { href: '/login' }, 'Sign in')] },
  },
  { name: 'actions without body', props: { title: 'New' }, slots: { actions: ['Undo', 'Undo'] } },
  { name: 'role override', props: { role: 'note', title: 'Note' }, body: 'Plain aside.' },
  { name: 'extra class and attrs', props: { class: 'site-alert', id: 'a1', 'aria-label': 'Cache' }, body: 'x' },
]

describe('Alert renders the same HTML in Astro and React', () => {
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
      await expectSameHtml(AstroAlert, { props, slots: astroSlots }, createElement(Alert, reactProps as never, body))
    })
  }
})
