// Single source for the theme list: scripts, package exports, Storybook and the harness read it.
export const themes = [
  { id: 'xaroth', label: 'xaroth.nl' },
  { id: 'eve-online', label: 'eve-online.tools' },
] as const

export type Theme = (typeof themes)[number]['id']

export const themeIds: readonly Theme[] = themes.map((t) => t.id)
