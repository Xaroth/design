import { describe, expect, it } from 'vitest'
import { bem } from '../../../../packages/design/src/bem.ts'

describe('bem', () => {
  it('gives the block alone without modifiers', () => {
    expect(bem('x-card')()).toBe('x-card')
    expect(bem('x-card')({})).toBe('x-card')
  })

  it('writes true as --key and strings or numbers as --value', () => {
    expect(bem('x-card')({ featured: true, tone: 'danger', cols: 3 })).toBe(
      'x-card x-card--featured x-card--danger x-card--3',
    )
  })

  it('skips false, null, undefined and empty strings', () => {
    expect(bem('x-card')({ a: false, b: null, c: undefined, d: '' })).toBe('x-card')
  })

  it('leaves out values equal to their default', () => {
    const b = bem('x-badge', { defaults: { tone: 'default', cols: 4 } })
    expect(b({ tone: 'default', cols: 4 })).toBe('x-badge')
    expect(b({ tone: 'info', cols: 2 })).toBe('x-badge x-badge--info x-badge--2')
  })

  it('does not treat a default as applying to true', () => {
    expect(bem('x-a', { defaults: { open: 'yes' } })({ open: true })).toBe('x-a x-a--open')
  })

  it('writes prefixed keys with the key in front', () => {
    const b = bem('x-panel', { defaults: { pad: 'md' }, prefixed: ['pad'] })
    expect(b({ pad: 'lg', variant: 'raised' })).toBe('x-panel x-panel--pad-lg x-panel--raised')
    expect(b({ pad: 'md' })).toBe('x-panel')
  })

  it('appends extra classes after modifiers, clsx style', () => {
    expect(bem('x-tag')({ active: true }, 'site', undefined, ['a', { b: true, c: false }])).toBe(
      'x-tag x-tag--active site a b',
    )
  })

  it('builds elements with their own modifiers', () => {
    const b = bem('x-table', { defaults: { align: 'start' } })
    expect(b.el('cell')).toBe('x-table__cell')
    expect(b.el('cell', { align: 'end', num: true }, 'extra')).toBe(
      'x-table__cell x-table__cell--end x-table__cell--num extra',
    )
    expect(b.el('cell', { align: 'start' })).toBe('x-table__cell')
  })
})
