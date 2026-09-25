import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { AstroComponentFactory } from 'astro/runtime/server/index.js'
import type { ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect } from 'vitest'
import { idProblems, normalize } from './normalize.ts'

const container = await AstroContainer.create()

type AstroInput = { props?: Record<string, unknown>; slots?: Record<string, string> }

export type CompareOptions = {
  // Ids the fragment may reference that a real page provides outside it.
  externalIds?: readonly string[]
}

// Render one Astro part and one React element, require identical normalized HTML and valid id references.
export async function expectSameHtml(
  astro: AstroComponentFactory,
  input: AstroInput,
  react: ReactElement,
  { externalIds = [] }: CompareOptions = {},
) {
  expectSameMarkup(await container.renderToString(astro, input), renderToStaticMarkup(react), { externalIds })
}

// Same checks for markup a test rendered itself.
export function expectSameMarkup(astroHtml: string, reactHtml: string, { externalIds = [] }: CompareOptions = {}) {
  const html = normalize(astroHtml)
  expect(html).toBe(normalize(reactHtml))
  expect({ html, idProblems: idProblems(html, externalIds) }).toEqual({ html, idProblems: [] })
}
