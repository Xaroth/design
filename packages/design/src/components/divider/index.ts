// plain is a rule, ornament adds the theme's centre mark, label puts text in the middle.
export type DividerVariant = 'plain' | 'ornament' | 'label'

export type DividerOptions = {
  variant?: DividerVariant
  className?: string
}

export const dividerClass = ({ variant = 'plain', className }: DividerOptions = {}): string =>
  ['x-divider', variant !== 'plain' && `x-divider--${variant}`, className].filter(Boolean).join(' ')

// A plain rule is an <hr>. The ornament needs a child, which <hr> cannot hold, so it is a div with the
// separator role. A label is readable text, and separator children are hidden from assistive tech, so the
// label variant is a plain div.
export const dividerState = ({ variant = 'plain' }: Pick<DividerOptions, 'variant'>) =>
  variant === 'plain'
    ? { tag: 'hr' as const, attrs: {} }
    : variant === 'ornament'
      ? { tag: 'div' as const, attrs: { role: 'separator' as const } }
      : { tag: 'div' as const, attrs: {} }
