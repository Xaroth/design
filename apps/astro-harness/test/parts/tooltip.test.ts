import { createElement, type ReactElement } from 'react'
import { describe, it } from 'vitest'
import AstroTooltip from '@xaroth.nl/design/astro/tooltip'
import { Tooltip } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'

type Trigger = { html: string; react: () => ReactElement }

const button: Trigger = {
  html: '<button type="button">Scopes</button>',
  react: () => createElement('button', { type: 'button' }, 'Scopes'),
}
const described: Trigger = {
  html: '<button type="button" aria-describedby="scopes-note">Scopes</button>',
  react: () => createElement('button', { type: 'button', 'aria-describedby': 'scopes-note' }, 'Scopes'),
}
const link: Trigger = {
  html: '<a href="/scopes">Scopes</a>',
  react: () => createElement('a', { href: '/scopes' }, 'Scopes'),
}

const cases: { name: string; props: Record<string, unknown>; trigger: Trigger }[] = [
  { name: 'default', props: {}, trigger: button },
  { name: 'explicit top', props: { placement: 'top' }, trigger: button },
  { name: 'bottom', props: { placement: 'bottom' }, trigger: button },
  { name: 'open', props: { open: true }, trigger: button },
  { name: 'bottom open', props: { placement: 'bottom', open: true }, trigger: link },
  { name: 'keeps existing description', props: {}, trigger: described },
  { name: 'extra class and attrs', props: { class: 'site-tip', 'data-test': 'tip' }, trigger: link },
]

describe('Tooltip renders the same HTML in Astro and React', () => {
  for (const { name, props, trigger } of cases) {
    it(name, async () => {
      const all: Record<string, unknown> = { id: 'scopes', text: 'Two scopes: achievements and standings.', ...props }
      const { class: className, ...rest } = all
      await expectSameHtml(
        AstroTooltip,
        { props: all, slots: { default: trigger.html } },
        createElement(Tooltip, { ...rest, className } as never, trigger.react()),
      )
    })
  }
})
