import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Tag } from '@xaroth.nl/design/react'

const meta = { title: 'Layout helpers' } satisfies Meta

export default meta

const stackSizes = ['xs', 'md', 'xl'] as const
const clusterSizes = ['xs', 'sm', 'lg'] as const

const wash = 'var(--x-color-accent-wash)'
const edge = '1px dashed var(--x-color-accent-edge)'
const block = {
  background: 'var(--x-color-surface-3)',
  border: '1px solid var(--x-color-line-strong)',
  padding: '4px 12px',
}

const classes = [
  ['x-stack-{size}', 'column; children spaced by the gap'],
  ['x-cluster-{size}', 'wrapping row, items centered, same gap both ways'],
  ['x-visually-hidden', 'hidden on screen, still read by screen readers; shows while focused'],
]

export const LayoutHelpers: StoryObj = {
  name: 'Layout helpers',
  render: () => (
    <div
      className="x-p-xl x-stack-3xl"
      style={{ maxWidth: 1200 }}
    >
      <section>
        <h2 className="x-mb-sm">Stack</h2>
        <p className="x-muted x-mb-lg">
          Vertical flow. The tinted area is the stack; the gap between children comes from the size.
        </p>
        <div
          className="x-gap-xl"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(14rem, 1fr))' }}
        >
          {stackSizes.map((size) => (
            <div key={size}>
              <code className="x-small">x-stack-{size}</code>
              <div
                className={`x-stack-${size} x-mt-xs`}
                style={{ background: wash, outline: edge }}
              >
                {['First', 'Second', 'Third'].map((label) => (
                  <div
                    key={label}
                    className="x-small"
                    style={block}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="x-mb-sm">Cluster</h2>
        <p className="x-muted x-mb-lg">A row that wraps, for tags, meta and button groups.</p>
        <div className="x-stack-xl">
          {clusterSizes.map((size) => (
            <div key={size}>
              <code className="x-small">x-cluster-{size}</code>
              <div
                className={`x-cluster-${size} x-mt-xs x-p-sm`}
                style={{ background: wash, outline: edge, maxWidth: 480 }}
              >
                {['ESI', 'SDE', 'TypeScript', 'OpenAPI', 'Astro', 'React', 'Market'].map((label) => (
                  <Tag key={label}>{label}</Tag>
                ))}
              </div>
            </div>
          ))}
          <div>
            <code className="x-small">x-cluster-sm</code>
            <div className="x-cluster-sm x-mt-xs">
              <Button size="sm">Save</Button>
              <Button
                size="sm"
                variant="secondary"
              >
                Cancel
              </Button>
              <span className="x-small x-muted">Mixed heights stay centered.</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="x-mb-sm">Visually hidden</h2>
        <p className="x-muted x-mb-lg">
          The button below has a visible icon and a hidden text label. Tab to the skip link to see it appear.
        </p>
        <div className="x-cluster-md">
          <Button
            size="sm"
            variant="secondary"
          >
            <span aria-hidden="true">✕</span>
            <span className="x-visually-hidden">Close panel</span>
          </Button>
          <a
            href="#layout-helpers-classes"
            className="x-visually-hidden"
          >
            Skip to the class list
          </a>
        </div>
      </section>

      <section>
        <h2
          id="layout-helpers-classes"
          className="x-mb-lg"
        >
          Classes
        </h2>
        <p className="x-muted x-mb-md">
          Sizes are the spacing scale: <code>none 2xs xs sm md lg xl 2xl 3xl 4xl</code>. Grid covers column layouts.
        </p>
        <dl
          className="x-gap-x-xl x-gap-y-sm"
          style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr' }}
        >
          {classes.map(([cls, use]) => (
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
