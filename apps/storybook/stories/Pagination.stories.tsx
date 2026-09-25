import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination } from '@xaroth.nl/design/react'
import { matrix, Row, Rows } from './shared.tsx'

const meta = {
  title: 'Pagination',
  component: Pagination,
  args: {
    page: 2,
    pages: 8,
    href: '#page-{page}',
    siblings: 1,
    ends: false,
    align: 'center',
    label: 'Pagination',
    prevLabel: 'Prev',
    nextLabel: 'Next',
    firstLabel: 'First',
    lastLabel: 'Last',
    summaryLabel: 'Page {page} of {pages}',
  },
  argTypes: {
    page: { control: { type: 'number', min: 1 } },
    pages: { control: { type: 'number', min: 1 } },
    siblings: { control: { type: 'number', min: 0 } },
    href: { control: 'text' },
    firstHref: { control: 'text' },
    ends: { control: 'boolean' },
    align: { control: 'inline-radio', options: ['center', 'start'] },
    label: { control: 'text' },
    prevLabel: { control: 'text' },
    nextLabel: { control: 'text' },
    firstLabel: { control: 'text' },
    lastLabel: { control: 'text' },
    summaryLabel: { control: 'text' },
  },
} satisfies Meta<typeof Pagination>

export default meta

export const Default: StoryObj<typeof meta> = { name: 'Pagination' }

export const Variants: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      {(['center', 'start'] as const).map((align) => (
        <Row
          key={align}
          label={`Align ${align}`}
          stack
        >
          <Pagination
            label={`Pagination, ${align}`}
            page={4}
            pages={12}
            href="#page-{page}"
            align={align}
          />
        </Row>
      ))}
      <Row
        label="With first and last"
        stack
      >
        <Pagination
          label="Pagination, ends"
          page={6}
          pages={40}
          href="#page-{page}"
          ends
        />
      </Row>
      {[0, 2].map((siblings) => (
        <Row
          key={siblings}
          label={`Siblings ${siblings}`}
          stack
        >
          <Pagination
            label={`Pagination, siblings ${siblings}`}
            page={10}
            pages={20}
            href="#page-{page}"
            siblings={siblings}
          />
        </Row>
      ))}
      {[3, 7].map((pages) => (
        <Row
          key={pages}
          label={`${pages} pages`}
          stack
        >
          <Pagination
            label={`Pagination, ${pages} pages`}
            page={2}
            pages={pages}
            href="#page-{page}"
          />
        </Row>
      ))}
    </Rows>
  ),
}

export const States: StoryObj<typeof meta> = {
  parameters: matrix,
  render: () => (
    <Rows>
      <Row
        label="First page: prev and first disabled"
        stack
      >
        <Pagination
          label="Pagination, first page"
          page={1}
          pages={8}
          href="#page-{page}"
          ends
        />
      </Row>
      <Row
        label="Last page: next and last disabled"
        stack
      >
        <Pagination
          label="Pagination, last page"
          page={8}
          pages={8}
          href="#page-{page}"
          ends
        />
      </Row>
      <Row
        label="Single page"
        stack
      >
        <Pagination
          label="Pagination, single page"
          page={1}
          pages={1}
          href="#page-{page}"
        />
      </Row>
      <Row
        label="Separate first page URL"
        stack
      >
        <Pagination
          label="Pagination, first href"
          page={3}
          pages={5}
          href="#blog/page/{page}"
          firstHref="#blog"
        />
      </Row>
    </Rows>
  ),
}
