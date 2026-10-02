---
'@xaroth.nl/design': minor
---

Add `Modal`, `Dialog` and `ConfirmDialog`, built on the native modal `<dialog>`. `Modal` is the centered surface with backdrop, Escape and backdrop dismissal, and scroll lock. `Dialog` adds a title, body, actions and a close button. `ConfirmDialog` is the "are you sure" preset with a danger tone and a pending state. React is controlled through `open` and `onClose`; Astro opens and closes through invoker commands (`modalCommand`) without client JS. Adds the `--x-color-overlay` token to both themes.
