import { bem } from '../../bem.ts'

const prose = bem('x-prose')
const codeBlock = bem('x-code')

export type ProseOptions = {
  className?: string
}

export const proseClass = ({ className }: ProseOptions = {}): string => prose({}, className)

export type CodeBlockOptions = {
  className?: string
}

export const codeBlockClass = ({ className }: CodeBlockOptions = {}): string => codeBlock({}, className)

export type CodeToken = 'kw' | 'str' | 'num' | 'com' | 'fn'

const keywords = new Set(
  (
    'as async await break case catch class const continue def default del delete do elif else enum export extends ' +
    'false fi fn for from func function go if impl implements import in instanceof interface is let loop match mod ' +
    'module mut new nil none not null of or package pass pub raise return self static struct super switch then this ' +
    'throw trait true try type typeof undefined use var void while with yield True False None and lambda'
  ).split(' '),
)

// Languages whose line comments start with #. Everything else gets C-style comments.
const hashComment = new Set(['py', 'python', 'sh', 'bash', 'shell', 'zsh', 'yaml', 'yml', 'toml', 'rb', 'ruby', 'ini'])

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const pattern = (lang: string) => {
  const comment = hashComment.has(lang) ? String.raw`#[^\n]*` : String.raw`\/\*[\s\S]*?(?:\*\/|$)|\/\/[^\n]*`
  return new RegExp(
    [
      `(${comment})`,
      String.raw`("(?:\\[\s\S]|[^"\\\n])*"?|'(?:\\[\s\S]|[^'\\\n])*'?|\`(?:\\[\s\S]|[^\`\\])*\`?)`,
      String.raw`(\b0x[\da-fA-F]+\b|\b\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?\b)`,
      String.raw`([A-Za-z_$][\w$]*)(?=\s*\()`,
      String.raw`([A-Za-z_$][\w$]*)`,
    ].join('|'),
    'g',
  )
}

// Split source into typed tokens. Tiny on purpose: good enough for articles, not a real lexer.
export const tokenizeCode = (code: string, lang = ''): { type?: CodeToken; text: string }[] => {
  const out: { type?: CodeToken; text: string }[] = []
  let last = 0
  for (const m of code.matchAll(pattern(lang.toLowerCase()))) {
    const index = m.index ?? 0
    if (index > last) {
      out.push({ text: code.slice(last, index) })
    }
    const word = m[4] ?? m[5]
    const type: CodeToken | undefined = m[1]
      ? 'com'
      : m[2]
        ? 'str'
        : m[3]
          ? 'num'
          : word && keywords.has(word)
            ? 'kw'
            : m[4]
              ? 'fn'
              : undefined
    out.push({ type, text: m[0] })
    last = index + m[0].length
  }
  if (last < code.length) {
    out.push({ text: code.slice(last) })
  }
  return out
}

// One span per line (for the line number counter) with token spans inside. Tokens that cross a newline,
// like block comments, are closed and reopened so every line is well formed.
export const codeHtml = (code: string, lang?: string): string => {
  const lines: string[] = ['']
  for (const { type, text } of tokenizeCode(code.replace(/\r\n?/g, '\n').replace(/\n$/, ''), lang)) {
    text.split('\n').forEach((part, i) => {
      if (i > 0) {
        lines.push('')
      }
      if (part) {
        lines[lines.length - 1] += type ? `<span class="x-code__${type}">${esc(part)}</span>` : esc(part)
      }
    })
  }
  return lines.map((l) => `<span class="x-code__line">${l}</span>`).join('\n')
}
