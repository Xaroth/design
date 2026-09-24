// How much the surface stands out. Named by role: each theme draws them its own way.
// Callout is the one loud block on a page, such as a closing call to action.
export type PanelVariant = 'plain' | 'raised' | 'accent' | 'callout'
export type PanelPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl'
export type PanelElement = 'div' | 'section' | 'article' | 'aside' | 'li' | 'form' | 'header' | 'footer'

export type PanelOptions = {
  variant?: PanelVariant
  /** Corner ornament: brackets on eve-online, a gold top line on xaroth. */
  marks?: boolean
  padding?: PanelPadding
  className?: string
}

export const panelClass = ({ variant = 'plain', marks, padding = 'md', className }: PanelOptions = {}): string =>
  [
    'x-panel',
    variant !== 'plain' && `x-panel--${variant}`,
    padding !== 'md' && `x-panel--pad-${padding}`,
    marks && 'x-panel--marks',
    className,
  ]
    .filter(Boolean)
    .join(' ')
