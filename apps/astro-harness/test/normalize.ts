import { Window } from 'happy-dom'

// Compare structure, not formatting: sorted attributes, collapsed whitespace, no comments.
export function normalize(html: string): string {
  const window = new Window()
  const root = window.document.createElement('div')
  root.innerHTML = html
  const walk = (node: any): string => {
    if (node.nodeType === 3) {
      return node.textContent.replace(/\s+/g, ' ')
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
    const children = [...node.childNodes].map(walk).join('')
    return `<${tag}${attrs ? ` ${attrs}` : ''}>${children}</${tag}>`
  }
  return [...root.childNodes].map(walk).join('').trim()
}
