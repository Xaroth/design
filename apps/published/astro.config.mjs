// @ts-check
import react from '@astrojs/react'
import { defineConfig } from 'astro/config'

// No `source` condition: this app resolves @xaroth.nl/design exactly like a site that installed it.
export default defineConfig({ integrations: [react()] })
