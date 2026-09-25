import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Field, FilterPanel, Input } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from '../shared.tsx'
import { filterFields, makeFilterFields } from './shared.tsx'

// Outside a FilterLayout the panel uses its stacked grid: one column, two from 640px.
const meta = {
  title: 'Filters/FilterPanel',
  component: FilterPanel,
  args: {
    'aria-label': 'Filter achievements',
    children: filterFields,
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof FilterPanel>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'FilterPanel' }

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row
        label="With submit and reset"
        stack
      >
        <FilterPanel
          aria-label="Filter achievements, with actions"
          onSubmit={(e) => e.preventDefault()}
        >
          {makeFilterFields('s1')}
          <div className="x-cluster-sm">
            <Button type="submit">Apply</Button>
            <Button
              type="reset"
              variant="tertiary"
            >
              Reset filters
            </Button>
          </div>
        </FilterPanel>
      </Row>
      <Row
        label="Invalid and disabled fields"
        stack
      >
        <FilterPanel
          aria-label="Filter market orders"
          onSubmit={(e) => e.preventDefault()}
        >
          <Field
            id="s2-min"
            label="Min price"
            error="Enter a number of ISK."
          >
            <Input defaultValue="a lot" />
          </Field>
          <Field
            id="s2-region"
            label="Region"
            description="Sign in to filter by your region."
          >
            <Input
              disabled
              defaultValue="The Forge"
            />
          </Field>
        </FilterPanel>
      </Row>
    </Rows>
  ),
}
