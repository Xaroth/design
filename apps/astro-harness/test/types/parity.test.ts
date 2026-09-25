// Type parity between the Astro and React component props. Checked by `astro check` (the typecheck script); the
// runtime test only keeps vitest from reporting an empty file.
import type { ComponentProps as AstroProps, HTMLAttributes as AstroAttrs, HTMLTag } from 'astro/types'
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentProps as ReactProps,
  FieldsetHTMLAttributes,
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  SelectHTMLAttributes,
  SVGAttributes,
  TextareaHTMLAttributes,
} from 'react'
import { it } from 'vitest'
import type * as A from '@xaroth.nl/design/astro'
import type * as R from '@xaroth.nl/design/react'

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false
type IsRequired<P, K> = K extends keyof P ? ({} extends Pick<P, K> ? false : true) : false
type Value<P, K> = K extends keyof P ? Exclude<P[K], undefined | null> : never

// Keys a component defines itself: not a base element attribute, or one it redefines (type or required-ness).
// React event handlers are typed per element, so an inherited one is never counted as redefined.
type Own<P, Base> = P extends unknown
  ? keyof {
      [
        K in keyof P as K extends `data-${string}`
          ? never
          : K extends keyof Base
            ? K extends `on${string}`
              ? never
              : Equal<Pick<P, K>, Pick<Base, K>> extends true
                ? never
                : K
            : K
      ]: 0
    }
  : never

// A React prop that takes nodes is an Astro slot, or an Astro string prop next to a slot.
type TakesNodes<T> = [ReactElement] extends [T]
  ? true
  : T extends readonly (infer E)[]
    ? TakesNodes<E>
    : T extends object
      ? true extends { [K in keyof T]-?: TakesNodes<Exclude<T[K], undefined>> }[keyof T]
        ? true
        : false
      : false

type Fits<X, Y> = [X] extends [Y] ? true : false

// Known renderer differences: class vs className, Astro slots vs React node props, children.
type Renderer = 'class' | 'className' | 'children'

// Astro values must always work in React. React values must work in Astro when the React component typed the prop
// itself and it is not a node; inherited DOM typings differ between the renderers.
type Shared<AP, RP, K, ReactOwn extends boolean> =
  Equal<IsRequired<AP, K>, IsRequired<RP, K>> extends false
    ? IsRequired<RP, K> extends true
      ? TakesNodes<Value<RP, K>> extends true
        ? never
        : `${K & string}: required in React only`
      : `${K & string}: required in Astro only`
    : Fits<Value<AP, K>, Value<RP, K>> extends false
      ? `${K & string}: Astro type does not fit React`
      : ReactOwn extends false
        ? never
        : TakesNodes<Value<RP, K>> extends true
          ? never
          : Fits<Value<RP, K>, Value<AP, K>> extends false
            ? `${K & string}: React type does not fit Astro`
            : never

type KeyProblem<AP, RP, K, ReactOwn> = K extends keyof AP
  ? K extends keyof RP
    ? Shared<AP, RP, K, K extends ReactOwn ? true : false>
    : `${K & string}: Astro only`
  : K extends keyof RP
    ? TakesNodes<Value<RP, K>> extends true
      ? never
      : `${K & string}: React only`
    : never

type EachKey<AP, RP, Keys, ReactOwn> = Keys extends unknown ? KeyProblem<AP, RP, Keys, ReactOwn> : never

// Cut both sides down to the compared keys first; full SVG attribute types are too large to compare key by key.
type Slim<P, Keys> = P extends unknown ? { [K in keyof P as K extends Keys ? K : never]: P[K] } : never

type Compared<AP, RP, AB, RB, Skip> = Exclude<Own<AP, AB> | Own<RP, RB>, Renderer | Skip>

type Problems<AP, RP, AB, RB, Skip extends PropertyKey = never> = EachKey<
  Slim<AP, Compared<AP, RP, AB, RB, Skip>>,
  Slim<RP, Compared<AP, RP, AB, RB, Skip>>,
  Compared<AP, RP, AB, RB, Skip>,
  Own<RP, RB>
