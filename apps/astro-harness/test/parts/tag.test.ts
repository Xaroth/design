import { createElement } from 'react'
import { describe, it } from 'vitest'
import { Tag } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'
import { Tag as AstroTag } from '@xaroth.nl/design/astro'

const cases: { name: string; props: Record<string, unknown> }[] = [
  { name: 'span', props: {} },
  { name: 'active span', props: { active: true } },
  { name: 'link', props: { href: '/tags/esi' } },
  { name: 'active link', props: { href: '/tags/esi', active: true } },
  { name: 'extra class and attrs', props: { href: '/tags/esi', class: 'site-tag', rel: 'tag' } },
  { name: 'user aria-current kept on inactive link', props: { href: '/tags/esi', 'aria-current': 'page' } },
  { name: 'user aria-current loses when active', props: { href: '/tags/esi', active: true, 'aria-current': 'page' } },
]

describe('Tag renders the same HTML in Astro and React', () => {
  for (const { name, props } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(
        AstroTag,
        { props, slots: { default: 'esi' } },
        createElement(Tag, { ...rest, className } as never, 'esi'),
      )
    })
  }
})
