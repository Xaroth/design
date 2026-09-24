/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config'
import { fileURLToPath } from 'node:url'

export default getViteConfig({
  resolve: {
    // Test React parts from source so the check runs without a build.
    alias: {
      '@xaroth.nl/design/react': fileURLToPath(new URL('../../packages/design/src/react/index.ts', import.meta.url)),
    },
  },
  test: {
    include: ['test/parts/*.test.ts'],
  },
})
