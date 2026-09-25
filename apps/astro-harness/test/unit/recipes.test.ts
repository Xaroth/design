import { describe, expect, it } from 'vitest'
import {
  alertRole,
  avatarInitials,
  brandState,
  breadcrumbState,
  buttonState,
  choiceGroupAttrs,
  describedBy,
  fieldControlAttrs,
  fieldIds,
  mergeDescribedBy,
  navLinkAttrs,
  panelClass,
  progressClass,
  progressState,
  progressStyle,
  statClass,
  statGroupClass,
  tableCellAlign,
  tableCellClass,
  tagState,
  timelineHeading,
  timelineItemClass,
  tooltipId,
  wireControlHtml,
} from '@xaroth.nl/design/parts'

describe('buttonState', () => {
  it('is a plain button by default', () => {
    expect(buttonState({})).toEqual({ tag: 'button', attrs: { type: 'button' } })
  })

  it('disables natively', () => {
    expect(buttonState({ disabled: true }).attrs).toEqual({ type: 'button', disabled: true })
  })

  it('keeps a loading plain button focusable', () => {
    expect(buttonState({ loading: true }).attrs).toEqual({
      type: 'button',
      'aria-disabled': 'true',
      'aria-busy': 'true',
    })
  })

  it('disables a loading submit or reset natively', () => {
    for (const type of ['submit', 'reset'] as const) {
      expect(buttonState({ loading: true, type }).attrs).toEqual({ type, disabled: true, 'aria-busy': 'true' })
    }
  })

  it('prefers native disabled over aria-disabled when both apply', () => {
    expect(buttonState({ loading: true, disabled: true }).attrs).toEqual({
      type: 'button',
      disabled: true,
      'aria-busy': 'true',
    })
  })

  it('renders a link and drops the href when inactive', () => {
    expect(buttonState({ href: '/tools' })).toEqual({ tag: 'a', attrs: { href: '/tools' } })
    expect(buttonState({ href: '/tools', disabled: true })).toEqual({ tag: 'a', attrs: { 'aria-disabled': 'true' } })
    expect(buttonState({ href: '/tools', loading: true }).attrs).toEqual({
      'aria-disabled': 'true',
      'aria-busy': 'true',
    })
  })

  it('never gives a link a type', () => {
    expect(buttonState({ href: '', type: 'submit' }).attrs).toEqual({ href: '' })
  })
})

describe('field wiring', () => {
  it('derives help and error ids', () => {
    expect(fieldIds('cid')).toEqual({ help: 'cid-help', error: 'cid-error' })
  })

  it('sets only the id without help, error or required', () => {
    expect(fieldControlAttrs({ id: 'x' })).toEqual({
      id: 'x',
      'aria-describedby': undefined,
      'aria-invalid': undefined,
      required: undefined,
    })
  })

  it('describes help before error and marks invalid and required', () => {
    expect(fieldControlAttrs({ id: 'x', hasDescription: true, hasError: true, required: true })).toEqual({
      id: 'x',
      'aria-describedby': 'x-help x-error',
      'aria-invalid': 'true',
      required: true,
    })
    expect(fieldControlAttrs({ id: 'x', hasError: true })['aria-describedby']).toBe('x-error')
  })

  it('merges described-by lists without repeats', () => {
    expect(mergeDescribedBy(undefined, undefined)).toBeUndefined()
    expect(mergeDescribedBy('', '')).toBeUndefined()
    expect(mergeDescribedBy('x-help', 'note x-help')).toBe('x-help note')
  })

  it('makes radio groups a required, invalid radiogroup', () => {
    expect(choiceGroupAttrs({ id: 'g', kind: 'radio', hasError: true, required: true, describedBy: 'note' })).toEqual({
      id: 'g',
      role: 'radiogroup',
      'aria-describedby': 'g-error note',
      'aria-invalid': 'true',
      'aria-required': 'true',
    })
  })

  it('keeps checkbox groups a plain fieldset', () => {
    expect(
      choiceGroupAttrs({ id: 'g', kind: 'checkbox', hasDescription: true, hasError: true, required: true }),
    ).toEqual({
      id: 'g',
      role: undefined,
      'aria-describedby': 'g-help g-error',
      'aria-invalid': undefined,
      'aria-required': undefined,
    })
  })

  it('wires the first control inside wrappers and keeps its own attributes', () => {
    const attrs = fieldControlAttrs({ id: 'f', hasDescription: true, required: true })
    expect(wireControlHtml('<span class="wrap"><input id="own" aria-describedby="note" name="n"></span>', attrs)).toBe(
      '<span class="wrap"><input name="n" id="f" aria-describedby="f-help note" required></span>',
    )
  })

  it('does not add required twice', () => {
    const attrs = fieldControlAttrs({ id: 'f', required: true })
    expect(wireControlHtml('<select required></select>', attrs)).toBe('<select required id="f"></select>')
  })

  it('wires the input inside a choice label', () => {
    const attrs = fieldControlAttrs({ id: 'f', hasError: true })
    expect(wireControlHtml('<label><input type="checkbox"> Agree</label>', attrs)).toBe(
      '<label><input type="checkbox" id="f" aria-describedby="f-error" aria-invalid="true"> Agree</label>',
    )
  })
})

