import { createElement } from 'react'
import { describe, it } from 'vitest'
import AstroDivider from '@xaroth.nl/design/astro/divider'
import { Divider } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'

const cases: { name: string; props: Record<string, unknown>; text?: string }[] = [
  { name: 'default', props: {} },
  { name: 'explicit plain', props: { variant: 'plain' } },
  { name: 'ornament', props: { variant: 'ornament' } },
  { name: 'label', props: { variant: 'label' }, text: 'Or' },
  { name: 'extra class and attrs', props: { variant: 'ornament', class: 'site-rule', 'data-test': 'rule' } },
  { name: 'plain with class', props: { class: 'site-rule' } },
]

describe('Divider renders the same HTML in Astro and React', () => {
  for (const { name, props, text } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(
        AstroDivider,
        { props, slots: text ? { default: text } : {} },
        createElement(Divider, { ...rest, className } as never, text),
      )
    })
  }
})
