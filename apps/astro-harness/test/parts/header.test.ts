import { createElement } from 'react'
import { describe, it } from 'vitest'
import AstroHeader from '@xaroth.nl/design/astro/header'
import { Header } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'

const items = [
  { label: 'Home', href: '/', current: true },
  { label: 'Tools', href: '/tools' },
  { label: 'Blog', href: '/blog' },
]

// Brand and actions are named slots in Astro and ReactNode props in React; each case gives both forms.
const brand = { html: '<span>xaroth.nl</span>', react: () => createElement('span', null, 'xaroth.nl') }
const actions = {
  html: '<a class="x-button" href="/signin">Sign in</a>',
  react: () => createElement('a', { className: 'x-button', href: '/signin' }, 'Sign in'),
}

const cases: { name: string; props: Record<string, unknown>; brand?: boolean; actions?: boolean }[] = [
  { name: 'default inline', props: { items }, brand: true },
  { name: 'stacked', props: { items, layout: 'stacked' }, brand: true },
  { name: 'inline with actions', props: { items, layout: 'inline' }, brand: true, actions: true },
  { name: 'stacked with actions', props: { items, layout: 'stacked' }, brand: true, actions: true },
  { name: 'brand link with label', props: { items, brandHref: '/', brandLabel: 'xaroth.nl, home' }, brand: true },
  { name: 'sticky', props: { items, sticky: true }, brand: true },
  { name: 'no current item', props: { items: items.map(({ current: _, ...i }) => i) }, brand: true },
  { name: 'custom labels', props: { items, navLabel: 'Site', menuLabel: 'Browse' }, brand: true },
  { name: 'no items', props: {}, brand: true, actions: true },
  { name: 'no brand', props: { items } },
  { name: 'extra class and attrs', props: { items, class: 'site-header', id: 'top' }, brand: true },
]

describe('Header renders the same HTML in Astro and React', () => {
  for (const { name, props, brand: withBrand, actions: withActions } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      const slots: Record<string, string> = {}
      if (withBrand) {
        slots.brand = brand.html
      }
      if (withActions) {
        slots.actions = actions.html
      }
      await expectSameHtml(
        AstroHeader,
        { props, slots },
        createElement(Header, {
          ...rest,
          className,
          brand: withBrand ? brand.react() : undefined,
          actions: withActions ? actions.react() : undefined,
        } as never),
      )
    })
  }
})