describe('alertRole', () => {
  it('is a status unless urgent', () => {
    expect(alertRole()).toBe('status')
    expect(alertRole(false)).toBe('status')
    expect(alertRole(true)).toBe('alert')
  })

  it('lets a user role win, and null fall back', () => {
    expect(alertRole(true, 'log')).toBe('log')
    expect(alertRole(true, null)).toBe('alert')
  })
})

describe('progressState', () => {
  it('reports a value on 0..100 by default', () => {
    expect(progressState({ value: 72, label: 'Upload' })).toEqual({
      width: '72%',
      text: undefined,
      attrs: {
        role: 'progressbar',
        'aria-label': 'Upload',
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': 72,
      },
    })
  })

  it('clamps into 0..max', () => {
    expect(progressState({ value: 140 }).attrs['aria-valuenow']).toBe(100)
    expect(progressState({ value: -5 }).attrs['aria-valuenow']).toBe(0)
    expect(progressState({ value: 12, max: 8 })).toMatchObject({ width: '100%', attrs: { 'aria-valuenow': 8 } })
  })

  it('falls back to 100 for a max that is not positive', () => {
    expect(progressState({ value: 50, max: 0 }).attrs['aria-valuemax']).toBe(100)
    expect(progressState({ value: 50, max: -3 }).attrs['aria-valuemax']).toBe(100)
  })

  it('is indeterminate without a value or with NaN', () => {
    for (const value of [undefined, Number.NaN]) {
      const state = progressState({ value, showValue: true })
      expect(state.width).toBeUndefined()
      expect(state.text).toBeUndefined()
      expect(state.attrs).not.toHaveProperty('aria-valuenow')
      expect(state.attrs).not.toHaveProperty('aria-valuetext')
    }
  })

  it('shows a rounded percentage as text and valuetext only with showValue', () => {
    expect(progressState({ value: 1, max: 3 })).toMatchObject({ width: '33.33%', text: undefined })
    expect(progressState({ value: 1, max: 3 }).attrs).not.toHaveProperty('aria-valuetext')
    const shown = progressState({ value: 1, max: 3, showValue: true })
    expect(shown.text).toBe('33%')
    expect(shown.attrs['aria-valuetext']).toBe('33%')
  })

  it('leaves out aria-label without a label', () => {
    expect(progressState({ value: 1 }).attrs).not.toHaveProperty('aria-label')
  })

  it('writes the width as a custom property', () => {
    expect(progressStyle('50%')).toBe('--x-progress:50%')
    expect(progressStyle(undefined)).toBeUndefined()
  })
})

describe('progressClass', () => {
  it('marks indeterminate, empty and done', () => {
    expect(progressClass()).toBe('x-progress x-progress--indeterminate')
    expect(progressClass({ value: 0 })).toBe('x-progress x-progress--empty')
    expect(progressClass({ value: 120 })).toBe('x-progress x-progress--done')
    expect(progressClass({ value: 50 })).toBe('x-progress')
  })

  it('adds a gradient from the start tone', () => {
    expect(progressClass({ value: 50, tone: 'success', startTone: 'danger', size: 'sm' })).toBe(
      'x-progress x-progress--sm x-progress--success x-progress--gradient x-progress--from-danger',
    )
  })
})

describe('tableCellClass', () => {
  it('gives start-aligned text cells no class', () => {
    expect(tableCellClass({ key: 'a', label: 'A' }, 'head')).toBeUndefined()
    expect(tableCellClass({ key: 'a', label: 'A' }, 'body')).toBeUndefined()
  })

  it('end-aligns numeric columns and adds the numeric look to body cells only', () => {
    const column = { key: 'n', label: 'N', numeric: true }
    expect(tableCellClass(column, 'head')).toBe('x-table__cell x-table__cell--end')
    expect(tableCellClass(column, 'body')).toBe('x-table__cell x-table__cell--end x-table__cell--num')
  })

  it('lets an explicit align win over numeric', () => {
    const column = { key: 'n', label: 'N', numeric: true, align: 'start' } as const
    expect(tableCellAlign(column)).toBe('start')
    expect(tableCellClass(column, 'head')).toBeUndefined()
    expect(tableCellClass(column, 'body')).toBe('x-table__cell x-table__cell--num')
    expect(tableCellClass({ key: 'c', label: 'C', align: 'center' }, 'head')).toBe(
      'x-table__cell x-table__cell--center',
    )
  })
})

