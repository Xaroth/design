import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import AstroButton from '@xaroth.nl/design/astro/Button.astro'
import { Button } from '@xaroth.nl/design/react'
import { normalize } from './normalize.ts'

const container = await AstroContainer.create()

// Astro takes `class`, React takes `className`; everything else is passed as-is.
const cases: { name: string; props: Record<string, unknown> }[] = [
  { name: 'default', props: {} },
  { name: 'secondary small', props: { variant: 'secondary', size: 'sm' } },
  { name: 'ghost large', props: { variant: 'ghost', size: 'lg' } },
  { name: 'danger disabled', props: { variant: 'danger', disabled: true } },
  { name: 'link', props: { href: '/tools', variant: 'secondary' } },
  { name: 'extra class and attrs', props: { class: 'site-cta', 'aria-label': 'Open' } },
]

describe('Button renders the same HTML in Astro and React', () => {
  for (const { name, props } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      const astro = await container.renderToString(AstroButton, { props, slots: { default: 'Launch' } })
      const react = renderToStaticMarkup(createElement(Button, { ...rest, className } as never, 'Launch'))
      expect(normalize(astro)).toBe(normalize(react))
    })
  }
})
