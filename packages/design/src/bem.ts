import { clsx, type ClassValue } from 'clsx'

type Modifier = string | number | boolean | null | undefined

export type BemOptions = {
  // Values equal to their default get no modifier class.
  defaults?: Record<string, string | number>
  // Keys whose value is written with the key in front: `pad: 'md'` becomes `--pad-md` instead of `--md`.
  prefixed?: string[]
}

export type Bem = {
  (modifiers?: Record<string, Modifier>, ...extra: ClassValue[]): string
  el: (element: string, modifiers?: Record<string, Modifier>, ...extra: ClassValue[]) => string
}

// Class names for one BEM block. `true` gives `--key`, a string gives `--value`, false-ish gives nothing.
export function bem(block: string, { defaults = {}, prefixed = [] }: BemOptions = {}): Bem {
  const build = (name: string, modifiers: Record<string, Modifier> = {}, extra: ClassValue[] = []) =>
    clsx(
      name,
      Object.entries(modifiers).map(([key, value]) => {
        if (value === true) {
          return `${name}--${key}`
        }
        if ((typeof value === 'string' && value !== '') || typeof value === 'number') {
          if (defaults[key] === value) {
            return false
          }
          return prefixed.includes(key) ? `${name}--${key}-${value}` : `${name}--${value}`
        }
        return false
      }),
      extra,
    )
  const fn = ((modifiers, ...extra) => build(block, modifiers, extra)) as Bem
  fn.el = (element, modifiers, ...extra) => build(`${block}__${element}`, modifiers, extra)
  return fn
}
