import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { AstroComponentFactory } from 'astro/runtime/server/index.js'
import type { ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect } from 'vitest'
import { normalize } from './normalize.ts'

const container = await AstroContainer.create()

type AstroInput = { props?: Record<string, unknown>; slots?: Record<string, string> }

// Render one Astro part and one React element and require identical normalized HTML.
export async function expectSameHtml(astro: AstroComponentFactory, input: AstroInput, react: ReactElement) {
  const astroHtml = await container.renderToString(astro, input)
  expect(normalize(astroHtml)).toBe(normalize(renderToStaticMarkup(react)))
}
