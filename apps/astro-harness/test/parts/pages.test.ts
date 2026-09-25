import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import { idProblems } from '../normalize.ts'

const container = await AstroContainer.create()
const pages = import.meta.glob<{ default: any }>('../../src/pages/*.astro')

// Harness pages combine parts the way a site does, once per theme, so ids must stay unique across all of it.
describe('harness pages have unique ids and valid id references', () => {
  for (const [path, load] of Object.entries(pages)) {
    it(path.replace(/^.*\//, ''), async () => {
      const html = await container.renderToString((await load()).default)
      expect(idProblems(html)).toEqual([])
    })
  }
})
