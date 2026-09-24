import { bem } from '../../bem.ts'

// Stacked: term above value. Inline: term left, value pushed right. Columns: term in a fixed column, value left
// next to it; stacks under 640px.
export type DescriptionListLayout = 'stacked' | 'inline' | 'columns'

export type DescriptionListItem<T = string> = { term: string; value: T }

export type DescriptionListOptions = {
  layout?: DescriptionListLayout
  dividers?: boolean
  className?: string
}

const descriptionList = bem('x-description-list', { defaults: { layout: 'stacked' } })

export const descriptionListClass = ({
  layout = 'stacked',
  dividers,
  className,
}: DescriptionListOptions = {}): string => descriptionList({ layout, dividers }, className)

// Astro: markup for one value goes in a named slot, overriding the item value.
export const descriptionListValueSlot = (index: number): string => `value-${index}`
