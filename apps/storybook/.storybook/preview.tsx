import type { Decorator, Preview } from '@storybook/react-vite'
import { themeIds, themes } from '@xaroth.nl/design/parts'
import '@xaroth.nl/design/themes.css'
import './preview.css'

// Unknown values (for example a remembered theme that no longer exists) fall back to the first theme.
const withTheme: Decorator = (Story, context) => {
  const selected = context.globals.theme as string
  document.documentElement.dataset.xTheme = (themeIds as readonly string[]).includes(selected) ? selected : themeIds[0]
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
        items: themes.map(({ id, label }) => ({ value: id, title: label })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: themeIds[0] },
  parameters: {
    backgrounds: { disable: true },
    a11y: { test: 'error' },
  },
}

export default preview
