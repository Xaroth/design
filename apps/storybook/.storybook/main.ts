import type { StorybookConfig } from '@storybook/react-vite'
import { defaultClientConditions } from 'vite'

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
  features: { sidebarOnboardingChecklist: false },
  // Read @xaroth.nl/design from src, so stories update without a package build.
  viteFinal: (vite) => ({
    ...vite,
    resolve: { ...vite.resolve, conditions: ['source', ...defaultClientConditions] },
  }),
}

export default config
