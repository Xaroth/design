import { createElement, type ReactNode } from 'react'
import { describe, it } from 'vitest'
import { ConfirmDialog, Dialog } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'
import { ConfirmDialog as AstroConfirmDialog, Dialog as AstroDialog } from '@xaroth.nl/design/astro'

const closed = { open: false, onClose: () => {} }

const split = (props: Record<string, unknown>) => {
  const { class: className, ...rest } = props
  return { ...rest, className, ...closed }
}

const dialogCases: { name: string; props: Record<string, unknown>; body?: boolean; actions?: [string, ReactNode] }[] = [
  { name: 'title and body', props: {}, body: true },
  { name: 'title only', props: {} },
  { name: 'md', props: { size: 'md' }, body: true },
  { name: 'not dismissible', props: { dismissible: false }, body: true },
  { name: 'no close button', props: { closeButton: false }, body: true },
  { name: 'close label', props: { closeLabel: 'Sluiten' }, body: true },
  {
    name: 'actions',
    props: {},
    body: true,
    actions: ['<a href="/fits">Open</a>', createElement('a', { href: '/fits' }, 'Open')],
  },
  { name: 'user describedby wins', props: { 'aria-describedby': 'fit-note' }, body: true },
  { name: 'extra class and attrs', props: { class: 'site-dialog', 'data-test': 'd' }, body: true },
]

describe('Dialog renders the same HTML in Astro and React', () => {
  for (const { name, props, body, actions } of dialogCases) {
    it(name, async () => {
      const all = { id: 'fit', title: 'Fit details', ...props }
      const slots: Record<string, string> = {}
      const react: Record<string, unknown> = split(all)
      if (body) {
        slots.default = 'Shield PvE, T2 fitted.'
      }
      if (actions) {
        slots.actions = actions[0]
        react.actions = actions[1]
      }
      await expectSameHtml(
        AstroDialog,
        { props: all, slots },
        createElement(Dialog, react as never, body ? 'Shield PvE, T2 fitted.' : undefined),
        { externalIds: ['fit-note'] },
      )
    })
  }
})

const confirmCases: { name: string; props: Record<string, unknown> }[] = [
  { name: 'default tone', props: {} },
  { name: 'danger', props: { tone: 'danger' } },
  { name: 'danger pending', props: { tone: 'danger', pending: true } },
  { name: 'pending', props: { pending: true } },
  { name: 'cancel label', props: { cancelLabel: 'Keep' } },
  { name: 'md with class', props: { size: 'md', class: 'site-confirm' } },
]

describe('ConfirmDialog renders the same HTML in Astro and React', () => {
  for (const { name, props } of confirmCases) {
    it(name, async () => {
      const all = { id: 'remove', title: 'Remove character', confirmLabel: 'Remove', ...props }
      const body = 'Remove Xaroth Brook and its stored token?'
      await expectSameHtml(
        AstroConfirmDialog,
        { props: all, slots: { default: body } },
        createElement(ConfirmDialog, { ...split(all), onConfirm: () => {} } as never, body),
      )
    })
  }
})
