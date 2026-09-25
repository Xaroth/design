import { describe, expect, it } from 'vitest'
import { codeHtml, tokenizeCode } from '@xaroth.nl/design/parts'

const typed = (code: string, lang?: string) =>
  tokenizeCode(code, lang)
    .filter((t) => t.type)
    .map((t) => [t.type, t.text])

describe('tokenizeCode', () => {
  it('loses no text', () => {
    const code = 'const a = "x" // c\n/* b */ fn(0x1F, 2.5e3)\n'
    expect(
      tokenizeCode(code, 'ts')
        .map((t) => t.text)
        .join(''),
    ).toBe(code)
  })

  it('marks keywords, function calls and leaves plain names untyped', () => {
    expect(typed('const total = sum (a, b)')).toEqual([
      ['kw', 'const'],
      ['fn', 'sum'],
    ])
    expect(tokenizeCode('total').map((t) => t.type)).toEqual([undefined])
  })

  it('prefers keyword over function for calls like if (', () => {
    expect(typed('if (x) return(y)')).toEqual([
      ['kw', 'if'],
      ['kw', 'return'],
    ])
  })

  it('reads strings with escapes, and unterminated strings to the end of the line', () => {
    expect(typed(String.raw`"a\"b" 'c' "open`)).toEqual([
      ['str', String.raw`"a\"b"`],
      ['str', "'c'"],
      ['str', '"open'],
    ])
    expect(typed('"open\nnext')).toEqual([['str', '"open']])
  })

  it('lets template literals span lines', () => {
    expect(typed('`a\nb` x')).toEqual([['str', '`a\nb`']])
  })

  it('keeps comment markers inside strings as string', () => {
    expect(typed('"// not a comment"')).toEqual([['str', '"// not a comment"']])
  })

  it('reads numbers but not digits inside names', () => {
    expect(typed('0xFF 1_000 1.5 2e-3 x1 a2b')).toEqual([
      ['num', '0xFF'],
      ['num', '1_000'],
      ['num', '1.5'],
      ['num', '2e-3'],
    ])
  })

  it('reads C-style line and block comments by default', () => {
    expect(typed('a // one\n/* two\nlines */ b')).toEqual([
      ['com', '// one'],
      ['com', '/* two\nlines */'],
    ])
  })

  it('runs an unclosed block comment to the end', () => {
    expect(typed('/* open\nstill')).toEqual([['com', '/* open\nstill']])
  })

  it('reads # comments only for hash languages, case-insensitively', () => {
    expect(typed('x = 1 # note', 'Python')).toEqual([
      ['num', '1'],
      ['com', '# note'],
    ])
    expect(typed('# note', 'yaml')).toEqual([['com', '# note']])
    expect(typed('#x // c', 'js')).toEqual([['com', '// c']])
  })

  it('knows capitalised Python constants', () => {
    expect(typed('None True False', 'py')).toEqual([
      ['kw', 'None'],
      ['kw', 'True'],
      ['kw', 'False'],
    ])
  })
})

describe('codeHtml', () => {
  const line = (inner: string) => `<span class="x-code__line">${inner}</span>`

  it('wraps each line and each token', () => {
    expect(codeHtml('let a = 1\nb()', 'js')).toBe(
      [
        line('<span class="x-code__kw">let</span> a = <span class="x-code__num">1</span>'),
        line('<span class="x-code__fn">b</span>()'),
      ].join('\n'),
    )
  })

  it('escapes markup in text and tokens', () => {
    expect(codeHtml('a < b && "<i>"')).toBe(line('a &lt; b &amp;&amp; <span class="x-code__str">"&lt;i&gt;"</span>'))
  })

  it('closes and reopens a multi-line comment on each line', () => {
    expect(codeHtml('/* a\nb */')).toBe(
      [line('<span class="x-code__com">/* a</span>'), line('<span class="x-code__com">b */</span>')].join('\n'),
    )
  })

  it('keeps empty lines, drops one trailing newline and normalises CRLF', () => {
    expect(codeHtml('a\r\n\r\nb\n')).toBe([line('a'), line(''), line('b')].join('\n'))
    expect(codeHtml('a\rb')).toBe([line('a'), line('b')].join('\n'))
  })

  it('renders empty code as one empty line', () => {
    expect(codeHtml('')).toBe(line(''))
  })

  it('keeps leading whitespace', () => {
    expect(codeHtml('  x')).toBe(line('  x'))
  })
})
