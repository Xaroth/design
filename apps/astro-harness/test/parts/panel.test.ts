import { createElement } from 'react'
import { describe, it } from 'vitest'
import AstroPanel from '@xaroth.nl/design/astro/panel'
import { Panel } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'

const variants = ['plain', 'raised', 'accent', 'callout'] as const
const paddings = ['none', 'sm', 'md', 'lg', 'xl'] as const

const cases: { name: string; props: Record<string, unknown>; body?: string }[] = [
  { name: 'defaults', props: {}, body: 'Text.' },
  { name: 'empty', props: {} },
  ...variants.flatMap((variant) => [
    { name: `${variant}`, props: { variant }, body: 'Text.' },
    { name: `${variant} with marks`, props: { variant, marks: true }, body: 'Text.' },
  ]),
  ...paddings.map((padding) => ({ name: `padding ${padding}`, props: { padding }, body: 'Text.' })),
  { name: 'as section with label', props: { as: 'section', 'aria-labelledby': 'h' }, body: '<h2 id="h">Title</h2>' },
  { name: 'as aside, lg, accent, marks', props: { as: 'aside', padding: 'lg', variant: 'accent', marks: true } },
  { name: 'as form', props: { as: 'form', action: '#' }, body: 'x' },
  { name: 'as li', props: { as: 'li' }, body: 'x' },
  { name: 'extra class and attrs', props: { class: 'site-cta', id: 'cta', 'data-region': 'cta' }, body: 'x' },
]

describe('Panel renders the same HTML in Astro and React', () => {
  for (const { name, props, body } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      const children = body ? createElement('span', { dangerouslySetInnerHTML: { __html: body } }) : undefined
      await expectSameHtml(
        AstroPanel,
        { props, slots: body ? { default: `<span>${body}</span>` } : {} },
        createElement(Panel, { ...rest, className } as never, children),
      )
    })
  }
})
