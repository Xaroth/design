# @xaroth.nl/design

## 0.3.0

### Minor Changes

- [#13](https://github.com/Xaroth/design/pull/13)
  [`d74de3d`](https://github.com/Xaroth/design/commit/d74de3d7e82ad8b71f5f6099feacfcaa3dcc25b1) - Add `Modal`, `Dialog`
  and `ConfirmDialog`, built on the native modal `<dialog>`. `Modal` is the centered surface with backdrop, Escape and
  backdrop dismissal, and scroll lock. `Dialog` adds a title, body, actions and a close button. `ConfirmDialog` is the
  "are you sure" preset with a danger tone and a pending state. React is controlled through `open` and `onClose`; Astro
  opens and closes through invoker commands (`modalCommand`) without client JS. Adds the `--x-color-overlay` token to
  both themes.

## 0.2.0

### Minor Changes

- [#7](https://github.com/Xaroth/design/pull/7)
  [`cda755f`](https://github.com/Xaroth/design/commit/cda755faa74c849129d1a37db52620da517e18b8) - New theme fonts. EVE
  Online uses Saira, Sofia Sans and Azeret Mono. Xaroth uses Alegreya SC, Alegreya, Alegreya Sans and Red Hat Mono.

### Patch Changes

- [#6](https://github.com/Xaroth/design/pull/6)
  [`62e4b41`](https://github.com/Xaroth/design/commit/62e4b41fb2902b8d5de367557810631699fa6b6c) - Prose and
  DescriptionList link colors only apply to plain links, so a Button, Tag or other part rendered as an `<a>` inside them
  keeps its own color.
