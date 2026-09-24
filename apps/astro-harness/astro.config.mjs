// @ts-check
import { defineConfig } from 'astro/config'
import { defaultClientConditions, defaultServerConditions } from 'vite'

// `source` makes @xaroth.nl/design resolve to its src files, so the harness needs no package build.
export default defineConfig({
  vite: {
    resolve: { conditions: ['source', ...defaultClientConditions] },
    ssr: { resolve: { conditions: ['source', ...defaultServerConditions] } },
  },
})
