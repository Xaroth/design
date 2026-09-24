import type { Meta, StoryObj } from '@storybook/react-vite'
import { CodeBlock, Container } from '@xaroth.nl/design/react'

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
