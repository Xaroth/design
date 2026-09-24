const join = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(' ')

// Side: filters in 3 columns beside 9 columns of results from 1024px. Top: filters in a row above full-width
// results. Both stack the same below 1024px.
export type FilterPosition = 'top' | 'side'

export const filterPositions: readonly FilterPosition[] = ['top', 'side']

export type FilterLayoutOptions = {
  position?: FilterPosition
  className?: string
}

export const filterLayoutClass = ({ position = 'top', className }: FilterLayoutOptions = {}): string =>
  join('x-filters', `x-filters--${position}`, className)

export const filterPanelClass = ({ className }: { className?: string } = {}): string =>
  join('x-filter-panel', className)

export const filterSwitchLabels: Record<FilterPosition, string> = { top: 'Top', side: 'Side' }

export const filterSwitchButtonAttrs = (option: FilterPosition, position: FilterPosition = 'top') => ({
  class: 'x-filters__switch-option',
  'data-x-filters-position': option,
  'aria-pressed': option === position ? ('true' as const) : ('false' as const),
})

// Astro only: flips the modifier class and aria-pressed on click. One document listener serves every instance,
// so repeated copies of the script return early.
export const filterSwitchScript = `(()=>{if(window.__xFilters)return;window.__xFilters=1;document.addEventListener('click',(e)=>{const b=e.target instanceof Element&&e.target.closest('[data-x-filters-position]');const r=b&&b.closest('.x-filters');if(!r)return;const p=b.getAttribute('data-x-filters-position');r.classList.toggle('x-filters--top',p==='top');r.classList.toggle('x-filters--side',p==='side');r.querySelectorAll(':scope>.x-filters__switch [data-x-filters-position]').forEach((o)=>o.setAttribute('aria-pressed',String(o===b)))})})()`
