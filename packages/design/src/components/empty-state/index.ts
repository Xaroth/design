import { bem } from '../../bem.ts'

export type EmptyStateHeadingLevel = 2 | 3 | 4 | 5 | 6

export type EmptyStateOptions = {
  className?: string
}

const emptyState = bem('x-empty-state')

export const emptyStateClass = ({ className }: EmptyStateOptions = {}): string => emptyState({}, className)
