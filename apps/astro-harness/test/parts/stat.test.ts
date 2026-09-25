import { createElement, type ReactNode } from 'react'
import { describe, it } from 'vitest'
import { Stat, StatGroup } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'
import { Stat as AstroStat, StatGroup as AstroStatGroup } from '@xaroth.nl/design/astro'

type Slot = 'label' | 'unit' | 'hint'

const statCases: {
  name: string
  props: Record<string, unknown>
  body?: [string, ReactNode]
  slots?: Partial<Record<Slot, [string, ReactNode]>>
}[] = [
  { name: 'label and value props', props: { label: 'Tools', value: '6' } },
  { name: 'numeric zero value', props: { label: 'Locked', value: 0 } },
  { name: 'value in the default slot', props: { label: 'Tools' }, body: ['6', '6'] },
  {
    name: 'value with markup',
    props: { label: 'Uptime' },
    body: ['<abbr title="percent">99%</abbr>', createElement('abbr', { title: 'percent' }, '99%')],
  },
  { name: 'unit prop', props: { label: 'Completed', value: '2', unit: '/ 7' } },
  {
    name: 'unit slot',
    props: { label: 'Speed', value: '140' },
    slots: { unit: ['<b>m/s</b>', createElement('b', null, 'm/s')] },
  },
  { name: 'hint prop', props: { label: 'LP earned', value: '25,000', hint: 'Across all agents' } },
  {
    name: 'hint slot',
    props: { label: 'LP', value: '1' },
    slots: { hint: ['<em>est.</em>', createElement('em', null, 'est.')] },
  },
  {
    name: 'label slot',
    props: { value: '214' },
    slots: { label: ['ESI <abbr>routes</abbr>', ['ESI ', createElement('abbr', { key: 1 }, 'routes')]] },
  },
  { name: 'everything', props: { label: 'Done', value: '2', unit: '/ 7', hint: 'This week', tone: 'success' } },
  ...(['default', 'muted', 'success', 'warning', 'danger'] as const).map((tone) => ({
    name: `tone ${tone}`,
    props: { label: 'X', value: '1', tone },
  })),
  { name: 'extra class and attrs', props: { label: 'X', value: '1', class: 'site-stat', id: 's1' } },
  { name: 'default slot wins over value', props: { label: 'Tools', value: '5' }, body: ['6', '6'] },
  { name: 'no label', props: { value: '6' } },
]

describe('Stat renders the same HTML in Astro and React', () => {
  for (const { name, props, body, slots = {} } of statCases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      const astroSlots: Record<string, string> = {}
      const reactProps: Record<string, unknown> = { ...rest, className }
      if (body) {
        astroSlots.default = body[0]
      }
      for (const [slot, [html, node]] of Object.entries(slots) as [Slot, [string, ReactNode]][]) {
        astroSlots[slot] = html
        reactProps[slot] = node
      }
      await expectSameHtml(AstroStat, { props, slots: astroSlots }, createElement(Stat, reactProps as never, body?.[1]))
    })
  }
})

const groupCases: { name: string; props: Record<string, unknown> }[] = [
  { name: 'defaults', props: {} },
  { name: 'plain', props: { variant: 'plain' } },
  { name: 'framed', props: { variant: 'framed' } },
  { name: 'columns 2', props: { columns: 2 } },
  { name: 'columns 3, framed', props: { columns: 3, variant: 'framed' } },
  { name: 'columns 4', props: { columns: 4 } },
  { name: 'label and class', props: { 'aria-label': 'Summary', class: 'site-stats' } },
]

describe('StatGroup renders the same HTML in Astro and React', () => {
  const inner = '<div class="x-stat"><dt class="x-stat__label">Tools</dt><dd class="x-stat__value">6</dd></div>'
  for (const { name, props } of groupCases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(
        AstroStatGroup,
        { props, slots: { default: inner } },
        createElement(StatGroup, { ...rest, className } as never, createElement(Stat, { label: 'Tools', value: '6' })),
      )
    })
  }
})