>

type Parity<
  AC extends (props: any) => any,
  RC extends (props: any) => any,
  Tag extends HTMLTag,
  RB,
  Skip extends PropertyKey = never,
> = Problems<AstroProps<AC>, ReactProps<RC>, AstroAttrs<Tag>, RB, Skip>

type El = HTMLAttributes<HTMLElement>

// Fails to compile with the list of problems when there are any.
const none = <T extends never>(): T[] => []

it('Astro and React props agree', () => {
  none<Parity<typeof A.Alert, typeof R.Alert, 'div', El>>()
  none<Parity<typeof A.Avatar, typeof R.Avatar, 'span', El>>()
  none<Parity<typeof A.Badge, typeof R.Badge, 'span', El>>()
  none<Parity<typeof A.Breadcrumbs, typeof R.Breadcrumbs, 'nav', El>>()
  none<Parity<typeof A.Card, typeof R.Card, 'article', El>>()
  none<Parity<typeof A.DescriptionList, typeof R.DescriptionList, 'dl', El>>()
  none<Parity<typeof A.Divider, typeof R.Divider, 'div', El>>()
  none<Parity<typeof A.EmptyState, typeof R.EmptyState, 'div', El>>()
  none<Parity<typeof A.Field, typeof R.Field, 'div', El>>()
  none<Parity<typeof A.Footer, typeof R.Footer, 'footer', El>>()
  none<Parity<typeof A.Header, typeof R.Header, 'header', El>>()
  none<Parity<typeof A.Container, typeof R.Container, 'div', El>>()
  none<Parity<typeof A.Grid, typeof R.Grid, 'div', El>>()
  none<Parity<typeof A.Section, typeof R.Section, 'section', El>>()
  none<Parity<typeof A.SectionHead, typeof R.SectionHead, 'header', El>>()
  none<Parity<typeof A.PageHead, typeof R.PageHead, 'header', El>>()
  none<Parity<typeof A.Pagination, typeof R.Pagination, 'nav', El>>()
  none<Parity<typeof A.Panel, typeof R.Panel, 'div', El>>()
  none<Parity<typeof A.CodeBlock, typeof R.CodeBlock, 'figure', El>>()
  none<Parity<typeof A.Prose, typeof R.Prose, 'div', El>>()
  none<Parity<typeof A.StatGroup, typeof R.StatGroup, 'dl', El>>()
  none<Parity<typeof A.Stat, typeof R.Stat, 'div', El>>()
  none<Parity<typeof A.Tabs, typeof R.Tabs, 'nav', El>>()
  none<Parity<typeof A.Timeline, typeof R.Timeline, 'ol', El>>()
  none<Parity<typeof A.Tooltip, typeof R.Tooltip, 'span', El>>()
  none<Parity<typeof A.Icon, typeof R.Icon, 'svg', SVGAttributes<SVGSVGElement>>>()
  // React reports position changes; Astro switches with an inline script.
  none<Parity<typeof A.FilterLayout, typeof R.FilterLayout, 'div', El, 'onPositionChange'>>()
  none<Parity<typeof A.FilterPanel, typeof R.FilterPanel, 'form', FormHTMLAttributes<HTMLFormElement>>>()
})

it('form control props agree', () => {
  type Input = InputHTMLAttributes<HTMLInputElement>
  none<Parity<typeof A.Input, typeof R.Input, 'input', Input>>()
  none<Parity<typeof A.Checkbox, typeof R.Checkbox, 'input', Input>>()
  none<Parity<typeof A.Radio, typeof R.Radio, 'input', Input>>()
  none<Parity<typeof A.Switch, typeof R.Switch, 'input', Input>>()
  none<Parity<typeof A.Select, typeof R.Select, 'select', SelectHTMLAttributes<HTMLSelectElement>>>()
  none<Parity<typeof A.Textarea, typeof R.Textarea, 'textarea', TextareaHTMLAttributes<HTMLTextAreaElement>>>()
  type Fieldset = FieldsetHTMLAttributes<HTMLFieldSetElement>
  none<Parity<typeof A.RadioGroup, typeof R.RadioGroup, 'fieldset', Fieldset>>()
  none<Parity<typeof A.CheckboxGroup, typeof R.CheckboxGroup, 'fieldset', Fieldset>>()
})

