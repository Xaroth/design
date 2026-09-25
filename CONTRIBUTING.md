# Adding or changing a part

Everything for a part lives in one folder, `packages/design/src/components/<part>/`. Related components share a folder
(for example `field` holds input, select, checkbox and friends).

| File                                           | Job                                                                                                                                                        |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.ts`                                     | Class recipe (`cardClass(...)`), state helpers and prop types. The only place class names and state attributes are decided.                                |
| `<part>.scss`                                  | Structure: layout, spacing, sizes, states. Tokens only, no theme look. Wrapped in `@layer x.core`.                                                         |
| `<part>.xaroth.scss`, `<part>.eve-online.scss` | Theme look: shape, ornament, theme-specific color. Everything inside `@include theme.parts('<theme>') { ... }`. Built into that theme's single stylesheet. |
| `<name>.astro`                                 | One file per Astro component, kebab-case (`section-head.astro`). Imports `./<part>.scss` and the recipe.                                                   |
| `<part>.tsx`                                   | The React components of the folder. Imports `./<part>.scss` and the recipe.                                                                                |

Outside the package:

| File                                           | Job                                                                                              |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `apps/astro-harness/test/parts/<part>.test.ts` | Same-HTML test: every meaningful prop combination, Astro vs React, via `expectSameHtml`.         |
| `apps/astro-harness/src/pages/<part>.astro`    | Harness page, wrapped in `layouts/Harness.astro`, which renders it once per theme.               |
| `apps/storybook/stories/<Part>.stories.tsx`    | Default story with working controls for every prop, plus `Variants` and `States` matrix stories. |

The theme list lives in `src/config.ts`; scripts, exports, Storybook and the harness read it.

Entry files (`src/parts.ts`, `src/astro.ts`, `src/react.ts`, `src/styles/all.scss`,
`src/styles/themes/_<theme>-parts.scss`) are generated from the folders: run `pnpm --filter @xaroth.nl/design generate`
after adding a folder or an `.astro` file. `pnpm test` fails when they are out of date.

## How sites use it

- Load one theme once: `import '@xaroth.nl/design/themes/xaroth.css'`. It carries tokens, reset, base type and the theme
  look for every part.
- Import components from the barrels: `import { SectionHead } from '@xaroth.nl/design/astro'` or
  `'@xaroth.nl/design/react'`. In production builds unused components and their CSS are dropped; `astro dev` loads all
  of them.
- Apps in this repo resolve the package with the `source` condition, so they read `src` directly and need no build while
  developing.

## Rules

- Classes: `x-` prefix, BEM. `x-card`, `x-card__title`, `x-card--featured`. Modifier values never overlap between props.
- Tokens only. Core owns layout tokens (`--x-space-*`, `--x-fs-*`, `--x-control-*`, `--x-page`, `--x-gap`,
  `--x-section`). Themes own `--x-color-*`, `--x-font-*`, `--x-track-*`, `--x-radius`, `--x-cut-*`. Theme extras (for
  example `--x-color-spice`) are only used in that theme's partials.
- Structure is shared, look is themed. If a theme needs different HTML, add a prop (for example `layout="stacked"`),
  never theme detection in components.
- Astro and React output identical HTML for the same props. Astro takes `class` and named slots; React takes `className`
  and ReactNode props with the same names.
- No client JS in parts unless the part is unusable without it. Prefer native elements (`details`, `dialog`, form
  controls).
- Accessibility: WCAG 2.2 AA contrast, visible focus, correct roles and labels. Storybook runs axe with `test: 'error'`.
- Text never below `--x-fs-label` (13px).
- Stories: per component a default story with controls, named like the component, then `Variants` (every variant, tone
  and size in one view) and `States` (disabled, loading, invalid, read-only, current, empty) where the part has them.
  These keep every combination under the axe check. Group in a folder only when a part has more than one component (for
  example `Form/Input`, `Form/Select`).

## Breaking changes

The public API is the component props and slots, the `x-` class names, the `--x-*` tokens, `data-x-theme`, the package
exports and the `scss/*` mixins. Renaming or removing any of them is a major change; adding one is minor; fixing a look
or behaviour is a patch. Add a changeset (`pnpm changeset`) to every PR that changes the package.

## Comments

- Only where the code does not explain itself: a non-obvious reason, a browser quirk, a constraint. Say why, not what.
- Short and rare. No history ("was", "ported from"), no design version names, no restating the folder or theme a file is
  in.

## Reference

Storybook is the reference for how every part looks and behaves in each theme. Change a look there first, and keep the
harness page and same-HTML tests in step. `pnpm test` builds Storybook and fails when a story does not render or has an
axe (WCAG 2.2 AA) violation.
