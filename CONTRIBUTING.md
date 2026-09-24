# Adding or changing a part

A part is one UI piece (button, card, header). Every part has the same set of files, and each file has one job.

| File | Job |
| --- | --- |
| `packages/design/src/parts/<part>.ts` | Class recipe (`xCardClass(...)`) and state helpers. The only place class names and state attributes are decided. |
| `packages/design/src/styles/parts/_<part>.scss` | Structure: layout, spacing, sizes, states. Uses tokens only, no theme look. |
| `packages/design/src/styles/themes/<theme>/_<part>.scss` | Theme look: shape, ornament, theme-specific color. Everything inside `@include theme.parts('<theme>') { ... }`. |
| `packages/design/src/astro/<Part>.astro` | Astro component. Uses the recipe. |
| `packages/design/src/react/<Part>.tsx` | React component. Uses the recipe. Exported from `src/react/index.ts`. |
| `apps/astro-harness/test/parts/<part>.test.ts` | Same-HTML test: every meaningful prop combination, Astro vs React, via `expectSameHtml`. |
| `apps/astro-harness/src/pages/<part>.astro` | Harness page showing the part in both themes. |
| `apps/storybook/stories/<Part>.stories.tsx` | Story with working controls for every prop. |

## Rules

- Classes: `x-` prefix, BEM. `x-card`, `x-card__title`, `x-card--featured`. Modifier values never overlap between props.
- Tokens only. Core owns layout tokens (`--x-space-*`, `--x-fs-*`, `--x-control-*`, `--x-page`, `--x-gap`, `--x-section`). Themes own `--x-color-*`, `--x-font-*`, `--x-track-*`, `--x-radius`, `--x-cut-*`. Theme extras (for example `--x-color-spice`) are only used in that theme's partials.
- Structure is shared, look is themed. If a theme needs different HTML, add a prop (for example `layout="stacked"`), never theme detection in components.
- Astro and React output identical HTML for the same props. Astro takes `class` and named slots; React takes `className` and ReactNode props with the same names.
- No client JS in parts unless the part is unusable without it. Prefer native elements (`details`, `dialog`, form controls).
- Accessibility: WCAG 2.2 AA contrast, visible focus, correct roles and labels. Storybook runs axe with `test: 'error'`.
- Text never below `--x-fs-label` (13px).
- Stories: one story per component, named like the component. Group in a folder only when a part has more than one component (for example `Form/Input`, `Form/Select`).

## Design references

The looks come from the design guide (`../design-guide`), concepts 8 (EVE v4, theme `eve-online`) and 9 (Dune v4, theme `xaroth`). Layout values come from `../design-guide/LAYOUT.md`, including Revision 2. User picks are in `../design-guide/decisions/round-1.md`.
