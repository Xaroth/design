import type { Meta, StoryObj } from '@storybook/react-vite'
import { Measured, stack } from './shared.tsx'

const meta = { title: 'Typography/Scale' } satisfies Meta

export default meta

// Keyed on the theme so sizes are measured again after switching.
export const Scale: StoryObj = {
  render: (_args, { globals }) => (
    <div
      key={globals.theme as string}
      style={stack}
    >
      <Measured
        label="Display"
        token=".x-display"
      >
        <p className="x-display">Tools for capsuleers</p>
      </Measured>
      <Measured
        label="Heading 1"
        token="h1"
      >
        <h1>Building a typed ESI client</h1>
      </Measured>
      <Measured
        label="Heading 2"
        token="h2"
      >
        <h2>Cleaning up the spec</h2>
      </Measured>
      <Measured
        label="Heading 3"
        token="h3"
      >
        <h3>Error limits in practice</h3>
      </Measured>
      <Measured
        label="Lead"
        token=".x-lead"
      >
        <p className="x-lead">
          ESI publishes an OpenAPI spec for every route. With a bit of cleanup it drives a typed client.
        </p>
      </Measured>
      <Measured
        label="Body"
        token="body"
      >
        <p>
          Every tool on this site talks to ESI, the EVE Swagger Interface. It is a large API: over two hundred routes,
          each with its own scopes, cache timers, and error shapes.
        </p>
      </Measured>
      <Measured
        label="Small"
        token=".x-small"
      >
        <p className="x-small">Published 2 Sep 2026, 9 minute read.</p>
      </Measured>
      <Measured
        label="Label"
        token=".x-label"
      >
        <p className="x-label">Fitting / 06 modules</p>
      </Measured>
    </div>
  ),
}
