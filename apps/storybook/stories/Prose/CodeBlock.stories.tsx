import type { Meta, StoryObj } from '@storybook/react-vite'
import { CodeBlock, Container } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'

const code = `import { createEsiClient } from '@eve-online-tools/esi-provider'

const esi = createEsiClient({ compatibilityDate: '2026-09-01' })

const { data, error } = await esi.GET('/characters/{character_id}/', {
  params: { path: { character_id: 2112625428 } },
})

if (error) throw error
console.log(data.name) // typed as string`

const meta = {
  title: 'Prose/CodeBlock',
  component: CodeBlock,
  args: { code, lang: 'ts', title: 'example.ts' },
  argTypes: {
    code: { control: 'text' },
    lang: { control: 'text' },
    title: { control: 'text' },
  },
  render: (args) => (
    <Container>
      <CodeBlock {...args} />
    </Container>
  ),
} satisfies Meta<typeof CodeBlock>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'CodeBlock' }

const samples = [
  {
    lang: 'py',
    title: 'standings.py',
    code: `# Standings below 5.0 lock the agent
def can_use(agent, standing: float) -> bool:
    return standing >= agent.required or agent.level == 1`,
  },
  { lang: 'sh', title: undefined, code: 'pnpm add @eve-online-tools/esi-provider # typed ESI client' },
  { lang: 'json', title: 'route.json', code: '{ "origin": 30000142, "destination": 30002187, "flag": "secure" }' },
  { lang: undefined, title: 'jita-price.txt', code: 'Tritanium  4.12 ISK  (sell, Jita 4-4)' },
  { lang: undefined, title: undefined, code: 'No bar: neither title nor language.' },
  {
    lang: 'ts',
    title: 'long-line.ts',
    code: `const url = 'https://esi.evetech.net/latest/characters/2112625428/achievements/?datasource=tranquility&language=en'`,
  },
]

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Container>
      <Rows>
        {samples.map((sample, i) => (
          <Row
            key={i}
            label={[sample.title ? 'title' : 'no title', sample.lang ?? 'no language'].join(', ')}
            stack
          >
            <CodeBlock {...sample} />
          </Row>
        ))}
      </Rows>
    </Container>
  ),
}
