import { bem } from '../../bem.ts'

export type CardElement = 'article' | 'div' | 'li'
export type CardHeadingLevel = 2 | 3 | 4 | 5 | 6

export type CardOptions = {
  featured?: boolean
  link?: boolean
  className?: string
}

const card = bem('x-card')

export const cardClass = ({ featured, link, className }: CardOptions = {}): string =>
  card({ link, featured }, className)

// Passed as a number; each theme formats it with a CSS counter (T-01, IV).
export const cardIndexProperty = '--x-card-index'

export const cardIndexValue = (index: number): string => String(Math.trunc(index))

export const cardIndexStyle = (index: number): string => `${cardIndexProperty}:${cardIndexValue(index)}`
