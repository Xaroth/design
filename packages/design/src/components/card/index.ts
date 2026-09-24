export type CardElement = 'article' | 'div' | 'li'
export type CardHeadingLevel = 2 | 3 | 4 | 5 | 6

export type CardOptions = {
  featured?: boolean
  link?: boolean
  className?: string
}

export const cardClass = ({ featured, link, className }: CardOptions = {}): string =>
  ['x-card', link && 'x-card--link', featured && 'x-card--featured', className].filter(Boolean).join(' ')

// The index is passed as a number; each theme formats it with a CSS counter (T-01, IV, ...).
export const cardIndexProperty = '--x-card-index'

export const cardIndexValue = (index: number): string => String(Math.trunc(index))

export const cardIndexStyle = (index: number): string => `${cardIndexProperty}:${cardIndexValue(index)}`
