export const themes = ['xaroth', 'eve-online'] as const
export type Theme = (typeof themes)[number]
