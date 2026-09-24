import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { createElement, type ReactElement } from 'react'
import { describe, it } from 'vitest'
import {
  Checkbox,
  CheckboxGroup,
  Field,
  Input,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Textarea,
} from '@xaroth.nl/design/react'
import { expectSameHtml } from '../compare.ts'
import {
  Checkbox as AstroCheckbox,
  CheckboxGroup as AstroCheckboxGroup,
  Field as AstroField,
  Input as AstroInput,
  Radio as AstroRadio,
  RadioGroup as AstroRadioGroup,
  Select as AstroSelect,
  Switch as AstroSwitch,
  Textarea as AstroTextarea,
} from '@xaroth.nl/design/astro'

const container = await AstroContainer.create()
const icon = '<svg viewBox="0 0 16 16"></svg>'
const reactIcon = createElement('svg', { viewBox: '0 0 16 16' })
const options = '<option value="c">Caldari State</option><option value="a">Amarr Empire</option>'
const reactOptions = [
  createElement('option', { key: 'c', value: 'c' }, 'Caldari State'),
  createElement('option', { key: 'a', value: 'a' }, 'Amarr Empire'),
]

// Astro takes `class`, React `className`; everything else passes through unchanged.
const split = (props: Record<string, unknown>) => {
  const { class: className, ...rest } = props
  return className === undefined ? rest : { ...rest, className }
}

describe('Input', () => {
  const cases: [string, Record<string, unknown>][] = [
    ['default', {}],
    ['email with placeholder', { type: 'email', name: 'email', placeholder: 'you@example.com' }],
    ['number', { type: 'number', min: 1, max: 10 }],
    ['password', { type: 'password', autocomplete: 'current-password' }],
    ['url', { type: 'url' }],
    ['disabled', { disabled: true, value: 'Locked by SSO' }],
    ['readonly', { readonly: true, value: 'Fixed' }],
    ['invalid by attribute', { 'aria-invalid': 'true' }],
    ['extra class', { class: 'site-input', id: 'q' }],
  ]
  for (const [name, props] of cases) {
    it(name, async () => {
      const { readonly, ...reactProps } = props
      await expectSameHtml(
        AstroInput,
        { props },
        createElement(Input, { ...split(reactProps), readOnly: readonly as boolean | undefined } as never),
      )
    })
  }

  it('search with start icon', async () => {
    await expectSameHtml(
      AstroInput,
      { props: { type: 'search', class: 'wide' }, slots: { start: icon } },
      createElement(Input, { type: 'search', className: 'wide', start: reactIcon }),
    )
  })
})

describe('Textarea', () => {
  it('empty', async () => {
    await expectSameHtml(AstroTextarea, { props: { rows: 4 } }, createElement(Textarea, { rows: 4 }))
  })
  it('with value', async () => {
    await expectSameHtml(
      AstroTextarea,
      { props: { defaultValue: 'Fitting notes', class: 'x' } },
      createElement(Textarea, { defaultValue: 'Fitting notes', className: 'x' }),
    )
  })
  it('disabled', async () => {
    await expectSameHtml(AstroTextarea, { props: { disabled: true } }, createElement(Textarea, { disabled: true }))
  })
})

describe('Select', () => {
  it('options', async () => {
    await expectSameHtml(
      AstroSelect,
      { props: { name: 'faction' }, slots: { default: options } },
      createElement(Select, { name: 'faction' }, reactOptions),
    )
  })
  it('disabled with class', async () => {
    await expectSameHtml(
      AstroSelect,
      { props: { disabled: true, class: 'narrow' }, slots: { default: options } },
      createElement(Select, { disabled: true, className: 'narrow' }, reactOptions),
    )
  })
})

const choices = [
  ['Checkbox', AstroCheckbox, Checkbox],
  ['Radio', AstroRadio, Radio],
  ['Switch', AstroSwitch, Switch],
] as const

for (const [label, AstroPart, ReactPart] of choices) {
  describe(label, () => {
    const cases: [string, Record<string, unknown>][] = [
      ['default', { name: 'n', value: 'v' }],
      ['checked', { checked: true }],
      ['disabled', { disabled: true }],
      ['extra class and id', { class: 'site', id: 'c1' }],
    ]
    for (const [name, props] of cases) {
      it(name, async () => {
        const { checked, ...rest } = props
        await expectSameHtml(
          AstroPart,
          { props, slots: { default: 'Combat' } },
          createElement(
            ReactPart,
            { ...split(rest), defaultChecked: checked as boolean | undefined } as never,
            'Combat',
          ),
        )
      })
    }
  })
}

