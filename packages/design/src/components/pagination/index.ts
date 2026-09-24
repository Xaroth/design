// A URL pattern with {page} in it, or a function. Astro takes the pattern only.
export type PaginationHref = string | ((page: number) => string)

export type PaginationAlign = 'center' | 'start'

export type PaginationOptions = {
  align?: PaginationAlign
  className?: string
}

export type PaginationInput = {
  page: number
  pages: number
  href: PaginationHref
  /** URL of page 1 when it differs from the pattern, for example '/blog'. */
  firstHref?: string
  /** Pages shown on each side of the current one. */
  siblings?: number
  /** Adds First and Last links. */
  ends?: boolean
  prevLabel?: string
  nextLabel?: string
  firstLabel?: string
  lastLabel?: string
}

type Edge = 'first' | 'prev' | 'next' | 'last'

// A link to a page, a gap, or an edge control. An edge without href is disabled and renders as a span.
export type PaginationEntry =
  | { kind: 'page'; key: string; label: string; href: string; current: boolean }
  | { kind: 'gap'; key: string }
  | { kind: 'edge'; key: Edge; label: string; href?: string; rel?: 'prev' | 'next' }

export const paginationClass = ({ align = 'center', className }: PaginationOptions = {}): string =>
  ['x-pagination', `x-pagination--${align}`, className].filter(Boolean).join(' ')

export const paginationClasses = {
  list: 'x-pagination__list',
  item: 'x-pagination__item',
  link: 'x-pagination__link',
  edge: 'x-pagination__link x-pagination__link--edge',
  disabled: 'x-pagination__link x-pagination__link--edge x-pagination__link--disabled',
  gap: 'x-pagination__gap',
} as const

export const paginationHref = (href: PaginationHref, page: number, firstHref?: string): string =>
  page === 1 && firstHref !== undefined
    ? firstHref
    : typeof href === 'function'
      ? href(page)
      : href.replaceAll('{page}', String(page))

// Keeps the window a fixed width near the ends, so page 1 and 2 of 8 both read 1 2 3 … 8.
// A gap that would hide a single page shows that page instead.
export const paginationPages = (page: number, pages: number, siblings = 1): (number | 'gap')[] => {
  const width = 2 * siblings + 1
  const start = Math.max(1, Math.min(page - siblings, pages - width + 1))
  const end = Math.min(pages, start + width - 1)
  const shown = new Set([1, pages])
  for (let p = start; p <= end; p++) {
    shown.add(p)
  }
  const sorted = [...shown].filter((p) => p >= 1 && p <= pages).sort((a, b) => a - b)
  const out: (number | 'gap')[] = []
  sorted.forEach((p, i) => {
    const prev = sorted[i - 1]
    if (prev !== undefined && p - prev === 2) {
      out.push(prev + 1)
    } else if (prev !== undefined && p - prev > 2) {
      out.push('gap')
    }
    out.push(p)
  })
  return out
}

export const paginationEntries = ({
  page,
  pages,
  href,
  firstHref,
  siblings,
  ends,
  prevLabel = 'Prev',
  nextLabel = 'Next',
  firstLabel = 'First',
  lastLabel = 'Last',
}: PaginationInput): PaginationEntry[] => {
  const to = (p: number) => paginationHref(href, p, firstHref)
  const atStart = page <= 1
  const atEnd = page >= pages
  const entries: PaginationEntry[] = []
  if (ends) {
    entries.push({ kind: 'edge', key: 'first', label: firstLabel, href: atStart ? undefined : to(1) })
  }
  entries.push({ kind: 'edge', key: 'prev', label: prevLabel, href: atStart ? undefined : to(page - 1), rel: 'prev' })
  paginationPages(page, pages, siblings).forEach((p, i) =>
    entries.push(
      p === 'gap'
        ? { kind: 'gap', key: `gap-${i}` }
        : { kind: 'page', key: String(p), label: String(p), href: to(p), current: p === page },
    ),
  )
  entries.push({ kind: 'edge', key: 'next', label: nextLabel, href: atEnd ? undefined : to(page + 1), rel: 'next' })
  if (ends) {
    entries.push({ kind: 'edge', key: 'last', label: lastLabel, href: atEnd ? undefined : to(pages) })
  }
  return entries
}

export const paginationPageAttrs = (entry: Extract<PaginationEntry, { kind: 'page' }>) => ({
  href: entry.href,
  'aria-current': entry.current ? ('page' as const) : undefined,
})
