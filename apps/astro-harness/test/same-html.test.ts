import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import AstroButton from '@xaroth.nl/design/astro/Button.astro'
import { Button } from '@xaroth.nl/design/react'
import { normalize } from './normalize.ts'

const container = await AstroContainer.create()

// Astro takes `class` and named slots, React takes `className` and `start` / `end` props.
const cases: { name: string; props: Record<string, unknown>; start?: string; end?: string }[] = [
  { name: 'default', props: {} },
  { name: 'secondary small', props: { variant: 'secondary', size: 'sm' } },
  { name: 'tertiary large', props: { variant: 'tertiary', size: 'lg' } },
  { name: 'secondary danger', props: { variant: 'secondary', tone: 'danger' } },
  { name: 'primary warning full width', props: { tone: 'warning', fullWidth: true } },
  { name: 'tertiary success', props: { variant: 'tertiary', tone: 'success' } },
  { name: 'disabled button', props: { disabled: true } },
  { name: 'loading button', props: { loading: true } },
  { name: 'loading and disabled', props: { loading: true, disabled: true } },
  { name: 'link', props: { href: '/tools', variant: 'secondary' } },
  { name: 'disabled link', props: { href: '/tools', disabled: true } },
  { name: 'loading link', props: { href: '/tools', loading: true } },
  { name: 'start and end icons', props: {}, start: '<svg aria-hidden="true"></svg>', end: '→' },
  { name: 'submit type', props: { type: 'submit' } },
  { name: 'extra class and attrs', props: { class: 'site-cta', 'aria-label': 'Open' } },
]

describe('Button renders the same HTML in Astro and React', () => {
  for (const { name, props, start, end } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      const slots: Record<string, string> = { default: 'Launch' }
      if (start) {
        slots.start = start
      }
      if (end) {
        slots.end = end
      }
      const astro = await container.renderToString(AstroButton, { props, slots })
      const icon = (html?: string) =>
        html ? createElement('span', { dangerouslySetInnerHTML: { __html: html } }) : undefined
      const react = renderToStaticMarkup(
        createElement(Button, { ...rest, className, start: icon(start), end: icon(end) } as never, 'Launch'),
      )
      // React needs a wrapper element for raw HTML; unwrap it before comparing.
      const unwrapped = react.replace(/<span>(<svg[^]*?<\/svg>|→)<\/span>/g, '$1')
      expect(normalize(astro)).toBe(normalize(unwrapped))
    })
  }
})
