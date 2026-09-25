// Builds this app against the package's dist (no `source` condition) and checks what a site would get.
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const app = join(import.meta.dirname, '..')
const pkgDir = join(app, '../../packages/design')
const pkg = JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'))
const problems: string[] = []

// Every published export must point at a built file.
for (const [key, target] of Object.entries(pkg.publishConfig.exports as Record<string, unknown>)) {
  const paths = typeof target === 'string' ? [target] : Object.values(target as Record<string, string>)
  for (const path of paths) {
    if (path.includes('*')) {
      const dir = join(pkgDir, path.slice(0, path.indexOf('*')))
      if (!existsSync(dir) || readdirSync(dir).length === 0) {
        problems.push(`export ${key}: nothing matches ${path}`)
      }
    } else if (!existsSync(join(pkgDir, path))) {
      problems.push(`export ${key}: missing ${path}`)
    }
  }
}

execFileSync('pnpm', ['exec', 'astro', 'build'], { cwd: app, stdio: 'inherit' })

const assets = join(app, 'dist/_astro')
const css = readdirSync(assets)
  .filter((f) => f.endsWith('.css'))
  .map((f) => readFileSync(join(assets, f), 'utf8'))
  .join('\n')
const html = readFileSync(join(app, 'dist/index.html'), 'utf8')

for (const cls of [
  'x-header',
  'x-page-head',
  'x-alert',
  'x-card',
  'x-tag',
  'x-button',
  'x-badge',
  'x-progress',
  'x-stack-lg',
]) {
  if (!css.includes(`.${cls}`)) {
    problems.push(`CSS is missing .${cls}`)
  }
}
if (!css.includes('#c9a45c')) {
  problems.push('xaroth tokens missing')
}
if (css.includes('#4ddcf2')) {
  problems.push('eve-online tokens leaked into a xaroth page')
}
if (!html.includes('astro-island')) {
  problems.push('React island did not render')
}

if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}
console.log('Published build: exports resolve, page builds, CSS complete, one theme.')
