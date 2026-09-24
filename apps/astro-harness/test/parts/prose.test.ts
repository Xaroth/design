import { createElement, type ReactElement, type ReactNode } from 'react'
import { describe, it } from 'vitest'
import AstroCodeBlock from '@xaroth.nl/design/astro/CodeBlock.astro'
import AstroProse from '@xaroth.nl/design/astro/Prose.astro'
import { CodeBlock, Prose } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'

// Props are loose per case, so the element is built untyped.
const el = (type: unknown, props: object, ...children: ReactNode[]) =>
  createElement(type as never, props as never, ...children) as ReactElement

const body = '<h2>Title</h2><p>Text with <code>code</code>.</p>'
const children = [
  createElement('h2', { key: 'h' }, 'Title'),
  createElement('p', { key: 'p' }, 'Text with ', createElement('code', null, 'code'), '.'),
]

const proseCases: { name: string; props: Record<string, unknown> }[] = [
  { name: 'default', props: {} },
  { name: 'as article with class', props: { as: 'article', class: 'post', id: 'post' } },
]

describe('Prose renders the same HTML in Astro and React', () => {
  for (const { name, props } of proseCases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(AstroProse, { props, slots: { default: body } }, el(Prose, { ...rest, className }, children))
    })
  }
})

const ts = `import { createEsiClient } from '@eve-online-tools/esi-provider'

/* Pin the API shape
   to a date. */
const esi = createEsiClient({ compatibilityDate: '2026-09-01', retries: 3 })
if (error) throw error // typed <as> string & more`

const codeCases: { name: string; props: Record<string, unknown> }[] = [
  { name: 'code only', props: { code: 'const a = 1' } },
  { name: 'lang', props: { code: ts, lang: 'ts' } },
  { name: 'title', props: { code: ts, title: 'example.ts' } },
  { name: 'title and lang', props: { code: ts, lang: 'ts', title: 'example.ts' } },
  { name: 'hash comments', props: { code: 'def f(x):\n    return "s"  # done\n', lang: 'py' } },
  { name: 'empty lines and trailing newline', props: { code: '\n\na\n\n', lang: 'sh' } },
  { name: 'class and attrs', props: { code: 'x', class: 'wide', 'data-region': 'code' } },
]

describe('CodeBlock renders the same HTML in Astro and React', () => {
  for (const { name, props } of codeCases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(AstroCodeBlock, { props }, el(CodeBlock, { ...rest, className }))
    })
  }
})
