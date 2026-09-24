import { createElement } from 'react'
import { describe, it } from 'vitest'
import { Icon, iconNames } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'
import { Icon as AstroIcon } from '@xaroth.nl/design/astro'

const cases: { name: string; props: Record<string, unknown> }[] = [
  { name: 'labelled', props: { name: 'search', label: 'Search' } },
  { name: 'numeric size', props: { name: 'check', size: 20 } },
  { name: 'length size', props: { name: 'check', size: '1.5rem' } },
  { name: 'extra class and attrs', props: { name: 'github', class: 'site-icon', 'data-test': 'gh' } },
  { name: 'everything', props: { name: 'danger', size: 32, label: 'Error', class: 'site-icon' } },
]

const render = async (props: Record<string, unknown>) => {
  const { class: className, ...rest } = props
  await expectSameHtml(AstroIcon, { props }, createElement(Icon, { ...rest, className } as never))
}

describe('Icon renders the same HTML in Astro and React', () => {
  for (const name of iconNames) {
    it(`icon ${name}`, () => render({ name }))
  }
  for (const { name, props } of cases) {
    it(name, () => render(props))
  }
})
