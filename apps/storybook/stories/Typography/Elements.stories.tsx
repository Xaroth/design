import type { Meta, StoryObj } from '@storybook/react-vite'
import { stack } from './shared.tsx'

const meta = { title: 'Typography/Elements' } satisfies Meta

export default meta

// Base element styles outside of Prose, as a site gets them from core.css.
export const Elements: StoryObj = {
  render: () => (
    <div style={{ ...stack, maxWidth: 720 }}>
      <h1>Heading one</h1>
      <h2>Heading two</h2>
      <h3>Heading three</h3>
      <h4>Heading four</h4>
      <p>
        Body text with <a href="#top">a link</a>, <strong>strong text</strong>, <em>emphasis</em>,{' '}
        <code>inline code</code>, <kbd>Ctrl</kbd> + <kbd>K</kbd> and <small>small text</small>.
      </p>
      <p className="x-muted">Muted text for secondary information.</p>
      <hr />
      <p className="x-lead">A lead paragraph introduces a page or section.</p>
    </div>
  ),
}
