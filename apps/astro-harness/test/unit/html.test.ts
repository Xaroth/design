import { describe, expect, it } from 'vitest'
import { describeTrigger } from '@xaroth.nl/design/parts'
import {
  defined,
  findTag,
  firstOnPage,
  getAttr,
  mergeTokens,
  rewriteTag,
  writeTag,
} from '../../../../packages/design/src/html.ts'

const isInput = (tag: { name: string }) => tag.name === 'input'

describe('findTag', () => {
  it('parses quoted values that contain >', () => {
    const tag = findTag('<input title="a > b" data-x=\'c>d\' value=plain>', isInput)
    expect(tag?.attrs.map((a) => [a.name, a.value])).toEqual([
      ['title', 'a > b'],
      ['data-x', 'c>d'],
      ['value', 'plain'],
    ])
  })

  it('decodes entities and reads bare attributes', () => {
    const tag = findTag('<INPUT Required aria-label="Fish &amp; &quot;chips&quot;">', isInput)
    expect(getAttr(tag!, 'required')).toBe(true)
    expect(getAttr(tag!, 'aria-label')).toBe('Fish & "chips"')
  })

  it('skips text, comments, style and script', () => {
    const html = `
      <!-- <input id="comment"> -->
      text with <b>a < b</b>
      <style>.a > input {}</style><script>const s = '<input id="script">'</script>
      <input id="real">`
    expect(getAttr(findTag(html, isInput)!, 'id')).toBe('real')
  })

  it('looks inside wrappers that do not match', () => {
    const html = '<span class="wrap"><label><input id="inner"></label></span>'
    expect(getAttr(findTag(html, isInput)!, 'id')).toBe('inner')
  })

  it('reads self-closing tags', () => {
    const tag = findTag('<input name="a"/>', isInput)
    expect(tag?.selfClosing).toBe(true)
    expect(getAttr(tag!, 'name')).toBe('a')
  })

  it('returns undefined when nothing matches', () => {
    expect(findTag('<p>No control</p>', isInput)).toBeUndefined()
    expect(findTag('', isInput)).toBeUndefined()
  })
})

describe('rewriteTag', () => {
  it('keeps other attributes and appends changed ones', () => {
    const html = '<p>x</p><input title="a > b" id="old" name="n"><p>y</p>'
    expect(rewriteTag(html, isInput, () => ({ id: 'new', required: true }))).toBe(
      '<p>x</p><input title="a > b" name="n" id="new" required><p>y</p>',
    )
  })

  it('leaves attributes alone for undefined and removes them for null', () => {
    const html = '<input aria-invalid="true" disabled>'
    expect(rewriteTag(html, isInput, () => ({ 'aria-invalid': undefined, disabled: null }))).toBe(
      '<input aria-invalid="true">',
    )
  })

  it('writes $ patterns literally', () => {
    const html = '<input id="x"><span>$\'</span>'
    expect(rewriteTag(html, isInput, () => ({ id: "a$&b$1$'" }))).toBe('<input id="a$&amp;b$1$\'"><span>$\'</span>')
  })

  it('escapes written values', () => {
    const tag = findTag('<input>', isInput)!
    expect(writeTag(tag, { title: '"<&>"' })).toBe('<input title="&quot;&lt;&amp;&gt;&quot;">')
  })

  it('keeps self-closing tags self-closing', () => {
    expect(rewriteTag('<input name="a"/>', isInput, () => ({ id: 'x' }))).toBe('<input name="a" id="x" />')
  })

  it('returns the html unchanged when nothing matches', () => {
    const html = '<p>No control</p>'
    expect(rewriteTag(html, isInput, () => ({ id: 'x' }))).toBe(html)
  })
})

describe('describeTrigger', () => {
  it('keeps an existing aria-describedby', () => {
    expect(describeTrigger('<button aria-describedby="note">Scopes</button>', 'tip')).toBe(
      '<button aria-describedby="note tip-tip">Scopes</button>',
    )
  })

  it('does not repeat an id already there', () => {
    expect(describeTrigger('<button aria-describedby="tip-tip">Scopes</button>', 'tip')).toBe(
      '<button aria-describedby="tip-tip">Scopes</button>',
    )
  })

  it('describes the focusable element inside an astro-island', () => {
    const html =
      '<astro-island uid="1" props="{&quot;a&quot;:&quot;x > y&quot;}"><span class="icon"></span><button type="button">Info</button></astro-island>'
    expect(describeTrigger(html, 'tip')).toBe(
      '<astro-island uid="1" props="{&quot;a&quot;:&quot;x > y&quot;}"><span class="icon"></span><button type="button" aria-describedby="tip-tip">Info</button></astro-island>',
    )
  })

  it('skips leading whitespace, comments and style', () => {
    const html = '\n  <!-- trigger --><style>a>b{}</style>\n  <a href="/x">X</a>'
    expect(describeTrigger(html, 'tip')).toBe(
      '\n  <!-- trigger --><style>a>b{}</style>\n  <a href="/x" aria-describedby="tip-tip">X</a>',
    )
  })

  it('handles $ in ids', () => {
    expect(describeTrigger('<button>B</button>', "a$&$'")).toBe('<button aria-describedby="a$&amp;$\'-tip">B</button>')
  })

  it('falls back to the first element that is not a wrapper', () => {
    expect(describeTrigger('<astro-slot><abbr>HP</abbr></astro-slot>', 'tip')).toBe(
      '<astro-slot><abbr aria-describedby="tip-tip">HP</abbr></astro-slot>',
    )
  })

  it('returns plain text unchanged', () => {
    expect(describeTrigger('Just text', 'tip')).toBe('Just text')
  })
})

describe('helpers', () => {
  it('mergeTokens joins in order without repeats', () => {
    expect(mergeTokens('a b', undefined, false, ' b  c ', 'a')).toBe('a b c')
  })

  it('defined drops undefined keys only', () => {
    expect(defined({ a: undefined, b: null, c: '' })).toEqual({ b: null, c: '' })
  })

  it('firstOnPage is true once per scope and key', () => {
    const page = {}
    expect(firstOnPage(page, 'k')).toBe(true)
    expect(firstOnPage(page, 'k')).toBe(false)
    expect(firstOnPage(page, 'other')).toBe(true)
    expect(firstOnPage({}, 'k')).toBe(true)
  })
})
