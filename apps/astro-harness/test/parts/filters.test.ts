import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { FilterLayout, FilterPanel, filterSwitchScript } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'
import { normalize } from '../normalize.ts'
import { FilterLayout as AstroFilterLayout, FilterPanel as AstroFilterPanel } from '@xaroth.nl/design/astro'

const container = await AstroContainer.create()
const form = '<form class="x-filter-panel"><input name="q"></form>'
const reactForm = createElement(FilterPanel, {}, createElement('input', { name: 'q' }))
const results = '<p>Results</p>'
const reactResults = createElement('p', {}, 'Results')

// The Astro switch adds its inline script after the layout; React keeps the position in state instead.
const script = `<script>${filterSwitchScript}</script>`

describe('FilterLayout', () => {
  const cases: [string, Record<string, unknown>][] = [
    ['default', {}],
    ['top', { position: 'top' }],
    ['side', { position: 'side' }],
    ['switchable top', { switchable: true }],
    ['switchable side', { switchable: true, position: 'side' }],
    ['switchable with label, class and id', { switchable: true, switchLabel: 'Filters', class: 'site', id: 'f' }],
    ['collapsible', { collapsible: true }],
    ['collapsible with active count', { collapsible: true, activeCount: 3 }],
    ['collapsible with zero active', { collapsible: true, activeCount: 0 }],
    [
      'collapsible with labels, switchable side',
      {
        collapsible: true,
        collapsibleLabel: 'Filter',
        activeCount: 1,
        activeLabel: 'aktiv',
        switchable: true,
        position: 'side',
      },
    ],
  ]
  for (const [name, props] of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      const astro = await container.renderToString(AstroFilterLayout, {
        props,
        slots: { filters: form, default: results },
      })
      const react = renderToStaticMarkup(
        createElement(
          FilterLayout,
          { ...rest, className: className as string | undefined, filters: reactForm },
          reactResults,
        ),
      )
      const switchable = Boolean(props.switchable)
      expect(astro.includes(script)).toBe(switchable)
      expect(normalize(astro.replace(script, ''))).toBe(normalize(react))
    })
  }

  it('collapsible renders a toggle before the controls', async () => {
    const html = await container.renderToString(AstroFilterLayout, { props: { collapsible: true, activeCount: 2 } })
    expect(normalize(html)).toContain(
      '<details class="x-filters__disclosure"><summary class="x-filters__toggle">Filters<span class="x-filters__count">2<span class="x-visually-hidden"> active</span></span></summary></details><div class="x-filters__controls">',
    )
  })

  it('empty slots', async () => {
    await expectSameHtml(AstroFilterLayout, {}, createElement(FilterLayout))
  })
})

describe('FilterPanel', () => {
  it('default', async () => {
    await expectSameHtml(AstroFilterPanel, { slots: { default: '<input name="q">' } }, reactForm)
  })
  it('label, class and handler attribute', async () => {
    const props = { 'aria-label': 'Filter achievements', class: 'site', action: '/search' }
    await expectSameHtml(
      AstroFilterPanel,
      { props, slots: { default: '<input name="q">' } },
      createElement(
        FilterPanel,
        { 'aria-label': 'Filter achievements', className: 'site', action: '/search' },
        createElement('input', { name: 'q' }),
      ),
    )
  })
})
