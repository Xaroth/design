import type { Meta, StoryObj } from '@storybook/react-vite'
import { colClass, Container, Grid, type ColSpan, type ColStack } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'

type Args = { first: ColSpan; stack: ColStack }

const cell = {
  display: 'grid',
  placeItems: 'center',
  minHeight: 48,
  fontFamily: 'var(--x-font-mono)',
  fontSize: 'var(--x-fs-label)',
  color: 'var(--x-color-text-muted)',
  background: 'var(--x-color-accent-wash)',
}

const spans = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const

const meta = {
  title: 'Layout/Grid',
  args: { first: 8, stack: 'md' },
  argTypes: {
    first: { name: 'first span', control: 'select', options: spans },
    stack: { control: 'inline-radio', options: ['md', 'sm', 'never'] },
  },
  render: ({ first, stack }) => {
    const rest = (12 - first) as ColSpan
    return (
      <Container>
        <Grid>
          <div
            className={colClass({ span: first, stack })}
            style={cell}
          >
            x-col-{first}
          </div>
          <div
            className={colClass({ span: rest, stack })}
            style={cell}
          >
            x-col-{rest}
          </div>
        </Grid>
      </Container>
    )
  },
} satisfies Meta<Args>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Grid' }

const splits: ColSpan[][] = [[12], [6, 6], [4, 4, 4], [3, 3, 3, 3], [8, 4], [3, 9], [2, 8, 2]]

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Container>
      <Rows>
        {splits.map((split) => (
          <Row
            key={split.join('-')}
            label={split.join(' + ')}
            stack
          >
            <Grid>
              {split.map((span, i) => (
                <div
                  key={i}
                  className={colClass({ span })}
                  style={cell}
                >
                  x-col-{span}
                </div>
              ))}
            </Grid>
          </Row>
        ))}
        {(['md', 'sm', 'never'] as const).map((stack) => (
          <Row
            key={stack}
            label={`6 + 6, stack ${stack}`}
            stack
          >
            <Grid>
              {[6, 6].map((span, i) => (
                <div
                  key={i}
                  className={colClass({ span: span as ColSpan, stack })}
                  style={cell}
                >
                  stack {stack}
                </div>
              ))}
            </Grid>
          </Row>
        ))}
      </Rows>
    </Container>
  ),
}
