import type { ComponentProps as AstroProps } from 'astro/types'
import { createElement, type ComponentProps } from 'react'
import { describe, expect, expectTypeOf, it } from 'vitest'
import type { PaginationHref } from '@xaroth.nl/design/parts'
import { Pagination, paginationEntries, paginationPages } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'
import { Pagination as AstroPagination } from '@xaroth.nl/design/astro'

const href = '/blog/page/{page}'

const cases: { name: string; props: Record<string, unknown> }[] = [
  { name: 'first page', props: { page: 1, pages: 8, href } },
  { name: 'second page', props: { page: 2, pages: 8, href } },
  { name: 'middle page', props: { page: 5, pages: 10, href } },
  { name: 'last page', props: { page: 8, pages: 8, href } },
  { name: 'single page', props: { page: 1, pages: 1, href } },
  { name: 'few pages, no gaps', props: { page: 2, pages: 4, href } },
  { name: 'wider window', props: { page: 10, pages: 20, href, siblings: 2 } },
  { name: 'first and last links', props: { page: 4, pages: 9, href, ends: true } },
  { name: 'first and last at the start', props: { page: 1, pages: 9, href, ends: true } },
  { name: 'first and last at the end', props: { page: 9, pages: 9, href, ends: true } },
  { name: 'first page has its own URL', props: { page: 3, pages: 6, href, firstHref: '/blog' } },
  {
    name: 'labels',
    props: {
      page: 2,
      pages: 5,
      href,
      ends: true,
      prevLabel: 'Newer',
      nextLabel: 'Older',
      firstLabel: 'Newest',
      lastLabel: 'Oldest',
      label: 'Posts',
    },
  },
  { name: 'summary label', props: { page: 3, pages: 7, href, summaryLabel: 'Side {page} av {pages}' } },
  { name: 'page past the end', props: { page: 10, pages: 5, href } },
  { name: 'page before the start', props: { page: 0, pages: 5, href, ends: true } },
  { name: 'no pages', props: { page: 1, pages: 0, href } },
  { name: 'start aligned', props: { page: 2, pages: 8, href, align: 'start' } },
  { name: 'extra class and attrs', props: { page: 2, pages: 8, href, class: 'site-pager', id: 'pager' } },
]

describe('Pagination renders the same HTML in Astro and React', () => {
  for (const { name, props } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(AstroPagination, { props }, createElement(Pagination, { ...rest, className } as never))
    })
  }

  it('both accept an href function', async () => {
    const fn = (p: number) => `/blog/page/${p}`
    await expectSameHtml(
      AstroPagination,
      { props: { page: 3, pages: 8, href: fn } },
      createElement(Pagination, { page: 3, pages: 8, href: fn }),
    )
  })

  it('both take the same href type', () => {
    expectTypeOf<AstroProps<typeof AstroPagination>['href']>().toEqualTypeOf<PaginationHref>()
    expectTypeOf<ComponentProps<typeof Pagination>['href']>().toEqualTypeOf<PaginationHref>()
  })
})

describe('paginationEntries', () => {
  const links = (page: number, pages: number) =>
    paginationEntries({ page, pages, href })
      .filter((e) => e.kind !== 'gap')
      .map((e) => (e.kind === 'summary' ? e.text : `${e.label}:${'href' in e ? (e.href ?? '-') : ''}`))

  it('clamps a page past the end to the last page', () => {
    expect(links(10, 5)).toEqual([
      'Prev:/blog/page/4',
      '5 / 5',
      '1:/blog/page/1',
      '2:/blog/page/2',
      '3:/blog/page/3',
      '4:/blog/page/4',
      '5:/blog/page/5',
      'Next:-',
    ])
  })

  it('clamps a page before the start to page 1', () => {
    expect(links(-2, 3)).toEqual([
      'Prev:-',
      '1 / 3',
      '1:/blog/page/1',
      '2:/blog/page/2',
      '3:/blog/page/3',
      'Next:/blog/page/2',
    ])
  })

  it('marks the clamped page current', () => {
    const current = paginationEntries({ page: 9, pages: 4, href }).find((e) => e.kind === 'page' && e.current)
    expect(current).toMatchObject({ label: '4' })
  })
})

describe('paginationPages', () => {
  it.each([
    [1, 8, 1, [1, 2, 3, 'gap', 8]],
    [2, 8, 1, [1, 2, 3, 'gap', 8]],
    [4, 8, 1, [1, 2, 3, 4, 5, 'gap', 8]],
    [5, 10, 1, [1, 'gap', 4, 5, 6, 'gap', 10]],
    [8, 8, 1, [1, 'gap', 6, 7, 8]],
    [1, 1, 1, [1]],
    [2, 3, 1, [1, 2, 3]],
    [10, 20, 2, [1, 'gap', 8, 9, 10, 11, 12, 'gap', 20]],
    [10, 8, 1, [1, 'gap', 6, 7, 8]],
    [0, 8, 1, [1, 2, 3, 'gap', 8]],
    [-3, 8, 1, [1, 2, 3, 'gap', 8]],
    [3, 0, 1, [1]],
    [2.7, 6, 1, [1, 2, 3, 'gap', 6]],
    [3, 5, 0, [1, 2, 3, 4, 5]],
  ])('page %i of %i, siblings %i', (page, pages, siblings, expected) => {
    expect(paginationPages(page, pages, siblings)).toEqual(expected)
  })
})
