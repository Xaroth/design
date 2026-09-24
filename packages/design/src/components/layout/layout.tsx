import './layout.scss'
import { createElement, type HTMLAttributes, type ReactNode } from 'react'
import { Button } from '../button/button.tsx'
import {
  containerClass,
  gridClass,
  sectionClass,
  sectionHeadClass,
  sectionHeadTag,
  type ContainerOptions,
  type SectionHeadLevel,
  type SectionHeadLink,
  type SectionOptions,
} from './index.ts'

export type ContainerProps = HTMLAttributes<HTMLElement> &
  Omit<ContainerOptions, 'className'> & {
    as?: 'div' | 'main' | 'header' | 'footer' | 'article' | 'nav'
  }

export function Container({ width, as: Tag = 'div', className, ...rest }: ContainerProps) {
  return (
    <Tag
      {...rest}
      className={containerClass({ width, className })}
    />
  )
}

export type GridProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'main' | 'section' | 'article' | 'ul' | 'ol'
}

export function Grid({ as: Tag = 'div', className, ...rest }: GridProps) {
  return (
    <Tag
      {...(rest as HTMLAttributes<HTMLElement>)}
      className={gridClass({ className })}
    />
  )
}

export type SectionProps = HTMLAttributes<HTMLElement> &
  Omit<SectionOptions, 'className'> & {
    as?: 'section' | 'div' | 'article' | 'aside'
  }

export function Section({ tight, as: Tag = 'section', className, ...rest }: SectionProps) {
  return (
    <Tag
      {...rest}
      className={sectionClass({ tight, className })}
    />
  )
}

export type SectionHeadProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  title: ReactNode
  eyebrow?: ReactNode
  sub?: ReactNode
  link?: SectionHeadLink
  level?: SectionHeadLevel
  titleId?: string
}

export function SectionHead({ title, eyebrow, sub, link, level, titleId, className, ...rest }: SectionHeadProps) {
  return (
    <header
      {...rest}
      className={sectionHeadClass({ className })}
    >
      <div className="x-section-head__titles">
        {eyebrow != null && eyebrow !== '' && <p className="x-section-head__eyebrow">{eyebrow}</p>}
        {createElement(sectionHeadTag(level), { className: 'x-section-head__title', id: titleId }, title)}
        {sub != null && sub !== '' && <p className="x-section-head__sub">{sub}</p>}
      </div>
      {link && (
        <Button
          className="x-section-head__link"
          variant="tertiary"
          size="sm"
          href={link.href}
          end={<span aria-hidden="true">→</span>}
        >
          {link.label}
        </Button>
      )}
    </header>
  )
}
