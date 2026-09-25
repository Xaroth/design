// Opens every built story in every theme, fails on render errors and on axe WCAG 2.2 AA violations.
// Run after `storybook build`. Set PLAYWRIGHT_CHROMIUM to use a specific browser binary.
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { extname, join } from 'node:path'
import { themeIds } from '@xaroth.nl/design/parts'
import { chromium } from 'playwright-core'

const root = join(import.meta.dirname, '..', 'storybook-static')
const require = createRequire(import.meta.url)
const axeSource = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8')
const types: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
}

const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname)
  try {
    const body = await readFile(join(root, path.endsWith('/') ? `${path}index.html` : path))
    res.writeHead(200, { 'content-type': types[extname(path)] ?? 'application/octet-stream' })
    res.end(body)
  } catch {
    res.writeHead(404).end()
  }
})
await new Promise<void>((resolve) => server.listen(0, resolve))
const { port } = server.address() as { port: number }

const index = JSON.parse(await readFile(join(root, 'index.json'), 'utf8')) as {
  entries: Record<string, { id: string; type: string; title: string; name: string }>
}
const stories = Object.values(index.entries).filter((e) => e.type === 'story')

const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM || undefined })
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } })
await context.addInitScript({ content: axeSource })
const failures: string[] = []

const check = async (theme: string, story: (typeof stories)[number]) => {
  const page = await context.newPage()
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  // a11y.manual stops the addon's own axe run, which would race this one ("Axe is already running").
  await page.goto(
    `http://localhost:${port}/iframe.html?id=${story.id}&viewMode=story&globals=theme:${theme};a11y.manual:!true`,
  )
  await page
    .waitForFunction(() => document.querySelector('#storybook-root')?.childElementCount, null, { timeout: 15000 })
    .catch(() => errors.push('story did not render'))
  await page.evaluate(() => document.fonts.ready)
  const violations = await page.evaluate(async () => {
    const result = await (window as any).axe.run('#storybook-root', {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
    })
    return result.violations.map(
      (v: any) =>
        `${v.id}: ${v.help} (${v.nodes
          .map((n: any) => n.target.join(' '))
          .slice(0, 3)
          .join(', ')})`,
    )
  })
  for (const message of [...errors, ...violations]) {
    failures.push(`${theme} ${story.title} / ${story.name}: ${message}`)
  }
  await page.close()
}

// A few pages at a time: the check is dominated by page load and font waits, not CPU.
const jobs = themeIds.flatMap((theme) => stories.map((story) => () => check(theme, story)))
const workers = Array.from({ length: Math.min(6, jobs.length) }, async () => {
  for (let job = jobs.shift(); job; job = jobs.shift()) {
    await job()
  }
})
await Promise.all(workers)

await browser.close()
server.close()

if (failures.length) {
  console.error(failures.join('\n'))
  console.error(`\n${failures.length} problem(s) in ${stories.length} stories x ${themeIds.length} themes.`)
  process.exit(1)
}
console.log(`${stories.length} stories x ${themeIds.length} themes: rendered, no axe violations.`)
