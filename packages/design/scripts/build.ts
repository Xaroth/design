// Builds dist: theme and all.css bundles, one stylesheet per component family, and the .astro files with their
// imports pointed at compiled output. TypeScript output comes from tsc (build:js).
import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as sass from 'sass'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const compile = async (src: string, out: string) => {
  const { css } = sass.compile(join(root, src), { style: 'expanded' })
  await mkdir(dirname(join(dist, out)), { recursive: true })
  await writeFile(join(dist, out), `${css}\n`)
}

await compile('src/styles/themes/xaroth.scss', 'themes/xaroth.css')
await compile('src/styles/themes/eve-online.scss', 'themes/eve-online.css')
await compile('src/styles/all.scss', 'all.css')

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
