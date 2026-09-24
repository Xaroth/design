import { bem } from '../../bem.ts'

// How loud the button is. Named by role, not look: each theme draws them its own way.
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
// What the button means. Any tone combines with any variant.
export type ButtonTone = 'default' | 'danger' | 'warning' | 'success'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonOptions = {
  variant?: ButtonVariant
  tone?: ButtonTone
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  className?: string
}

export type ButtonStateInput = {
  href?: string
  disabled?: boolean
  loading?: boolean
}

const button = bem('x-button', { defaults: { tone: 'default', size: 'md' } })

export const buttonClass = ({
  variant = 'primary',
  tone = 'default',
  size = 'md',
  fullWidth,
  loading,
  className,
}: ButtonOptions = {}): string => button({ variant, tone, size, full: fullWidth, loading }, className)

// Links cannot be disabled natively, so an inactive link drops its href and is marked aria-disabled.
// Loading keeps a button focusable (aria-disabled instead of disabled) so keyboard focus is not lost mid-action.
export const buttonState = ({ href, disabled, loading }: ButtonStateInput) => {
  const busy = loading ? ('true' as const) : undefined
  if (href !== undefined) {
    const inactive = Boolean(disabled || loading)
    return {
      tag: 'a' as const,
      attrs: {
        href: inactive ? undefined : href,
        'aria-disabled': inactive ? ('true' as const) : undefined,
        'aria-busy': busy,
      },
    }
  }
  return {
    tag: 'button' as const,
    attrs: {
      disabled: disabled || undefined,
      'aria-disabled': loading && !disabled ? ('true' as const) : undefined,
      'aria-busy': busy,
    },
  }
}
