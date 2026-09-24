import type { Decorator, Preview } from '@storybook/react-vite'
import { themes } from '@xaroth.nl/design/parts'
import '@xaroth.nl/design/scss/core.scss'
import '@xaroth.nl/design/scss/themes/xaroth.scss'
import '@xaroth.nl/design/scss/themes/eve-online.scss'
import './preview.css'

const titles: Record<(typeof themes)[number], string> = {
  xaroth: 'xaroth.nl',
  'eve-online': 'eve-online.tools',
}

// Theme lives on <html>, like a real site, so the whole canvas takes the theme background.
// Unknown values (for example a remembered theme that no longer exists) fall back to the first theme.
const withTheme: Decorator = (Story, context) => {
  const selected = context.globals.theme as string
  document.documentElement.dataset.xTheme = (themes as readonly string[]).includes(selected) ? selected : themes[0]
  return <Story />
}

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: themes.map((value) => ({ value, title: titles[value] })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: themes[0] },
  parameters: {
    backgrounds: { disable: true },
    a11y: { test: 'error' },
  },
}

export default preview
