import { Checkbox, Field, FilterPanel, Input, Select, Switch, Table } from '@xaroth.nl/design/react'

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

export const filterFields = (
  <>
    <Field
      id="f-search"
      label="Search"
    >
      <Input
        type="search"
        placeholder="Achievement name"
        start={searchIcon}
      />
    </Field>
    <Field
      id="f-faction"
      label="Faction"
    >
      <Select>
        {factions.map((f) => (
          <option key={f}>{f}</option>
        ))}
      </Select>
    </Field>
    <fieldset className="x-radio-group x-radio-group--horizontal">
      <legend className="x-radio-group__legend">Category</legend>
      <div className="x-radio-group__options">
        {categories.map((c, i) => (
          <Checkbox
            key={c}
            name="category"
            value={c}
            defaultChecked={i < 2}
          >
            {c}
          </Checkbox>
        ))}
      </div>
    </fieldset>
    <Switch name="hide">Hide completed</Switch>
  </>
)

export const filterForm = (
  <FilterPanel
    aria-label="Filter achievements"
    onSubmit={(e) => e.preventDefault()}
  >
    {filterFields}
  </FilterPanel>
)

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
