import { createElement } from 'react'
import { describe, it } from 'vitest'
import AstroBadge from '@xaroth.nl/design/astro/badge'
import { Badge } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'

const cases: { name: string; props: Record<string, unknown> }[] = [
  { name: 'default', props: {} },
  { name: 'explicit default tone', props: { tone: 'default' } },
  { name: 'info', props: { tone: 'info' } },
  { name: 'success', props: { tone: 'success' } },
  { name: 'warning', props: { tone: 'warning' } },
  { name: 'danger', props: { tone: 'danger' } },
  { name: 'extra class and attrs', props: { tone: 'success', class: 'site-badge', title: 'Up for 30 days' } },
]

describe('Badge renders the same HTML in Astro and React', () => {
  for (const { name, props } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(
        AstroBadge,
        { props, slots: { default: 'Stable' } },
        createElement(Badge, { ...rest, className } as never, 'Stable'),
      )
    })
  }
})
