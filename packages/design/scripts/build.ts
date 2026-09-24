// Builds dist: theme and all.css bundles, one stylesheet per component family, and the .astro files with their
// imports pointed at compiled output. TypeScript output comes from tsc (build:js).
import { copyFile, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as sass from 'sass'
import { themeIds } from '../src/config.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
await rm(dist, { recursive: true, force: true })

const compile = async (src: string, out: string) => {
  const { css } = sass.compile(join(root, src), { style: 'expanded' })
  await mkdir(dirname(join(dist, out)), { recursive: true })
  await writeFile(join(dist, out), `${css}\n`)
}

for (const theme of themeIds) {
  await compile(`src/styles/themes/${theme}.scss`, `themes/${theme}.css`)
}
await compile('src/styles/all.scss', 'all.css')
await compile('src/styles/themes.scss', 'themes.css')

// Source imports point at .scss and .ts; published files point at compiled .css and .js.
export const toDist = (text: string) =>
  text.replace(/(['"]\.{1,2}\/[^'"]+)\.scss(['"])/g, '$1.css$2').replace(/(['"]\.{1,2}\/[^'"]+)\.ts(['"])/g, '$1.js$2')

for (const family of await readdir(join(root, 'src/components'))) {
  const dir = join(root, 'src/components', family)
  await compile(`src/components/${family}/${family}.scss`, `components/${family}/${family}.css`)
  for (const file of await readdir(dir)) {
    if (file.endsWith('.astro')) {
      await writeFile(join(dist, 'components', family, file), toDist(await readFile(join(dir, file), 'utf8')))
    }
  }
}
await copyFile(join(root, 'src/env.d.ts'), join(dist, 'env.d.ts'))

// Public Sass helpers for sites that build on the system.
await mkdir(join(dist, 'scss'), { recursive: true })
for (const file of ['_layers.scss', '_theme.scss', '_chamfer.scss']) {
  await copyFile(join(root, 'src/styles', file), join(dist, 'scss', file))
}

// The Astro barrel only re-exports .astro files, which tsc cannot compile; ship it as JS with matching types.
const barrel = await readFile(join(root, 'src/astro.ts'), 'utf8')
await writeFile(join(dist, 'astro.js'), barrel)
await writeFile(join(dist, 'astro.d.ts'), barrel)
