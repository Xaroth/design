export type EmptyStateHeadingLevel = 2 | 3 | 4 | 5 | 6

export type EmptyStateOptions = {
  className?: string
}

export const emptyStateClass = ({ className }: EmptyStateOptions = {}): string =>
  ['x-empty-state', className].filter(Boolean).join(' ')