describe('timeline', () => {
  it('defaults headings to h3', () => {
    expect(timelineHeading()).toBe('h3')
    expect(timelineHeading(5)).toBe('h5')
  })

  it('marks the current item', () => {
    expect(timelineItemClass()).toBe('x-timeline__item')
    expect(timelineItemClass({ current: true })).toBe('x-timeline__item x-timeline__item--current')
  })
})

describe('tooltip describedBy', () => {
  it('points at the tooltip id', () => {
    expect(tooltipId('scopes')).toBe('scopes-tip')
    expect(describedBy(undefined, 'scopes')).toBe('scopes-tip')
    expect(describedBy('', 'scopes')).toBe('scopes-tip')
  })

  it('keeps existing ids first and does not repeat its own', () => {
    expect(describedBy('note', 'scopes')).toBe('note scopes-tip')
    expect(describedBy(' scopes-tip  note ', 'scopes')).toBe('scopes-tip note')
  })
})

describe('header', () => {
  it('marks only the current nav link', () => {
    expect(navLinkAttrs({ label: 'Home', href: '/', current: true })).toEqual({ href: '/', 'aria-current': 'page' })
    expect(navLinkAttrs({ label: 'Tools', href: '/tools' })).toEqual({ href: '/tools' })
    expect(navLinkAttrs({ label: 'Tools', href: '/tools', current: false })).not.toHaveProperty('aria-current')
  })

  it('names the brand only when it is a link', () => {
    expect(brandState(undefined, 'Home')).toEqual({ tag: 'div', attrs: {} })
    expect(brandState('/', 'Home')).toEqual({ tag: 'a', attrs: { href: '/', 'aria-label': 'Home' } })
    expect(brandState('/')).toEqual({ tag: 'a', attrs: { href: '/' } })
  })
})

describe('stat and panel classes', () => {
  it('stat group leaves out the default column count', () => {
    expect(statGroupClass()).toBe('x-stat-group x-stat-group--plain')
    expect(statGroupClass({ variant: 'framed', columns: 3, className: 'site' })).toBe(
      'x-stat-group x-stat-group--framed x-stat-group--cols-3 site',
    )
  })

  it('stat leaves out the default tone', () => {
    expect(statClass()).toBe('x-stat')
    expect(statClass({ tone: 'muted' })).toBe('x-stat x-stat--muted')
  })

  it('panel leaves out defaults and prefixes padding', () => {
    expect(panelClass()).toBe('x-panel')
    expect(panelClass({ variant: 'callout', padding: 'none', marks: true, className: 's' })).toBe(
      'x-panel x-panel--callout x-panel--pad-none x-panel--marks s',
    )
  })
})

describe('other state helpers', () => {
  it('avatarInitials takes the first and last word', () => {
    expect(avatarInitials('xaroth brook')).toBe('XB')
    expect(avatarInitials('  Xaroth  ')).toBe('X')
    expect(avatarInitials('Ana de la Cruz')).toBe('AC')
    expect(avatarInitials('')).toBe('')
  })

  it('breadcrumbState never links the last item', () => {
    expect(breadcrumbState({ label: 'Here', href: '/here' }, 2, 3).tag).toBe('span')
    expect(breadcrumbState({ label: 'Here', href: '/here' }, 2, 3).attrs).toMatchObject({ 'aria-current': 'page' })
    expect(breadcrumbState({ label: 'Up', href: '/' }, 0, 3)).toMatchObject({ tag: 'a', attrs: { href: '/' } })
    expect(breadcrumbState({ label: 'Group' }, 1, 3).tag).toBe('span')
  })

  it('tagState marks only active links current', () => {
    expect(tagState({ href: '/t', active: true })).toEqual({ tag: 'a', attrs: { href: '/t', 'aria-current': 'true' } })
    expect(tagState({ href: '/t' })).toEqual({ tag: 'a', attrs: { href: '/t' } })
    expect(tagState({ active: true })).toEqual({ tag: 'span', attrs: {} })
  })
})
