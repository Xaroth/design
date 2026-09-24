import { createElement } from 'react'
import { describe, it } from 'vitest'
import AstroFooter from '@xaroth.nl/design/astro/footer'
import { Footer } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'

const groups = [
  {
    title: 'Navigate',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  { title: 'Resources', links: [{ label: 'GitHub', href: 'https://github.com/xaroth' }] },
]
const untitled = [{ links: [{ label: 'Privacy', href: '/privacy' }] }]
const note = 'Not affiliated with CCP.'

const cases: { name: string; props: Record<string, unknown>; brand?: boolean }[] = [
  { name: 'default columns', props: { groups, note }, brand: true },
  { name: 'row', props: { groups, note, layout: 'row' }, brand: true },
  { name: 'row without titles', props: { groups: untitled, note, layout: 'row' }, brand: true },
  { name: 'brand link with label', props: { groups, brandHref: '/', brandLabel: 'Home' }, brand: true },
  { name: 'no note', props: { groups }, brand: true },
  { name: 'no groups', props: { note }, brand: true },
  { name: 'no brand', props: { groups, note } },
  { name: 'custom nav label', props: { groups, navLabel: 'Site links' }, brand: true },
  { name: 'extra class and attrs', props: { groups, class: 'site-footer', id: 'end' }, brand: true },
]

describe('Footer renders the same HTML in Astro and React', () => {
  for (const { name, props, brand } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(
        AstroFooter,
        { props, slots: brand ? { brand: '<span>xaroth.nl</span>' } : {} },
        createElement(Footer, {
          ...rest,
          className,
          brand: brand ? createElement('span', null, 'xaroth.nl') : undefined,
        } as never),
      )
    })
  }

  it('note slot', async () => {
    await expectSameHtml(
      AstroFooter,
      { props: { groups }, slots: { note: '<em>Not affiliated.</em>' } },
      createElement(Footer, { groups, note: createElement('em', null, 'Not affiliated.') }),
    )
  })
})
