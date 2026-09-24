import { createElement } from 'react'
import { describe, it } from 'vitest'
import { Breadcrumbs } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'
import { Breadcrumbs as AstroBreadcrumbs } from '@xaroth.nl/design/astro'

const cases: { name: string; props: Record<string, unknown> }[] = [
  {
    name: 'trail ending in the current page',
    props: { items: [{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Typed ESI client' }] },
  },
  {
    name: 'last item with href is still current',
    props: {
      items: [
        { label: 'Home', href: '/' },
        { label: 'Tools', href: '/tools' },
      ],
    },
  },
  {
    name: 'middle item without href',
    props: { items: [{ label: 'Home', href: '/' }, { label: 'Archive' }, { label: '2026' }] },
  },
  { name: 'single item', props: { items: [{ label: 'Home', href: '/' }] } },
  { name: 'empty', props: { items: [] } },
  {
    name: 'custom label, class and attrs',
    props: {
      items: [{ label: 'Home', href: '/' }, { label: 'Kit' }],
      label: 'You are here',
      class: 'site-crumbs',
      id: 'crumbs',
    },
  },
]

describe('Breadcrumbs renders the same HTML in Astro and React', () => {
  for (const { name, props } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(AstroBreadcrumbs, { props }, createElement(Breadcrumbs, { ...rest, className } as never))
    })
  }
})
