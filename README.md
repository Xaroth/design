# design

Shared design system for [xaroth.nl](https://xaroth.nl) and [eve-online.tools](https://eve-online.tools), published as `@xaroth.nl/design`.

One core (layout, sizes, part structure) and two themes (color, fonts, shape, ornament). The same parts render identical HTML from Astro and React.

## Use

```ts
// Once per site, in the layout.
import '@xaroth.nl/design/themes/xaroth.css' // or themes/eve-online.css
```

```astro
---
import Button from '@xaroth.nl/design/astro/button'
---
<Button variant="secondary" href="/tools">Browse tools</Button>
```

```tsx
import { Button } from '@xaroth.nl/design/react'
;<Button variant="secondary">Browse tools</Button>
```

Components bring their own structure CSS; the theme file brings tokens, base styles and the theme look. For pages without a bundler, `@xaroth.nl/design/all.css` holds the structure of every part.

A site loads one theme and needs nothing else. To show several themes on one page, set `data-x-theme` on `<html>` (any value) and wrap each section in `data-x-theme="xaroth"` or `data-x-theme="eve-online"`.

## Conventions

- Classes: `x-` prefix, BEM. `x-card`, `x-card__title`, `x-button--primary`.
- Tokens: `--x-*`. Core owns layout tokens (space, type scale, control sizes); themes own color, font and shape tokens.
- Layers: `x.reset`, `x.core`, `x.theme`. Site CSS outside layers always wins.
- Each part lives in `src/components/<part>/`; see CONTRIBUTING.md. Class names come from the folder's `index.ts`, shared by the Astro and React components.
- Browsers: Baseline widely available.

## Repo

| Path | What |
| --- | --- |
| `packages/design` | The published package |
| `apps/storybook` | Storybook (React), both themes, axe checks |
| `apps/astro-harness` | Astro app; runs the same-HTML test for every part |

```sh
pnpm install
pnpm build
pnpm test        # syncpack, format, typecheck, lint, same-HTML test
pnpm storybook   # http://localhost:6006
pnpm harness     # http://localhost:4400
```

Releases use changesets: `pnpm changeset`, merge, and the release workflow publishes.
