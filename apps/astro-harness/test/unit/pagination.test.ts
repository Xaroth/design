import { describe, expect, it } from 'vitest'
import {
  paginationClamp,
  paginationEntries,
  paginationHref,
  paginationItemClass,
  paginationPages,
} from '@xaroth.nl/design/parts'

describe('paginationClamp', () => {
  it('keeps the page inside 1..pages', () => {
    expect(paginationClamp(0, 5)).toEqual({ page: 1, pages: 5 })
    expect(paginationClamp(9, 5)).toEqual({ page: 5, pages: 5 })
    expect(paginationClamp(3, 5)).toEqual({ page: 3, pages: 5 })
  })

  it('floors fractions and treats invalid totals as one page', () => {
    expect(paginationClamp(2.7, 5.9)).toEqual({ page: 2, pages: 5 })
    expect(paginationClamp(Number.NaN, Number.NaN)).toEqual({ page: 1, pages: 1 })
    expect(paginationClamp(-3, -2)).toEqual({ page: 1, pages: 1 })
    expect(paginationClamp(4, 0)).toEqual({ page: 1, pages: 1 })
  })
})

describe('paginationPages', () => {
  it('shows every page when there are few', () => {
    expect(paginationPages(1, 1)).toEqual([1])
    expect(paginationPages(3, 5)).toEqual([1, 2, 3, 4, 5])
  })

  it('keeps the window width fixed near the ends', () => {
    expect(paginationPages(1, 8)).toEqual([1, 2, 3, 'gap', 8])
    expect(paginationPages(2, 8)).toEqual([1, 2, 3, 'gap', 8])
    expect(paginationPages(8, 8)).toEqual([1, 'gap', 6, 7, 8])
  })

  it('puts gaps on both sides in the middle', () => {
    expect(paginationPages(5, 10)).toEqual([1, 'gap', 4, 5, 6, 'gap', 10])
  })

  it('shows a single hidden page instead of a gap', () => {
    expect(paginationPages(4, 10)).toEqual([1, 2, 3, 4, 5, 'gap', 10])
    expect(paginationPages(7, 10)).toEqual([1, 'gap', 6, 7, 8, 9, 10])
  })

  it('honours siblings', () => {
    expect(paginationPages(5, 10, 0)).toEqual([1, 'gap', 5, 'gap', 10])
    expect(paginationPages(1, 10, 2)).toEqual([1, 2, 3, 4, 5, 'gap', 10])
  })

  it('clamps the requested page', () => {
    expect(paginationPages(99, 3)).toEqual([1, 2, 3])
    expect(paginationPages(-1, 8)).toEqual([1, 2, 3, 'gap', 8])
  })
})

describe('paginationHref', () => {
  it('fills every {page} in a pattern', () => {
    expect(paginationHref('/p/{page}?p={page}', 3)).toBe('/p/3?p=3')
  })

  it('calls a function', () => {
    expect(paginationHref((p) => `#${p * 2}`, 3)).toBe('#6')
  })

  it('uses firstHref only for page 1', () => {
    expect(paginationHref('/blog/{page}', 1, '/blog')).toBe('/blog')
    expect(paginationHref('/blog/{page}', 2, '/blog')).toBe('/blog/2')
    expect(paginationHref('/blog/{page}', 1)).toBe('/blog/1')
  })
})

describe('paginationEntries', () => {
  const summary = (e: ReturnType<typeof paginationEntries>) => e.map((x) => `${x.kind}:${x.key}`)

  it('orders edges, summary and pages, and disables edges at the start', () => {
    const entries = paginationEntries({ page: 1, pages: 3, href: '/{page}', firstHref: '/', ends: true })
    expect(summary(entries)).toEqual([
      'edge:first',
      'edge:prev',
      'summary:summary',
      'page:1',
      'page:2',
      'page:3',
      'edge:next',
      'edge:last',
    ])
    const byKey = Object.fromEntries(entries.map((e) => [e.key, e]))
    expect(byKey.first).toMatchObject({ href: undefined })
    expect(byKey.prev).toMatchObject({ href: undefined, rel: 'prev' })
    expect(byKey.next).toMatchObject({ href: '/2', rel: 'next' })
    expect(byKey.last).toMatchObject({ href: '/3' })
    expect(byKey['1']).toMatchObject({ href: '/', current: true })
    expect(byKey['2']).toMatchObject({ current: false })
  })

  it('disables next and last at the end and fills the summary label', () => {
    const entries = paginationEntries({
      page: 12,
      pages: 8,
      href: '/{page}',
      ends: true,
      summaryLabel: 'Seite {page} von {pages}',
    })
    const byKey = Object.fromEntries(entries.map((e) => [e.key, e]))
    expect(byKey.next).toMatchObject({ href: undefined })
    expect(byKey.last).toMatchObject({ href: undefined })
    expect(byKey.prev).toMatchObject({ href: '/7' })
    expect(byKey.summary).toMatchObject({ text: '8 / 8', label: 'Seite 8 von 8' })
  })

  it('gives gaps unique keys', () => {
    const keys = paginationEntries({ page: 5, pages: 10, href: '/{page}' }).map((e) => e.key)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('leaves out first and last without ends', () => {
    const keys = paginationEntries({ page: 2, pages: 3, href: '/{page}' }).map((e) => e.key)
    expect(keys).not.toContain('first')
    expect(keys).not.toContain('last')
  })

  it('classes items by what gives way on narrow screens', () => {
    const entries = paginationEntries({ page: 5, pages: 10, href: '/{page}', ends: true })
    const classes = Object.fromEntries(entries.map((e) => [e.key, paginationItemClass(e)]))
    expect(classes.prev).toBe('x-pagination__item')
    expect(classes.first).toBe('x-pagination__item x-pagination__item--end')
    expect(classes.summary).toBe('x-pagination__item x-pagination__item--summary')
    expect(classes['5']).toBe('x-pagination__item x-pagination__item--page')
    expect(classes['gap-1']).toBe('x-pagination__item x-pagination__item--page')
  })
})
