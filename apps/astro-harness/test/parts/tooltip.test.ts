import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { createElement, type ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Tooltip, tooltipScript } from '@xaroth.nl/design/react'
import { expectSameMarkup } from '../compare.ts'
import { Tooltip as AstroTooltip } from '@xaroth.nl/design/astro'
import TooltipPage from '../../src/pages/tooltip.astro'

const container = await AstroContainer.create()

// Astro adds the tooltip script once per page; React installs it from an effect.
const script = `<script>${tooltipScript}</script>`

type Trigger = { html: string; react: () => ReactElement }

const button: Trigger = {
  html: '<button type="button">Scopes</button>',
  react: () => createElement('button', { type: 'button' }, 'Scopes'),
}
const described: Trigger = {
  html: '<button type="button" aria-describedby="scopes-note">Scopes</button>',
  react: () => createElement('button', { type: 'button', 'aria-describedby': 'scopes-note' }, 'Scopes'),
}
const alreadyDescribed: Trigger = {
  html: '<button type="button" aria-describedby="scopes-tip scopes-note">Scopes</button>',
  react: () => createElement('button', { type: 'button', 'aria-describedby': 'scopes-tip scopes-note' }, 'Scopes'),
}
const link: Trigger = {
  html: '<a href="/scopes">Scopes</a>',
  react: () => createElement('a', { href: '/scopes' }, 'Scopes'),
}
const commented: Trigger = {
  html: '<!-- trigger --><button type="button" title="a > b">Scopes</button>',
  react: () => createElement('button', { type: 'button', title: 'a > b' }, 'Scopes'),
}
const focusableSpan: Trigger = {
  html: '<span tabindex="0" class="hint">HP</span>',
  react: () => createElement('span', { tabIndex: 0, className: 'hint' }, 'HP'),
}

const cases: { name: string; props: Record<string, unknown>; trigger: Trigger }[] = [
  { name: 'default', props: {}, trigger: button },
  { name: 'explicit top', props: { placement: 'top' }, trigger: button },
  { name: 'bottom', props: { placement: 'bottom' }, trigger: button },
  { name: 'open', props: { open: true }, trigger: button },
  { name: 'bottom open', props: { placement: 'bottom', open: true }, trigger: link },
  { name: 'keeps existing description', props: {}, trigger: described },
  { name: 'does not repeat its own id', props: {}, trigger: alreadyDescribed },
  { name: 'leading comment and > in a value', props: {}, trigger: commented },
  { name: 'focusable span', props: {}, trigger: focusableSpan },
  { name: 'extra class and attrs', props: { class: 'site-tip', 'data-test': 'tip' }, trigger: link },
  { name: 'user role and title on the wrapper', props: { role: 'presentation', title: 'wrap' }, trigger: button },
]

describe('Tooltip renders the same HTML in Astro and React', () => {
  for (const { name, props, trigger } of cases) {
    it(name, async () => {
      const all: Record<string, unknown> = { id: 'scopes', text: 'Two scopes: achievements and standings.', ...props }
      const { class: className, ...rest } = all
      const astro = await container.renderToString(AstroTooltip, { props: all, slots: { default: trigger.html } })
      const react = renderToStaticMarkup(createElement(Tooltip, { ...rest, className } as never, trigger.react()))
      expect(astro.includes(script)).toBe(true)
      // `scopes-note` is page text outside the tooltip.
      expectSameMarkup(astro.replace(script, ''), react, { externalIds: ['scopes-note'] })
    })
  }
})

it('adds the tooltip script once per page', async () => {
  const html = await container.renderToString(TooltipPage)
  expect(html.match(/<span class="x-tooltip/g)?.length).toBeGreaterThan(1)
  expect(html.split(script).length - 1).toBe(1)
})
