import { createElement } from 'react'
import { describe, it } from 'vitest'
import { Tabs } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'
import { Tabs as AstroTabs } from '@xaroth.nl/design/astro'

const items = [
  { label: 'Overview', href: '/tool', current: true },
  { label: 'Achievements', href: '/tool/achievements' },
  { label: 'Settings', href: '/tool/settings' },
]

const cases: { name: string; props: Record<string, unknown> }[] = [
  { name: 'links with a current tab', props: { label: 'Tool sections', items } },
  { name: 'no current tab', props: { label: 'Tool sections', items: items.map(({ current: _c, ...i }) => i) } },
  {
    name: 'counts',
    props: {
      label: 'Tool sections',
      items: [
        { ...items[0], count: 7 },
        { ...items[1], count: '12' },
        { ...items[2], count: 0 },
      ],
    },
  },
  { name: 'empty', props: { label: 'Tool sections', items: [] } },
  { name: 'extra class and attrs', props: { label: 'Tool sections', items, class: 'site-tabs', id: 'tabs' } },
  { name: 'user aria-label loses to label', props: { label: 'Tool sections', items, 'aria-label': 'Other' } },
]

describe('Tabs renders the same HTML in Astro and React', () => {
  for (const { name, props } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(AstroTabs, { props }, createElement(Tabs, { ...rest, className } as never))
    })
  }
})
