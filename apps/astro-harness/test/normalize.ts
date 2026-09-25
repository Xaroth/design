import { Window } from 'happy-dom'

const preservingTags = new Set(['pre', 'textarea'])
const preservingStyle = /white-space\s*:\s*(pre|pre-wrap|pre-line|break-spaces)\b/i

export function parse(html: string): any {
  const window = new Window()
  const root = window.document.createElement('div')
  root.innerHTML = html
  return root
}

const preserves = (node: any): boolean =>
  preservingTags.has(node.tagName.toLowerCase()) || preservingStyle.test(node.getAttribute('style') ?? '')

// Compare structure, not formatting: sorted attributes, collapsed whitespace (except where it renders), no comments.
export function normalize(html: string): string {
  const walk = (node: any, keepSpace: boolean): string => {
    if (node.nodeType === 3) {
      return keepSpace ? node.textContent : node.textContent.replace(/\s+/g, ' ')
    }
    if (node.nodeType !== 1) {
      return ''
    }
    const attrs = [...node.attributes]
      // Class order carries no meaning, so compare classes as a sorted set.
      .map(
        (a: any) =>
          `${a.name}="${a.name === 'class' ? a.value.split(/\s+/).filter(Boolean).sort().join(' ') : a.value}"`,
      )
      .sort()
      .join(' ')
    const tag = node.tagName.toLowerCase()
    const keep = keepSpace || preserves(node)
    const children = [...node.childNodes].map((child) => walk(child, keep)).join('')
    return `<${tag}${attrs ? ` ${attrs}` : ''}>${children}</${tag}>`
  }
  return [...parse(html).childNodes]
    .map((node) => walk(node, false))
    .join('')
    .trim()
}

const referenceAttrs = ['for', 'aria-describedby', 'aria-labelledby', 'aria-controls', 'aria-errormessage']

// Problems a same-HTML comparison cannot see because both renderers share the recipe.
export function idProblems(html: string, externalIds: readonly string[] = []): string[] {
  const root = parse(html)
  const problems: string[] = []
  const ids = new Set<string>()
  for (const el of root.querySelectorAll('[id]')) {
    const id = el.getAttribute('id')
    if (id === '') {
      problems.push(`empty id on <${el.tagName.toLowerCase()}>`)
    } else if (ids.has(id)) {
      problems.push(`duplicate id "${id}"`)
    }
    ids.add(id)
  }
  for (const id of externalIds) {
    if (ids.has(id)) {
      problems.push(`external id "${id}" is inside the fragment`)
    }
  }
  for (const attr of referenceAttrs) {
    for (const el of root.querySelectorAll(`[${attr}]`)) {
      const value = el.getAttribute(attr)
      const refs = attr === 'for' ? [value] : value.split(/\s+/).filter(Boolean)
      if (refs.length === 0) {
        problems.push(`empty ${attr} on <${el.tagName.toLowerCase()}>`)
      }
      for (const ref of refs) {
        if (!ids.has(ref) && !externalIds.includes(ref)) {
          problems.push(`${attr}="${value}" on <${el.tagName.toLowerCase()}> points at missing id "${ref}"`)
        }
      }
    }
  }
  return problems
}
