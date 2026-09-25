import { describe, expect, it } from 'vitest'
import { idProblems, normalize } from '../normalize.ts'

describe('normalize', () => {
  it('sorts attributes and classes and collapses whitespace', () => {
    expect(normalize('<p  id="a" class="b a">x \n  y</p>')).toBe('<p class="a b" id="a">x y</p>')
  })

  it('keeps whitespace in pre, textarea and white-space styled elements', () => {
    expect(normalize('<pre>a\n  <span>b  c</span></pre>')).toBe('<pre>a\n  <span>b  c</span></pre>')
    expect(normalize('<textarea>a\n\n  b</textarea>')).toBe('<textarea>a\n\n  b</textarea>')
    expect(normalize('<div style="white-space: pre-wrap">a  b</div>')).toBe(
      '<div style="white-space: pre-wrap">a  b</div>',
    )
    expect(normalize('<div style="white-space: nowrap">a  b</div>')).toBe('<div style="white-space: nowrap">a b</div>')
  })

  it('tells apart code that differs only in whitespace', () => {
    expect(normalize('<pre>a  b</pre>')).not.toBe(normalize('<pre>a b</pre>'))
  })
})

describe('idProblems', () => {
  it('accepts references to ids in the fragment', () => {
    const html =
      '<label for="i">L</label><input id="i" aria-describedby="h e" aria-errormessage="e"><p id="h"></p><p id="e"></p>'
    expect(idProblems(html)).toEqual([])
  })

  it('reports duplicate and empty ids', () => {
    expect(idProblems('<p id="a"></p><p id="a"></p><p id=""></p>')).toEqual(['duplicate id "a"', 'empty id on <p>'])
  })

  it('reports each missing reference', () => {
    expect(
      idProblems('<label for="x"></label><div aria-labelledby="h" aria-controls="p q"></div><p id="p"></p>'),
    ).toEqual([
      'for="x" on <label> points at missing id "x"',
      'aria-labelledby="h" on <div> points at missing id "h"',
      'aria-controls="p q" on <div> points at missing id "q"',
    ])
  })

  it('reports empty reference lists', () => {
    expect(idProblems('<input aria-describedby=" ">')).toEqual(['empty aria-describedby on <input>'])
  })

  it('allows declared external ids, but not ones the fragment defines', () => {
    expect(idProblems('<div aria-labelledby="head"></div>', ['head'])).toEqual([])
    expect(idProblems('<h2 id="head"></h2>', ['head'])).toEqual(['external id "head" is inside the fragment'])
  })
})
