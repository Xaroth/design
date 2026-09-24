import type { HTMLAttributes, ReactNode } from 'react'
import {
  timelineClass,
  timelineHeading,
  timelineItemClass,
  type TimelineEntry,
  type TimelineHeadingLevel,
} from '../parts/timeline.ts'

export type TimelineProps = Omit<HTMLAttributes<HTMLOListElement>, 'children'> & {
  items: TimelineEntry<ReactNode>[]
  /** Heading level of each entry title. */
  headingLevel?: TimelineHeadingLevel
}

export function Timeline({ items, headingLevel, className, ...rest }: TimelineProps) {
  const Heading = timelineHeading(headingLevel)
  return (
    <ol
      {...rest}
      className={timelineClass({ className })}
    >
      {items.map(({ date, label, title, text, current }, i) => (
        <li
          key={i}
          className={timelineItemClass({ current })}
        >
          {date ? (
            <time
              className="x-timeline__date"
              dateTime={date}
            >
              {label ?? date}
            </time>
          ) : (
            <span className="x-timeline__date">{label}</span>
          )}
          <div className="x-timeline__body">
            <Heading className="x-timeline__title">{title}</Heading>
            {text != null && text !== '' && <p className="x-timeline__text">{text}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}
