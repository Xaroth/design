// Form field recipes. Controls are native elements; Field adds label, help and error text around one control and
// wires the control's id and aria attributes. IDs come from props, never generated, so Astro and React match.

import { bem } from '../../bem.ts'

export type InputType = 'text' | 'email' | 'search' | 'number' | 'password' | 'url' | 'tel'
export type ChoiceGroupOrientation = 'vertical' | 'horizontal'

const joinIds = (...ids: (string | false | undefined)[]) => ids.filter(Boolean).join(' ')

export const fieldIds = (id: string) => ({ help: `${id}-help`, error: `${id}-error` })

export type FieldWiringInput = {
  id: string
  hasDescription?: boolean
  hasError?: boolean
  required?: boolean
}

// Attributes Field puts on its control. Help comes before error, matching reading order.
export const fieldControlAttrs = ({ id, hasDescription, hasError, required }: FieldWiringInput) => {
  const ids = fieldIds(id)
  const describedBy = joinIds(hasDescription && ids.help, hasError && ids.error)
  return {
    id,
    'aria-describedby': describedBy || undefined,
    'aria-invalid': hasError ? ('true' as const) : undefined,
    required: required || undefined,
  }
}

const field = bem('x-field')
const input = bem('x-input')
const textarea = bem('x-textarea')
const select = bem('x-select')
const choiceGroup = bem('x-choice-group', { defaults: { orientation: 'vertical' } })

export const fieldClass = ({ invalid, className }: { invalid?: boolean; className?: string } = {}) =>
  field({ invalid }, className)

export const inputClass = ({ hasStart, className }: { hasStart?: boolean; className?: string } = {}) =>
  input({ start: hasStart }, className)

export const textareaClass = ({ className }: { className?: string } = {}) => textarea({}, className)

export const selectClass = ({ className }: { className?: string } = {}) => select({}, className)

export type ChoiceKind = 'checkbox' | 'radio' | 'switch'

export const choiceClass = (kind: ChoiceKind, { className }: { className?: string } = {}) =>
  bem(`x-${kind}`)({}, className)

export const choiceGroupClass = ({
  orientation = 'vertical',
  invalid,
  className,
}: { orientation?: ChoiceGroupOrientation; invalid?: boolean; className?: string } = {}) =>
  choiceGroup({ orientation, invalid }, className)

// Radio groups are a radiogroup; checkbox groups stay a plain fieldset, which already groups them.
export const choiceGroupAttrs = ({
  id,
  hasDescription,
  hasError,
  required,
  kind,
}: FieldWiringInput & { kind: 'radio' | 'checkbox' }) => {
  const { 'aria-describedby': describedBy, 'aria-invalid': invalid } = fieldControlAttrs({
    id,
    hasDescription,
    hasError,
  })
  const radio = kind === 'radio'
  return {
    id,
    role: radio ? ('radiogroup' as const) : undefined,
    'aria-describedby': describedBy,
    'aria-invalid': radio ? invalid : undefined,
    'aria-required': radio && required ? ('true' as const) : undefined,
  }
}

const escapeAttr = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Astro cannot pass props to slotted children, so Field rewrites the first control tag in the rendered slot.
// Field's id wins; the control's own aria-describedby, aria-invalid (without a Field error) and required are kept.
export const wireControlHtml = (html: string, attrs: ReturnType<typeof fieldControlAttrs>): string =>
  html.replace(
    /<(input|select|textarea)\b([^>]*?)(\/?)>/,
    (_match, tag: string, rawAttrs: string, selfClose: string) => {
      const own = /\saria-describedby="([^"]*)"/.exec(rawAttrs)?.[1]
      const owned = attrs['aria-invalid']
        ? /\s(id|aria-describedby|aria-invalid)="[^"]*"/g
        : /\s(id|aria-describedby)="[^"]*"/g
      const kept = rawAttrs.replace(owned, '')
      const hasRequired = /\srequired(?=[\s=/]|$)/.test(rawAttrs)
      const describedBy = joinIds(attrs['aria-describedby'], own)
      const added = [
        `id="${escapeAttr(attrs.id)}"`,
        describedBy && `aria-describedby="${escapeAttr(describedBy)}"`,
        attrs['aria-invalid'] && `aria-invalid="true"`,
        attrs.required && !hasRequired && 'required',
      ]
        .filter(Boolean)
        .join(' ')
      return `<${tag} ${added}${kept}${selfClose}>`
    },
  )

// Same merge for React, where Field clones its child with these props.
export const mergeDescribedBy = (fieldIdsList: string | undefined, own: string | undefined) =>
  joinIds(fieldIdsList, own) || undefined
