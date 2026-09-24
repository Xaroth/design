import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as sass from 'sass'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const entries: Record<string, string> = {
  'core.css': 'src/styles/core.scss',
  'themes/xaroth.css': 'src/styles/themes/xaroth.scss',
  'themes/eve-online.css': 'src/styles/themes/eve-online.scss',
}

for (const [out, src] of Object.entries(entries)) {
  const { css } = sass.compile(join(root, src), { style: 'expanded', loadPaths: [join(root, 'src/styles')] })
  const file = join(root, 'dist', out)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, `${css}\n`)
}
