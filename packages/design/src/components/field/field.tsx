'use client'

import './field.scss'
import {
  Children,
  cloneElement,
  isValidElement,
  type FieldsetHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'
import { defined } from '../../html.ts'
import {
  choiceClass,
  fieldClass,
  fieldControlAttrs,
  fieldIds,
  inputClass,
  mergeDescribedBy,
  choiceGroupAttrs,
  choiceGroupClass,
  selectClass,
  textareaClass,
  type ChoiceKind,
  type InputType,
  type ChoiceGroupOrientation,
} from './index.ts'

// Matches Astro, where an empty string prop counts as absent.
const present = (node: ReactNode) => node != null && node !== false && node !== ''

type ControlProps = {
  id?: string
  'aria-describedby'?: string
  'aria-invalid'?: InputHTMLAttributes<HTMLInputElement>['aria-invalid']
  required?: boolean
}

export type FieldProps = Omit<HTMLAttributes<HTMLDivElement>, 'id'> & {
  /** Id of the control inside. Help and error text get `${id}-help` and `${id}-error`. */
  id: string
  label?: ReactNode
  description?: ReactNode
  error?: ReactNode
  required?: boolean
  /** One control: Input, Textarea, Select, Checkbox, Switch or a native control. Field sets its id and aria. */
  children: ReactElement
}

export function Field({ id, label, description, error, required, className, children, ...rest }: FieldProps) {
  const hasDescription = present(description)
  const hasError = present(error)
  const ids = fieldIds(id)
  const attrs = fieldControlAttrs({ id, hasDescription, hasError, required })
  const control = Children.only(children)
  const own = isValidElement<ControlProps>(control) ? control.props : {}
  const wired = cloneElement(control as ReactElement<ControlProps>, {
    id,
    'aria-describedby': mergeDescribedBy(attrs['aria-describedby'], own['aria-describedby']),
    'aria-invalid': attrs['aria-invalid'] ?? own['aria-invalid'],
    required: attrs.required || own.required,
  })

  return (
    <div
      {...rest}
      className={fieldClass({ invalid: hasError, className })}
    >
      {present(label) && (
        <label
          className="x-field__label"
          htmlFor={id}
        >
          {label}
          {required && (
            <span
              className="x-field__required"
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}
      {wired}
      {hasDescription && (
        <p
          className="x-field__help"
          id={ids.help}
        >
          {description}
        </p>
      )}
      {hasError && (
        <p
          className="x-field__error"
          id={ids.error}
        >
          {error}
        </p>
      )}
    </div>
  )
}

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  type?: InputType
  /** Shown inside the start of the field, usually an icon. Hidden from assistive tech. */
  start?: ReactNode
}

export function Input({ type = 'text', start, className, ...rest }: InputProps) {
  const hasStart = start != null
  const input = (
    <input
      {...rest}
      type={type}
      className={inputClass({ hasStart, className })}
    />
  )
  if (!hasStart) {
    return input
  }
  return (
    <span className="x-input-wrap">
      <span
        className="x-input-wrap__start"
        aria-hidden="true"
      >
        {start}
      </span>
      {input}
    </span>
  )
}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export function Textarea({ className, ...rest }: TextareaProps) {
  return (
    <textarea
      {...rest}
      className={textareaClass({ className })}
    />
  )
}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

export function Select({ className, children, ...rest }: SelectProps) {
  return (
    <select
      {...rest}
      className={selectClass({ className })}
    >
      {children}
    </select>
  )
}

export type ChoiceProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'role'> & {
  /** Label text next to the control. */
  children?: ReactNode
}

function Choice({ kind, className, children, ...rest }: ChoiceProps & { kind: ChoiceKind }) {
  return (
    <label className={choiceClass(kind, { className })}>
      <input
        {...rest}
        type={kind === 'radio' ? 'radio' : 'checkbox'}
        {...(kind === 'switch' && { role: 'switch' })}
        className={`x-${kind}__input`}
      />
      <span className={`x-${kind}__label`}>{children}</span>
    </label>
  )
}

export type CheckboxProps = ChoiceProps
export type RadioProps = ChoiceProps
export type SwitchProps = ChoiceProps

export const Checkbox = (props: CheckboxProps) => (
  <Choice
    kind="checkbox"
    {...props}
  />
)

export const Radio = (props: RadioProps) => (
  <Choice
    kind="radio"
    {...props}
  />
)

export const Switch = (props: SwitchProps) => (
  <Choice
    kind="switch"
    {...props}
  />
)

export type ChoiceGroupProps = Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'id' | 'role'> & {
  /** Help and error text get `${id}-help` and `${id}-error`. */
  id: string
  legend?: ReactNode
  description?: ReactNode
  error?: ReactNode
  required?: boolean
  orientation?: ChoiceGroupOrientation
}

function ChoiceGroup({
  kind,
  id,
  legend,
  description,
  error,
  required,
  orientation,
  className,
  children,
  ...rest
}: ChoiceGroupProps & { kind: 'radio' | 'checkbox' }) {
  const hasDescription = present(description)
  const hasError = present(error)
  const ids = fieldIds(id)
  return (
    <fieldset
      {...rest}
      {...defined(
        choiceGroupAttrs({ id, hasDescription, hasError, required, kind, describedBy: rest['aria-describedby'] }),
      )}
      className={choiceGroupClass({ orientation, invalid: hasError, className })}
    >
      {present(legend) && (
        <legend className="x-choice-group__legend">
          {legend}
          {required && (
            <span
              className="x-field__required"
              aria-hidden="true"
            >
              *
            </span>
          )}
        </legend>
      )}
      <div className="x-choice-group__options">{children}</div>
      {hasDescription && (
        <p
          className="x-field__help"
          id={ids.help}
        >
          {description}
        </p>
      )}
      {hasError && (
        <p
          className="x-field__error"
          id={ids.error}
        >
          {error}
        </p>
      )}
    </fieldset>
  )
}

export type RadioGroupProps = ChoiceGroupProps
export type CheckboxGroupProps = ChoiceGroupProps

export const RadioGroup = (props: RadioGroupProps) => (
  <ChoiceGroup
    kind="radio"
    {...props}
  />
)

export const CheckboxGroup = (props: CheckboxGroupProps) => (
  <ChoiceGroup
    kind="checkbox"
    {...props}
  />
)
