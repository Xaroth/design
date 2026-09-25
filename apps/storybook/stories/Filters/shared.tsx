import { Checkbox, CheckboxGroup, Field, FilterPanel, Input, Select, Switch, Table } from '@xaroth.nl/design/react'

const factions = ['All factions', 'Amarr Empire', 'Caldari State', 'Gallente Federation', 'Minmatar Republic']
const categories = ['Combat', 'Industry', 'Exploration']

const searchIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
  >
    <circle
      cx="11"
      cy="11"
      r="7"
    />
    <path d="M20 20l-4-4" />
  </svg>
)

// Ids are prefixed so several filter forms can share one story.
export const makeFilterFields = (prefix = 'f') => (
  <>
    <Field
      id={`${prefix}-search`}
      label="Search"
    >
      <Input
        type="search"
        placeholder="Achievement name"
        start={searchIcon}
      />
    </Field>
    <Field
      id={`${prefix}-faction`}
      label="Faction"
    >
      <Select>
        {factions.map((f) => (
          <option key={f}>{f}</option>
        ))}
      </Select>
    </Field>
    <CheckboxGroup
      id={`${prefix}-category`}
      legend="Category"
      orientation="horizontal"
    >
      {categories.map((c, i) => (
        <Checkbox
          key={c}
          name={`${prefix}-category`}
          value={c}
          defaultChecked={i < 2}
        >
          {c}
        </Checkbox>
      ))}
    </CheckboxGroup>
    <Switch name={`${prefix}-hide`}>Hide completed</Switch>
  </>
)

export const makeFilterForm = (prefix = 'f') => (
  <FilterPanel
    aria-label="Filter achievements"
    onSubmit={(e) => e.preventDefault()}
  >
    {makeFilterFields(prefix)}
  </FilterPanel>
)

export const filterFields = makeFilterFields()
export const filterForm = makeFilterForm()

export const results = (
  <Table
    label="Achievements"
    columns={[
      { key: 'name', label: 'Achievement' },
      { key: 'faction', label: 'Faction' },
      { key: 'category', label: 'Category' },
      { key: 'reward', label: 'Reward LP', numeric: true },
    ]}
    rows={[
      { name: 'Wardec Veteran', faction: 'Amarr Empire', category: 'Combat', reward: '25,000' },
      { name: 'Sovereign Hauler', faction: 'Caldari State', category: 'Industry', reward: '4,800' },
      { name: 'Sisters of Mercy', faction: 'Gallente Federation', category: 'Exploration', reward: '10,000' },
      { name: 'Tribal Liberator', faction: 'Minmatar Republic', category: 'Combat', reward: '1,250' },
    ]}
  />
)
