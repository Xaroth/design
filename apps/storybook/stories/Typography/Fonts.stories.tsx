import type { Meta, StoryObj } from '@storybook/react-vite'
import { stack } from './shared.tsx'

const meta = { title: 'Typography/Fonts' } satisfies Meta

export default meta

const fonts = [
  { token: '--x-font-display', use: 'Display and headings' },
  { token: '--x-font-body', use: 'Reading text' },
  { token: '--x-font-ui', use: 'Buttons, labels, controls' },
  { token: '--x-font-mono', use: 'Code and data' },
]

export const Fonts: StoryObj = {
  render: (_args, { globals }) => (
    <div
      key={globals.theme as string}
      style={stack}
    >
      {fonts.map(({ token, use }) => (
        <div key={token}>
          <p className="x-label x-muted">
            {use} <code style={{ textTransform: 'none', letterSpacing: 0 }}>{token}</code>
          </p>
          <p style={{ fontFamily: `var(${token})`, fontSize: '1.75rem', lineHeight: 1.3, marginTop: 8 }}>
            The quick capsuleer jumps over 0123456789
          </p>
          <p
            className="x-small x-muted"
            style={{ fontFamily: 'var(--x-font-mono)' }}
          >
            {getComputedStyle(document.documentElement).getPropertyValue(token)}
          </p>
        </div>
      ))}
    </div>
  ),
}
