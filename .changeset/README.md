# Changesets

Versions and changelogs for `@xaroth.nl/design` come from changesets.

Every PR that changes the package adds one: `pnpm changeset`, pick the bump, write one line for the changelog. A new part or prop is `minor`, a fix is `patch`, and a renamed or removed class, token, prop or export is `major` (see "Breaking changes" in CONTRIBUTING.md).

On merge to `main`, CI opens a "version packages" PR. Merging that PR publishes to npm with trusted publishing (OIDC), after the full test suite passes.
