// tsc keeps `import './x.scss'`; point compiled JS at the compiled stylesheet.
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

for (const entry of await readdir(dist, { recursive: true })) {
  if (entry.endsWith('.js')) {
    const file = join(dist, entry)
    const text = await readFile(file, 'utf8')
    const next = text.replace(/(['"]\.{1,2}\/[^'"]+)\.scss(['"])/g, '$1.css$2')
    if (next !== text) {
      await writeFile(file, next)
    }
  }
}
