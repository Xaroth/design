import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Button } from '@xaroth.nl/design/react'
import { normalize } from '../normalize.ts'
import { Button as AstroButton } from '@xaroth.nl/design/astro'

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
  { name: 'loading submit', props: { type: 'submit', loading: true } },
  { name: 'loading reset', props: { type: 'reset', loading: true } },
  { name: 'disabled submit', props: { type: 'submit', disabled: true } },
  { name: 'user aria-disabled loses to loading', props: { loading: true, 'aria-disabled': 'false' } },
  { name: 'user aria-busy kept when idle', props: { 'aria-busy': 'true', id: 'b1' } },
  { name: 'link with anchor attrs', props: { href: '/file.zip', target: '_blank', rel: 'noopener', download: '' } },
  { name: 'loading link keeps anchor attrs', props: { href: '/file.zip', loading: true, target: '_blank' } },
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

describe('Button loading state', () => {
  const render = (props: Record<string, unknown>) =>
    container.renderToString(AstroButton, { props, slots: { default: 'Save' } })

  // Astro has no click handler, so only a native disabled stops a loading form button.
  it('disables a loading submit or reset button', async () => {
    for (const type of ['submit', 'reset']) {
      const html = await render({ type, loading: true })
      expect(html).toMatch(/\sdisabled[\s>]/)
      expect(html).toContain('aria-busy="true"')
      expect(html).not.toContain('aria-disabled')
    }
  })

  it('keeps a loading plain button focusable', async () => {
    const html = await render({ loading: true })
    expect(html).not.toMatch(/\sdisabled[\s>]/)
    expect(html).toContain('aria-disabled="true"')
    expect(html).toContain('aria-busy="true"')
  })
})
