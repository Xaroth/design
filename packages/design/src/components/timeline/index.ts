import { bem } from '../../bem.ts'

// One entry on the timeline. `date` is machine-readable (for example '2019' or '2019-03') and renders in <time>;
// `label` is the text shown, defaulting to `date`. At least one of the two is required.
type TimelineWhen = { date: string; label?: string } | { date?: undefined; label: string }

export type TimelineEntry<T = string> = TimelineWhen & {
  title: T
  text?: T
  // The newest or active entry. Themes light its node.
  current?: boolean
}

export type TimelineHeadingLevel = 2 | 3 | 4 | 5 | 6

export type TimelineOptions = {
  className?: string
}

const timeline = bem('x-timeline')

export const timelineClass = ({ className }: TimelineOptions = {}): string => timeline({}, className)

export const timelineItemClass = ({ current }: { current?: boolean } = {}): string => timeline.el('item', { current })

export const timelineHeading = (level: TimelineHeadingLevel = 3) => `h${level}` as const
