// Astro cannot pass props to slotted children, so parts that must wire their child rewrite one tag of the rendered
// slot. This is a scanner for that markup, not a full HTML parser.

export type Attr = {
  /** Lowercased, for matching. */
  name: string
  /** Decoded value; `true` for a bare attribute. */
  value: string | true
  /** Source text, written back unchanged when the attribute is kept. */
  raw: string
}

export type Tag = {
  /** Lowercased tag name. */
  name: string
  attrs: Attr[]
  selfClosing: boolean
  /** Offsets of the whole start tag in the scanned html. */
  start: number
  end: number
  /** Tag name as written. */
  rawName: string
}

/** `null` removes the attribute, `undefined` leaves it as it is, `true` writes it bare. */
export type AttrChanges = Record<string, string | true | null | undefined>

// Their content is text (or inert), so tags inside are never the target.
const opaque = new Set(['script', 'style', 'template', 'textarea', 'title'])

const tagName = /[a-zA-Z][^\s/>]*/y
const attr = /([^\s"'>/=][^\s"'>/=]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/y

const entities: Record<string, string> = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' }

const decode = (value: string) =>
  value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, body: string) => {
    if (body[0] !== '#') {
      return entities[body.toLowerCase()] ?? entity
    }
    const code = body[1] === 'x' || body[1] === 'X' ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10)
    return String.fromCodePoint(code)
  })

export const escapeAttr = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Reads the start tag whose `<` is at `lt`, or undefined when `<` does not open a tag there.
const readTag = (html: string, lt: number): Tag | undefined => {
  tagName.lastIndex = lt + 1
  const name = tagName.exec(html)
  if (!name) {
    return undefined
  }
  const attrs: Attr[] = []
  let i = tagName.lastIndex
  while (i < html.length) {
    const char = html[i]
    if (/\s/.test(char)) {
      i++
    } else if (char === '>') {
      return { name: name[0].toLowerCase(), rawName: name[0], attrs, selfClosing: false, start: lt, end: i + 1 }
    } else if (html.startsWith('/>', i)) {
      return { name: name[0].toLowerCase(), rawName: name[0], attrs, selfClosing: true, start: lt, end: i + 2 }
    } else if (char === '/') {
      i++
    } else {
      attr.lastIndex = i
      const found = attr.exec(html)
      if (!found) {
        i++
        continue
      }
      const value = found[2] ?? found[3] ?? found[4]
      attrs.push({ name: found[1].toLowerCase(), value: value === undefined ? true : decode(value), raw: found[0] })
      i = attr.lastIndex
    }
  }
  return undefined
}

/** First start tag, in document order, that `match` accepts. Looks inside wrappers that do not match. */
export function findTag(html: string, match: (tag: Tag) => boolean): Tag | undefined {
  const lower = html.toLowerCase()
  let i = 0
  while (i < html.length) {
    const lt = html.indexOf('<', i)
    if (lt === -1) {
      return undefined
    }
    if (html.startsWith('<!--', lt)) {
      const close = html.indexOf('-->', lt + 4)
      i = close === -1 ? html.length : close + 3
      continue
    }
    if (html[lt + 1] === '/' || html[lt + 1] === '!' || html[lt + 1] === '?') {
      const close = html.indexOf('>', lt)
      i = close === -1 ? html.length : close + 1
      continue
    }
    const tag = readTag(html, lt)
    if (!tag) {
      i = lt + 1
      continue
    }
    if (match(tag)) {
      return tag
    }
    i = tag.end
    if (opaque.has(tag.name) && !tag.selfClosing) {
      const close = lower.indexOf(`</${tag.name}`, i)
      i = close === -1 ? html.length : close
    }
  }
  return undefined
}

export const getAttr = (tag: Tag, name: string): string | true | undefined =>
  tag.attrs.find((a) => a.name === name)?.value

/** Writes the start tag back. Changed attributes move to the end, after the ones the tag already had. */
export function writeTag(tag: Tag, changes: AttrChanges = {}): string {
  const entries = Object.entries(changes).filter(([, value]) => value !== undefined)
  const touched = new Set(entries.map(([name]) => name.toLowerCase()))
  const kept = tag.attrs.filter((a) => !touched.has(a.name)).map((a) => a.raw)
  const added = entries
    .filter(([, value]) => value !== null)
    .map(([name, value]) => (value === true ? name : `${name}="${escapeAttr(value as string)}"`))
  const attrs = [...kept, ...added].map((a) => ` ${a}`).join('')
  return `<${tag.rawName}${attrs}${tag.selfClosing ? ' />' : '>'}`
}

/** Replaces `tag` (found in `html`) with `changes` applied. */
export const replaceTag = (html: string, tag: Tag, changes: AttrChanges): string =>
  html.slice(0, tag.start) + writeTag(tag, changes) + html.slice(tag.end)

/** Applies `changes(tag)` to the first tag that `match` accepts. Returns `html` unchanged when none does. */
export function rewriteTag(html: string, match: (tag: Tag) => boolean, changes: (tag: Tag) => AttrChanges): string {
  const tag = findTag(html, match)
  return tag ? replaceTag(html, tag, changes(tag)) : html
}

/** Space separated token lists (ids for aria-describedby) joined in order without repeats. */
export const mergeTokens = (...lists: (string | true | false | null | undefined)[]): string =>
  [
    ...new Set(
      lists
        .filter((list): list is string => typeof list === 'string')
        .flatMap((list) => list.split(/\s+/))
        .filter(Boolean),
    ),
  ].join(' ')

/** Drops undefined keys, so spreading recipe attributes after user ones never erases a user value. */
export const defined = <T extends Record<string, unknown>>(attrs: T): Partial<T> =>
  Object.fromEntries(Object.entries(attrs).filter(([, value]) => value !== undefined)) as Partial<T>

const claimed = new WeakMap<object, Set<string>>()

/** True the first time per `scope` (the page's request) and `key`, for markup a page needs only once. */
export function firstOnPage(scope: object, key: string): boolean {
  const keys = claimed.get(scope) ?? new Set<string>()
  claimed.set(scope, keys)
  if (keys.has(key)) {
    return false
  }
  keys.add(key)
  return true
}
