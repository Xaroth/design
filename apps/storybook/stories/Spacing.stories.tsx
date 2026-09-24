import type { Meta, StoryObj } from '@storybook/react-vite'
import { useLayoutEffect, useRef, useState } from 'react'

const meta = { title: 'Spacing' } satisfies Meta

export default meta

const sizes = [
  ['none', '0'],
  ['2xs', '--x-space-1'],
  ['xs', '--x-space-2'],
  ['sm', '--x-space-3'],
  ['md', '--x-space-4'],
  ['lg', '--x-space-5'],
  ['xl', '--x-space-6'],
  ['2xl', '--x-space-7'],
  ['3xl', '--x-space-8'],
  ['4xl', '--x-space-9'],
] as const

const prefixes = [
  ['x-p-', 'padding, all sides'],
  ['x-px- / x-py-', 'padding, horizontal / vertical'],
  ['x-pt- x-pr- x-pb- x-pl-', 'padding, one side'],
  ['x-m-', 'margin, all sides (also -section, -auto)'],
  ['x-mx- / x-my-', 'margin, horizontal / vertical'],
  ['x-mt- x-mr- x-mb- x-ml-', 'margin, one side'],
  ['x-gap- / x-gap-x- / x-gap-y-', 'gap in grid and flex layouts'],
]

const wash = 'var(--x-color-accent-wash)'
const edge = '1px dashed var(--x-color-accent-edge)'
const fill = { background: 'var(--x-color-surface-2)', minHeight: 24 }
const content = { background: 'color-mix(in oklab, var(--x-color-accent) 55%, transparent)', minHeight: 24 }

function Width({ token }: { token: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [px, setPx] = useState('')
  // Stories remount on theme change (keyed), so measuring once per mount is enough.
  useLayoutEffect(() => {
    setPx(ref.current ? `${ref.current.getBoundingClientRect().width}px` : '')
  }, [])
  return (
    <>
      <span
        ref={ref}
        style={{
          display: 'inline-block',
          height: 16,
          width: token === '0' ? 0 : `var(${token})`,
          background: 'var(--x-color-accent)',
        }}
      />
      <span className="x-small x-muted x-ml-sm">{px}</span>
    </>
  )
}

export const Spacing: StoryObj = {
  render: (_args, { globals }) => (
    <div
      key={globals.theme as string}
      className="x-p-xl"
      style={{ display: 'grid', gap: 'var(--x-space-8)', maxWidth: 1200 }}
    >
      <section>
        <h2 className="x-mb-lg">Scale</h2>
        <div
          className="x-gap-sm"
          style={{ display: 'grid', gridTemplateColumns: '6rem 10rem 1fr', alignItems: 'center' }}
        >
          {sizes.map(([name, token]) => (
            <div
              key={name}
              style={{ display: 'contents' }}
            >
              <code>{name}</code>
              <code className="x-small x-muted">{token}</code>
              <div>
                <Width token={token} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="x-mb-sm">Padding</h2>
        <p className="x-muted x-mb-lg">The tinted area is the padding, the solid block is the content.</p>
        <div
          className="x-gap-lg"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))' }}
        >
          {['x-p-sm', 'x-p-lg', 'x-px-xl', 'x-py-xl', 'x-pt-2xl', 'x-pl-2xl'].map((cls) => (
            <div key={cls}>
              <code className="x-small">{cls}</code>
              <div
                className={`${cls} x-mt-xs`}
                style={{ background: wash, outline: edge }}
              >
                <div style={content} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="x-mb-sm">Margin and gap</h2>
        <p className="x-muted x-mb-lg">Blocks with a top margin, then a row using a gap.</p>
        {['x-mt-none', 'x-mt-sm', 'x-mt-lg', 'x-mt-2xl'].map((cls) => (
          <div
            key={cls}
            className={cls}
            style={{ ...fill, display: 'flex', alignItems: 'center', paddingInline: 12 }}
          >
            <code className="x-small">{cls}</code>
          </div>
        ))}
        <div
          className="x-gap-xl x-mt-2xl"
          style={{ display: 'flex' }}
        >
          {['x-gap-xl', 'between', 'these'].map((label) => (
            <div
              key={label}
              style={{ ...fill, flex: 1, display: 'flex', alignItems: 'center', paddingInline: 12 }}
            >
              <code className="x-small">{label}</code>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="x-mb-lg">Classes</h2>
        <p className="x-muted x-mb-md">
          Add a size from the scale, for example <code>x-p-sm</code>, <code>x-mt-lg</code> or <code>x-px-md</code>.
          Utilities sit in the last layer, so they win over component styles.
        </p>
        <dl
          className="x-gap-x-xl x-gap-y-sm"
          style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr' }}
        >
          {prefixes.map(([cls, use]) => (
            <div
              key={cls}
              style={{ display: 'contents' }}
            >
              <dt>
                <code>{cls}</code>
              </dt>
              <dd className="x-muted">{use}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  ),
}
