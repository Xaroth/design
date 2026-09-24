import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import AstroPagination from '@xaroth.nl/design/astro/pagination'
import { Pagination, paginationPages } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'

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

  it('React accepts an href function', async () => {
    await expectSameHtml(
      AstroPagination,
      { props: { page: 3, pages: 8, href } },
      createElement(Pagination, { page: 3, pages: 8, href: (p: number) => `/blog/page/${p}` }),
    )
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
  ])('page %i of %i, siblings %i', (page, pages, siblings, expected) => {
    expect(paginationPages(page, pages, siblings)).toEqual(expected)
  })
})
