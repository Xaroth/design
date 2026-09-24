export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonOptions = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

// Single source for class names, used by both the Astro and React parts so their HTML cannot drift.
export const buttonClass = ({ variant = 'primary', size = 'md', className }: ButtonOptions = {}): string =>
  ['x-button', `x-button--${variant}`, size !== 'md' && `x-button--${size}`, className].filter(Boolean).join(' ')
