import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import AstroFilterLayout from '@xaroth.nl/design/astro/filter-layout'
import AstroFilterPanel from '@xaroth.nl/design/astro/filter-panel'
import { FilterLayout, FilterPanel, filterSwitchScript } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'
import { normalize } from '../normalize.ts'

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
