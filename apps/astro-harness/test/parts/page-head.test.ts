import { createElement, type ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, it } from 'vitest'
import { Breadcrumbs, PageHead } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'
import { PageHead as AstroPageHead } from '@xaroth.nl/design/astro'

type Slot = 'title' | 'lead' | 'breadcrumbs' | 'meta' | 'actions'

const crumbs = createElement(Breadcrumbs, {
  items: [{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Typed ESI client' }],
})
const breadcrumbs: [string, ReactNode] = [renderToStaticMarkup(crumbs), crumbs]
const meta: [string, ReactNode] = [
  '<time datetime="2026-09-02">2 Sep 2026</time><span>9 min read</span>',
  [
    createElement('time', { key: 1, dateTime: '2026-09-02' }, '2 Sep 2026'),
    createElement('span', { key: 2 }, '9 min read'),
  ],
]
const actions: [string, ReactNode] = [
  '<a href="/tools">Browse</a><button type="button">Share</button>',
  [
    createElement('a', { key: 1, href: '/tools' }, 'Browse'),
    createElement('button', { key: 2, type: 'button' }, 'Share'),
  ],
]

// Astro takes named slots as HTML strings, React the same content as ReactNode props.
const cases: { name: string; props: Record<string, unknown>; slots?: Partial<Record<Slot, [string, ReactNode]>> }[] = [
  { name: 'title only', props: { title: 'Typed ESI client' } },
  { name: 'eyebrow', props: { title: 'Typed ESI client', eyebrow: 'Logbook' } },
  { name: 'lead', props: { title: 'Typed ESI client', lead: 'Generating a client from the OpenAPI spec.' } },
  { name: 'empty eyebrow and lead render nothing', props: { title: 'Tools', eyebrow: '', lead: '' } },
  { name: 'breadcrumbs', props: { title: 'Typed ESI client' }, slots: { breadcrumbs } },
  { name: 'meta', props: { title: 'Typed ESI client' }, slots: { meta } },
  { name: 'actions', props: { title: 'Tools' }, slots: { actions } },
  {
    name: 'title and lead slots with markup',
    props: {},
    slots: {
      title: ['Typed <em>ESI</em> client', ['Typed ', createElement('em', { key: 1 }, 'ESI'), ' client']],
      lead: ['See <a href="/esi">ESI</a>.', ['See ', createElement('a', { key: 1, href: '/esi' }, 'ESI'), '.']],
    },
  },
  { name: 'level 2', props: { title: 'Tools', level: 2 } },
  { name: 'level 1 explicit', props: { title: 'Tools', level: 1 } },
  { name: 'title id', props: { title: 'Tools', titleId: 'page-title' } },
  { name: 'align center', props: { title: 'Tools', align: 'center', eyebrow: 'Index' } },
  { name: 'align start is the default', props: { title: 'Tools', align: 'start' } },
  {
    name: 'full',
    props: { title: 'Typed ESI client', eyebrow: 'Logbook', lead: 'From spec to client.', titleId: 't' },
    slots: { breadcrumbs, meta, actions },
  },
  {
    name: 'full centered at level 2',
    props: { title: 'Tools', eyebrow: 'Index', lead: 'Six tools.', align: 'center', level: 2 },
    slots: { breadcrumbs, meta, actions },
  },
  { name: 'extra class and attrs', props: { title: 'Tools', class: 'site-head', id: 'top', 'data-x': '1' } },
]

describe('PageHead renders the same HTML in Astro and React', () => {
  for (const { name, props, slots = {} } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      const astroSlots: Record<string, string> = {}
      const reactProps: Record<string, unknown> = { ...rest, className }
      for (const [slot, [html, node]] of Object.entries(slots) as [Slot, [string, ReactNode]][]) {
        astroSlots[slot] = html
        reactProps[slot] = node
      }
      await expectSameHtml(AstroPageHead, { props, slots: astroSlots }, createElement(PageHead, reactProps as never))
    })
  }
})
