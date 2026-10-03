---
'@xaroth.nl/design': patch
---

Tooltip: show the bubble in the top layer (Popover API) at fixed coordinates. Overflow containers no longer clip it or
grow a scrollbar for it, it shows above modal dialogs, flips once when the requested side does not fit, and stays 8px
inside the viewport. `open` tooltips keep the inline bubble. Browsers without popover support keep the CSS-only bubble.
Adds `tooltipScript` and `installTooltips`; `tooltipEscapeScript` is deprecated.
