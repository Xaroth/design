import type { Meta, StoryObj } from '@storybook/react-vite'
import { CodeBlock, Container, Prose } from '@xaroth.nl/design/react'

const content = (
  <>
    <p>
      Every tool on this site talks to ESI, the EVE Swagger Interface. It is a large API with its own scopes, cache
      timers, and error shapes. Writing a client by hand <em>rots</em> the moment a field is added.
    </p>
    <p>
      The spec is published as <a href="#spec">OpenAPI</a>, and <code>openapi-typescript</code> turns it into{' '}
      <strong>types</strong>.
    </p>
    <h2 id="spec">Cleaning up the spec</h2>
    <ol>
      <li>Download the latest spec for the chosen compatibility date.</li>
      <li>Drop deprecated and legacy route versions.</li>
      <li>Generate types and commit them next to the client.</li>
    </ol>
    <CodeBlock
      code="const esi = createEsiClient({ compatibilityDate: '2026-09-01' })"
      lang="ts"
      title="example.ts"
    />
    <blockquote>
      <p>Treat the Expires header as a promise. Asking again before it passes only burns error budget.</p>
      <footer>ESI best practices</footer>
    </blockquote>
    <h3>Error limits in practice</h3>
    <table>
      <thead>
        <tr>
          <th scope="col">Errors left</th>
          <th scope="col">Behaviour</th>
          <th scope="col">Delay</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>100 to 50</td>
          <td>Normal</td>
          <td>None</td>
        </tr>
        <tr>
          <td>49 to 1</td>
          <td>Slow down</td>
          <td>250 ms</td>
        </tr>
        <tr>
          <td>0</td>
          <td>Stop</td>
          <td>Until reset</td>
        </tr>
      </tbody>
    </table>
    <ul>
      <li>Generated React Query hooks per route.</li>
      <li>Scope checks at compile time.</li>
    </ul>
    <hr />
    <figure>
      <svg
        viewBox="0 0 640 80"
        fill="none"
        stroke="currentColor"
        role="img"
        aria-label="Request flow"
      >
        <rect
          x="10"
          y="10"
          width="620"
          height="60"
          strokeOpacity="0.6"
        />
      </svg>
      <figcaption>Request flow: tool, typed client, cache, then ESI.</figcaption>
    </figure>
  </>
)

const meta = {
  title: 'Prose/Prose',
  component: Prose,
  args: { children: content },
  argTypes: {
    as: { control: 'select', options: ['div', 'article', 'section', 'main'] },
    children: { control: false },
  },
  render: (args) => (
    <Container>
      <Prose {...args} />
    </Container>
  ),
} satisfies Meta<typeof Prose>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Prose' }
