import { createElement } from 'react'
import { describe, it } from 'vitest'
import { Modal } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'
import { Modal as AstroModal } from '@xaroth.nl/design/astro'

// React also takes `open` and `onClose`; it renders closed on the server and opens in an effect.
const cases: { name: string; props: Record<string, unknown> }[] = [
  { name: 'default', props: {} },
  { name: 'explicit sm', props: { size: 'sm' } },
  { name: 'md', props: { size: 'md' } },
  { name: 'not dismissible', props: { dismissible: false } },
  { name: 'labelled', props: { 'aria-label': 'Fit preview' } },
  { name: 'extra class and attrs', props: { class: 'site-modal', 'data-test': 'm' } },
]

describe('Modal renders the same HTML in Astro and React', () => {
  for (const { name, props } of cases) {
    it(name, async () => {
      const all: Record<string, unknown> = { id: 'fit', ...props }
      const { class: className, ...rest } = all
      const body = '<p>Drake Navy Issue</p>'
      await expectSameHtml(
        AstroModal,
        { props: all, slots: { default: body } },
        createElement(
          Modal,
          { ...rest, className, open: false, onClose: () => {} } as never,
          createElement('p', null, 'Drake Navy Issue'),
        ),
      )
    })
  }
})