describe('Field', () => {
  const cases: [string, Record<string, unknown>][] = [
    ['label only', { id: 'name', label: 'Name' }],
    ['description', { id: 'name', label: 'Name', description: 'As shown in the character sheet.' }],
    ['error', { id: 'cid', label: 'Character ID', error: 'Character IDs are ten digits.' }],
    ['description and error', { id: 'cid', label: 'ID', description: 'Ten digits', error: 'Too short' }],
    ['required', { id: 'email', label: 'Email', required: true }],
    ['no label, extra class', { id: 'q', class: 'site-field' }],
    ['empty error is absent', { id: 'q', label: 'Q', error: '' }],
  ]

  for (const [name, props] of cases) {
    it(`${name} around Input`, async () => {
      const control = await container.renderToString(AstroInput, { props: { name: 'n' } })
      await expectSameHtml(
        AstroField,
        { props, slots: { default: control } },
        createElement(Field, split(props) as never, createElement(Input, { name: 'n' })),
      )
    })
  }

  it('keeps the control own describedby, invalid and required', async () => {
    const own = { 'aria-describedby': 'extra', 'aria-invalid': 'true', required: true, id: 'ignored' }
    const control = await container.renderToString(AstroInput, { props: own })
    const props = { id: 'x', label: 'X', description: 'Help' }
    await expectSameHtml(
      AstroField,
      { props, slots: { default: control } },
      createElement(Field, props as never, createElement(Input, own as never)),
    )
  })

  it('around Input with start icon', async () => {
    const control = await container.renderToString(AstroInput, { props: { type: 'search' }, slots: { start: icon } })
    const props = { id: 'search', label: 'Search', error: 'No results' }
    await expectSameHtml(
      AstroField,
      { props, slots: { default: control } },
      createElement(Field, props as never, createElement(Input, { type: 'search', start: reactIcon })),
    )
  })

  const others: [string, () => Promise<string>, ReactElement][] = [
    [
      'Textarea',
      () => container.renderToString(AstroTextarea, { props: { rows: 3 } }),
      createElement(Textarea, { rows: 3 }),
    ],
    [
      'Select',
      () => container.renderToString(AstroSelect, { slots: { default: options } }),
      createElement(Select, {}, reactOptions),
    ],
    [
      'Checkbox',
      () => container.renderToString(AstroCheckbox, { slots: { default: 'I agree' } }),
      createElement(Checkbox, {}, 'I agree'),
    ],
    [
      'Switch',
      () => container.renderToString(AstroSwitch, { slots: { default: 'Auto refresh' } }),
      createElement(Switch, {}, 'Auto refresh'),
    ],
  ]
  for (const [name, astro, react] of others) {
    it(`around ${name}`, async () => {
      const props = { id: 'f', label: 'Label', description: 'Help', error: 'Wrong', required: true }
      await expectSameHtml(
        AstroField,
        { props, slots: { default: await astro() } },
        createElement(Field, props as never, react),
      )
    })
  }
})

describe('RadioGroup', () => {
  const radios = async () =>
    (
      await Promise.all(
        ['tq', 'sisi'].map((value) =>
          container.renderToString(AstroRadio, { props: { name: 'server', value }, slots: { default: value } }),
        ),
      )
    ).join('')
  const reactRadios = ['tq', 'sisi'].map((value) => createElement(Radio, { key: value, name: 'server', value }, value))

  const cases: [string, Record<string, unknown>][] = [
    ['legend', { id: 'server', legend: 'Server' }],
    ['description and error', { id: 'server', legend: 'Server', description: 'Pick one', error: 'Required' }],
    ['required horizontal', { id: 'server', legend: 'Server', required: true, orientation: 'horizontal' }],
    ['extra class, no legend', { id: 'server', class: 'site-group' }],
  ]
  for (const [name, props] of cases) {
    it(name, async () => {
      await expectSameHtml(
        AstroRadioGroup,
        { props, slots: { default: await radios() } },
        createElement(RadioGroup, split(props) as never, reactRadios),
      )
    })
  }
})

describe('CheckboxGroup', () => {
  const boxes = async () =>
    (
      await Promise.all(
        ['combat', 'industry'].map((value) =>
          container.renderToString(AstroCheckbox, { props: { name: 'category', value }, slots: { default: value } }),
        ),
      )
    ).join('')
  const reactBoxes = ['combat', 'industry'].map((value) =>
    createElement(Checkbox, { key: value, name: 'category', value }, value),
  )

  const cases: [string, Record<string, unknown>][] = [
    ['legend', { id: 'category', legend: 'Category' }],
    ['description and error', { id: 'category', legend: 'Category', description: 'Pick any', error: 'Pick one' }],
    ['required horizontal', { id: 'category', legend: 'Category', required: true, orientation: 'horizontal' }],
  ]
  for (const [name, props] of cases) {
    it(name, async () => {
      await expectSameHtml(
        AstroCheckboxGroup,
        { props, slots: { default: await boxes() } },
        createElement(CheckboxGroup, split(props) as never, reactBoxes),
      )
    })
  }
})
