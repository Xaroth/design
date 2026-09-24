import { createElement } from 'react'
import { describe, it } from 'vitest'
import AstroTimeline from '@xaroth.nl/design/astro/timeline'
import { Timeline, type TimelineEntry } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'

const items: TimelineEntry[] = [
  { date: '2026', title: 'eve-online.tools', text: 'Rebuilt the tool collection.', current: true },
  { date: '2024-03', label: 'Mar 2024', title: 'Fanfest schedule', text: 'Shipped the schedule site.' },
  { label: '2019', title: 'Joined CCP Games' },
  { date: '2006-02-02', title: 'Undocked', text: '' },
]

const cases: { name: string; props: Record<string, unknown> }[] = [
  { name: 'entries with and without datetime, text and current', props: { items } },
  { name: 'empty', props: { items: [] } },
  { name: 'single current entry', props: { items: [{ label: 'Now', title: 'Building', current: true }] } },
  { name: 'heading level 2', props: { items, headingLevel: 2 } },
  { name: 'heading level 4', props: { items: items.slice(0, 1), headingLevel: 4 } },
  { name: 'extra class and attrs', props: { items, class: 'site-tl', 'aria-label': 'Career', id: 'career' } },
]

describe('Timeline renders the same HTML in Astro and React', () => {
  for (const { name, props } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(AstroTimeline, { props }, createElement(Timeline, { ...rest, className } as never))
    })
  }
})
