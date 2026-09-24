import { createElement } from 'react'
import { describe, it } from 'vitest'
import { Progress } from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'
import { Progress as AstroProgress } from '@xaroth.nl/design/astro'

const cases: { name: string; props: Record<string, unknown> }[] = [
  { name: 'value', props: { value: 72, label: 'Upload' } },
  { name: 'zero', props: { value: 0, label: 'Upload' } },
  { name: 'done', props: { value: 100, label: 'Upload' } },
  { name: 'clamped above max', props: { value: 140, label: 'Upload' } },
  { name: 'clamped below zero', props: { value: -5, label: 'Upload' } },
  { name: 'custom max', props: { value: 3, max: 8, label: 'Steps', showValue: true } },
  { name: 'fractional', props: { value: 1, max: 3, label: 'Thirds', showValue: true } },
  { name: 'show value', props: { value: 72, label: 'Upload', showValue: true } },
  { name: 'indeterminate', props: { label: 'Loading' } },
  { name: 'indeterminate ignores showValue', props: { label: 'Loading', showValue: true } },
  { name: 'small', props: { value: 40, size: 'sm', label: 'Upload' } },
  { name: 'explicit md', props: { value: 40, size: 'md', label: 'Upload' } },
  { name: 'explicit default tone', props: { value: 40, tone: 'default', label: 'Upload' } },
  { name: 'info', props: { value: 40, tone: 'info', label: 'Upload' } },
  { name: 'success', props: { value: 40, tone: 'success', label: 'Upload' } },
  { name: 'warning', props: { value: 40, tone: 'warning', label: 'Upload' } },
  { name: 'danger done', props: { value: 100, tone: 'danger', label: 'Upload' } },
  { name: 'gradient', props: { value: 30, startTone: 'danger', tone: 'success', label: 'Health' } },
  { name: 'gradient from default', props: { value: 60, startTone: 'default', tone: 'warning', label: 'Heat' } },
  { name: 'gradient to default tone', props: { value: 60, startTone: 'info', label: 'Sync' } },
  { name: 'gradient done', props: { value: 100, startTone: 'warning', label: 'Charge', showValue: true } },
  { name: 'gradient indeterminate', props: { startTone: 'info', tone: 'success', label: 'Loading' } },
  { name: 'gradient small', props: { value: 45, startTone: 'danger', tone: 'success', size: 'sm', label: 'Health' } },
  { name: 'labelledby', props: { value: 10, 'aria-labelledby': 'progress-head' } },
  {
    name: 'extra class and attrs',
    props: { value: 55, label: 'Upload', class: 'site-progress', id: 'p1', title: 'Upload' },
  },
]

describe('Progress renders the same HTML in Astro and React', () => {
  for (const { name, props } of cases) {
    it(name, async () => {
      const { class: className, ...rest } = props
      await expectSameHtml(AstroProgress, { props }, createElement(Progress, { ...rest, className } as never))
    })
  }
})