// Unions are compared branch by branch. An empty branch would compare nothing, so it is a problem too.
type Branches<AP, RP, AB, RB> = [AP] extends [never]
  ? 'Astro branch is empty'
  : [RP] extends [never]
    ? 'React branch is empty'
    : Problems<AP, RP, AB, RB>

type Link = { href: string }
type NotLink = { href?: undefined }
type Labelled = { label: string }
type LabelledBy = { 'aria-labelledby': string }

it('union props agree per branch', () => {
  type AB = AstroProps<typeof A.Button>
  type RB = ReactProps<typeof R.Button>
  none<
    Branches<Extract<AB, NotLink>, Extract<RB, NotLink>, AstroAttrs<'button'>, ButtonHTMLAttributes<HTMLButtonElement>>
  >()
  none<Branches<Extract<AB, Link>, Extract<RB, Link>, AstroAttrs<'a'>, AnchorHTMLAttributes<HTMLAnchorElement>>>()

  type AT = AstroProps<typeof A.Tag>
  type RT = ReactProps<typeof R.Tag>
  none<Branches<Extract<AT, NotLink>, Extract<RT, NotLink>, AstroAttrs<'span'>, El>>()
  none<Branches<Extract<AT, Link>, Extract<RT, Link>, AstroAttrs<'a'>, AnchorHTMLAttributes<HTMLAnchorElement>>>()

  type ATable = AstroProps<typeof A.Table>
  type RTable = ReactProps<typeof R.Table>
  none<Branches<Extract<ATable, Labelled>, Extract<RTable, Labelled>, AstroAttrs<'div'>, El>>()
  none<Branches<Exclude<ATable, Labelled>, Exclude<RTable, Labelled>, AstroAttrs<'div'>, El>>()

  type AProgress = AstroProps<typeof A.Progress>
  type RProgress = ReactProps<typeof R.Progress>
  none<Branches<Extract<AProgress, LabelledBy>, Extract<RProgress, LabelledBy>, AstroAttrs<'div'>, El>>()
  none<Branches<Exclude<AProgress, LabelledBy>, Exclude<RProgress, LabelledBy>, AstroAttrs<'div'>, El>>()
})

// The checker itself: each of these must report a problem.
it('reports drift', () => {
  type Base = { id?: string; title?: string }
  // @ts-expect-error required in one renderer only
  none<Problems<{ size?: number }, { size: number }, Base, Base>>()
  // @ts-expect-error a prop only one renderer accepts
  none<Problems<{}, { tone?: 'a' }, Base, Base>>()
  // @ts-expect-error
  none<Problems<{ tone?: 'a' }, {}, Base, Base>>()
  // @ts-expect-error Astro accepts a value React does not
  none<Problems<{ tone?: 'a' | 'b' }, { tone?: 'a' }, Base, Base>>()
  // @ts-expect-error React accepts a value Astro does not
  none<Problems<{ tone?: 'a' }, { tone?: 'a' | 'b' }, Base, Base>>()
  // @ts-expect-error a redefined base attribute
  none<Problems<Base & { id: string }, Base, Base, Base>>()
  // @ts-expect-error an empty branch
  none<Branches<Extract<{ href?: undefined }, Link>, { href: string }, Base, Base>>()

  // @ts-expect-error real component types are read, not any: Tabs requires label, Breadcrumbs does not
  none<Parity<typeof A.Tabs, typeof R.Breadcrumbs, 'nav', El>>()

  // Renderer differences pass: class vs className, a React node prop for an Astro slot, a string for a node.
  none<Problems<{ class?: string }, { className?: string }, Base, Base>>()
  none<Problems<{}, { actions?: ReactNode }, Base, Base>>()
  none<Problems<{ title?: string }, { title: ReactNode }, Base, Base>>()
})
