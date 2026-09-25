import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const components = join(import.meta.dirname, '../../../../packages/design/src/components')
const families = readdirSync(components, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

// A component that renders another family's classes must load that family's structure CSS itself,
// or a site that uses it alone gets unstyled markup.
describe('components load the CSS of every family they render', () => {
  for (const family of families) {
    const files = readdirSync(join(components, family)).filter((f) => /\.(astro|tsx)$/.test(f))
    for (const file of files) {
      it(`${family}/${file}`, () => {
        const source = readFileSync(join(components, family, file), 'utf8')
        const recipe = readFileSync(join(components, family, 'index.ts'), 'utf8')
        const text = `${source}\n${recipe}`
        const used = new Set([
          ...[...text.matchAll(/\bx-([a-z]+(?:-[a-z]+)*)(?=[_ '"`-]|$)/g)].map((m) => m[1]),
          // Using another family's recipe renders its classes too.
          ...[...text.matchAll(/from '\.\.\/([a-z-]+)\/index\.ts'/g)].map((m) => m[1]),
        ])
        const missing = families.filter(
          (other) =>
            other !== family &&
            used.has(other) &&
            !source.includes(`'../${other}/${other}.scss'`) &&
            !source.match(new RegExp(`from '\\.\\./${other}/${other}\\.(astro|tsx)'`)),
        )
        expect(missing).toEqual([])
      })
    }
  }
})
