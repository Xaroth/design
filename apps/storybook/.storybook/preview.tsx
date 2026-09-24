import type { Decorator, Preview } from '@storybook/react-vite'
import '@xaroth.nl/design/scss/core.scss'
import '@xaroth.nl/design/scss/themes/xaroth.scss'
import '@xaroth.nl/design/scss/themes/eve-online.scss'

const themes = ['xaroth', 'eve-online'] as const

// Stories always render inside a theme wrapper; "both" shows the story once per theme.
const withTheme: Decorator = (Story, context) => {
  const selected = context.globals.theme as string
  document.documentElement.dataset.xTheme = 'multi'
  const shown = selected === 'both' ? themes : [selected]
  return (
    <div style={{ display: 'grid', gap: 0 }}>
      {shown.map((theme) => (
        <div
          key={theme}
          data-x-theme={theme}
          style={{ padding: 24 }}
        >
          <Story />
        </div>
      ))}
    </div>
  )
}

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'xaroth', title: 'xaroth.nl' },
          { value: 'eve-online', title: 'eve-online.tools' },
          { value: 'both', title: 'Both' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'both' },
  parameters: {
    layout: 'fullscreen',
    a11y: { test: 'error' },
  },
}

export default preview
