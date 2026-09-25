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
  type?: 'button' | 'submit' | 'reset'
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
// Loading keeps a plain button focusable (aria-disabled instead of disabled) so keyboard focus is not lost
// mid-action. A loading submit or reset button is disabled, since without JS aria-disabled would not stop it.
// Keys are only present when set, so they never erase a user attribute.
export const buttonState = ({ href, disabled, loading, type = 'button' }: ButtonStateInput) => {
  const busy = loading ? { 'aria-busy': 'true' as const } : {}
  if (href !== undefined) {
    const inactive = Boolean(disabled || loading)
    return {
      tag: 'a' as const,
      attrs: inactive ? { 'aria-disabled': 'true' as const, ...busy } : { href, ...busy },
    }
  }
  const native = Boolean(disabled || (loading && type !== 'button'))
  return {
    tag: 'button' as const,
    attrs: {
      type,
      ...(native ? { disabled: true } : loading ? { 'aria-disabled': 'true' as const } : {}),
      ...busy,
    },
  }
}
