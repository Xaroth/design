import { createElement } from 'react'
import { describe, it } from 'vitest'
import { DescriptionList } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'
import { DescriptionList as AstroDescriptionList } from '@xaroth.nl/design/astro'

const items = [
  { term: 'Published', value: '2026-03-14' },
  { term: 'Read time', value: '6 min' },
  { term: 'Author', value: 'Xaroth Brook' },
]

describe('DescriptionList', () => {
  const cases: [string, Record<string, unknown>][] = [
    ['default', {}],
    ['stacked', { layout: 'stacked' }],
    ['inline', { layout: 'inline' }],
    ['columns', { layout: 'columns' }],
    ['inline with dividers', { layout: 'inline', dividers: true }],
    ['stacked with dividers', { dividers: true }],
    ['columns with dividers, extra class and id', { layout: 'columns', dividers: true, class: 'site', id: 'meta' }],
  ]
  for (const [name, props] of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(
        AstroDescriptionList,
        { props: { items, ...props } },
        createElement(DescriptionList, { items, ...rest, className: className as string | undefined }),
      )
    })
  }

  it('empty', async () => {
    await expectSameHtml(AstroDescriptionList, { props: { items: [] } }, createElement(DescriptionList, { items: [] }))
  })

  it('markup values through value slots', async () => {
    const links = [
      { term: 'GitHub', value: 'github.com/xaroth' },
      { term: 'EVE', value: 'Xaroth Brook' },
    ]
    await expectSameHtml(
      AstroDescriptionList,
      {
        props: { items: links, layout: 'inline' },
        slots: { 'value-0': '<a href="https://github.com/xaroth">github.com/xaroth</a>' },
      },
      createElement(DescriptionList, {
        layout: 'inline',
        items: [
          { ...links[0], value: createElement('a', { href: 'https://github.com/xaroth' }, links[0].value) },
          links[1],
        ],
      }),
    )
  })
})
