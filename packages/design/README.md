# @xaroth.nl/design

Design system for [xaroth.nl](https://xaroth.nl) and [eve-online.tools](https://eve-online.tools): Astro and React components over shared CSS, with one theme per site.

```sh
pnpm add @xaroth.nl/design
```

## Use

Load one theme once, in the site layout. It brings the tokens, reset, base type, spacing utilities, fonts and the theme's look for every part.

```ts
import '@xaroth.nl/design/themes/xaroth.css' // or themes/eve-online.css
```

Import components from a barrel. Each component brings its own structure CSS; production builds drop what a page does not use.

```astro
---
import { Button, Card, Tag } from '@xaroth.nl/design/astro'
---
<Card title="Fit checker" href="/tools/fits">
  Paste a fit and see what it needs.
  <Tag slot="tags">ESI</Tag>
</Card>
<Button variant="secondary" href="/tools">Browse tools</Button>
```

```tsx
import { Button } from '@xaroth.nl/design/react'

export const Launch = () => <Button onClick={launch}>Launch</Button>
```

Astro and React components render the same HTML for the same props. Astro takes `class` and named slots; React takes `className` and ReactNode props with the slot names.

Class recipes (for example `buttonClass`) and the theme list are available from `@xaroth.nl/design/parts` for markup you write yourself.

## Themes

- One theme per build. Pages of one Astro build that import different theme files end up sharing both.
- To show several themes on one page (docs, previews), load `@xaroth.nl/design/themes.css`, put `data-x-theme` (any value) on `<html>` and wrap each section in `data-x-theme="xaroth"` or `data-x-theme="eve-online"`. Sections must be siblings, not nested.
- CSS sits in the layers `x.reset`, `x.core`, `x.theme` and `x.utility`. Your own unlayered CSS always wins.

## Spacing utilities

`x-{p,m}{,x,y,t,r,b,l}-{size}` and `x-gap{,-x,-y}-{size}`, with sizes `none 2xs xs sm md lg xl 2xl 3xl 4xl` (4 to 96px). Margins also take `section` and `auto`. Layout helpers: `x-stack-{size}` (vertical flow), `x-cluster-{size}` (wrapping row), `x-visually-hidden`.

## Parts

Alert, Avatar, Badge, Breadcrumbs, Button, Card, CheckboxGroup, Checkbox, CodeBlock, ConfirmDialog, Container, DescriptionList, Dialog, Divider, EmptyState, Field, FilterLayout, FilterPanel, Footer, Grid, Header, Icon, Input, Modal, PageHead, Pagination, Panel, Progress, Prose, Radio, RadioGroup, Section, SectionHead, Select, Stat, StatGroup, Switch, Table, Tabs, Tag, Textarea, Timeline, Tooltip.

Props, slots and every variant are documented in the Storybook of the [source repository](https://github.com/Xaroth/design).

## Sass

`@xaroth.nl/design/scss/*` exposes the layer order (`_layers.scss`), the theme scope mixins (`_theme.scss`) and the cut-corner helpers (`_chamfer.scss`) for sites that build on the system.

## Requirements

A bundler that handles CSS imports from packages (Astro, Vite, Next). Modern browsers only (Baseline widely available). `astro` 7 and `react` 19 are optional peers: install the one you use.
