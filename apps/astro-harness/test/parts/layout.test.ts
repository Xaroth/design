import { createElement, type ReactElement, type ReactNode } from 'react'
import { describe, it } from 'vitest'
import AstroContainer from '@xaroth.nl/design/astro/container'
import AstroGrid from '@xaroth.nl/design/astro/grid'
import AstroSection from '@xaroth.nl/design/astro/section'
import AstroSectionHead from '@xaroth.nl/design/astro/section-head'
import { Container, Grid, Section, SectionHead } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'

// Props are loose per case, so the element is built untyped.
const el = (type: unknown, props: object, ...children: ReactNode[]) =>
  createElement(type as never, props as never, ...children) as ReactElement

type Case = { name: string; props: Record<string, unknown> }

const body = '<p>Content</p>'
const children = createElement('p', null, 'Content')

// Wrapper parts: slot content in Astro, children in React. `class` maps to `className`.
const wrappers = [
  {
    part: 'Container',
    astro: AstroContainer,
    react: Container,
    cases: [
      { name: 'default', props: {} },
      { name: 'prose width', props: { width: 'prose' } },
      { name: 'as main with class', props: { as: 'main', class: 'site', id: 'main' } },
    ],
  },
  {
    part: 'Grid',
    astro: AstroGrid,
    react: Grid,
    cases: [
      { name: 'default', props: {} },
      { name: 'as list with class', props: { as: 'ul', class: 'cards', 'aria-label': 'Tools' } },
    ],
  },
  {
    part: 'Section',
    astro: AstroSection,
    react: Section,
    cases: [
      { name: 'default', props: {} },
      { name: 'tight', props: { tight: true } },
      { name: 'as div with label', props: { as: 'div', class: 'home', 'aria-labelledby': 'tools' } },
    ],
  },
] as const

describe('layout wrappers render the same HTML in Astro and React', () => {
  for (const { part, astro, react, cases } of wrappers) {
    for (const { name, props } of cases as readonly Case[]) {
      it(`${part}: ${name}`, async () => {
        const { class: className, ...rest } = props
        await expectSameHtml(astro, { props, slots: { default: body } }, el(react, { ...rest, className }, children))
      })
    }
  }
})

const headCases: Case[] = [
  { name: 'title only', props: { title: 'Tools' } },
  { name: 'eyebrow', props: { title: 'Tools', eyebrow: 'Fitting' } },
  { name: 'sub', props: { title: 'Tools', sub: 'Six tools, each doing one thing well.' } },
  { name: 'link', props: { title: 'Recent posts', link: { label: 'All posts', href: '/blog' } } },
  {
    name: 'everything',
    props: {
      title: 'Recent posts',
      eyebrow: 'Logbook',
      sub: 'Notes from the build.',
      link: { label: 'All posts', href: '/blog' },
      titleId: 'posts',
      level: 3,
      class: 'home-head',
    },
  },
]

describe('SectionHead renders the same HTML in Astro and React', () => {
  for (const { name, props } of headCases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(AstroSectionHead, { props }, el(SectionHead, { ...rest, className }))
    })
  }
})
