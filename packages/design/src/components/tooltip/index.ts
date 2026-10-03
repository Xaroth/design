import { bem } from '../../bem.ts'
import { findTag, getAttr, mergeTokens, replaceTag, type Tag } from '../../html.ts'

export type TooltipPlacement = 'top' | 'bottom'

export type TooltipOptions = {
  placement?: TooltipPlacement
  /** Always shown, for docs and previews. */
  open?: boolean
  className?: string
}

const tooltip = bem('x-tooltip', { defaults: { placement: 'top' } })

export const tooltipClass = ({
  placement = 'top',
  open,
  dismissed,
  className,
}: TooltipOptions & { dismissed?: boolean } = {}): string => tooltip({ placement, open, dismissed }, className)

export const tooltipId = (id: string): string => `${id}-tip`

// Keeps any description the trigger already has and adds the tooltip after it.
export const describedBy = (existing: string | undefined, id: string): string => mergeTokens(existing, tooltipId(id))

const focusableTags = new Set(['button', 'select', 'textarea', 'summary', 'iframe'])
const wrapperTags = new Set(['astro-island', 'astro-slot', 'astro-static-slot'])

const isFocusable = (tag: Tag) => {
  const tabindex = getAttr(tag, 'tabindex')
  if (tabindex !== undefined) {
    return tabindex !== '-1'
  }
  if (focusableTags.has(tag.name)) {
    return true
  }
  if (tag.name === 'a' || tag.name === 'area') {
    return getAttr(tag, 'href') !== undefined
  }
  if (tag.name === 'input') {
    return getAttr(tag, 'type') !== 'hidden'
  }
  const editable = getAttr(tag, 'contenteditable')
  return editable !== undefined && editable !== 'false'
}

// The trigger is the first focusable element; without one, the first element that is not a framework wrapper.
export const describeTrigger = (html: string, id: string): string => {
  const trigger = findTag(html, isFocusable) ?? findTag(html, (tag) => !wrapperTags.has(tag.name))
  if (!trigger) {
    return html
  }
  const existing = getAttr(trigger, 'aria-describedby')
  return replaceTag(html, trigger, {
    'aria-describedby': describedBy(typeof existing === 'string' ? existing : undefined, id),
  })
}

export const tooltipDismissedClass = 'x-tooltip--dismissed'

// Shows the bubble in the top layer (Popover API) at fixed coordinates, so overflow containers never clip it or grow
// scrollbars for it, and it stays above modal dialogs. It flips once when the requested side does not fit and is kept
// 8px inside the viewport. Browsers without popover keep the CSS-only bubble. Escape hides the shown tooltip
// (WCAG 1.4.13) until the pointer leaves it or focus moves in or out of it.
// Serialised into an inline script for Astro, so it must not reference anything outside its own body.
export function installTooltips(): void {
  const w = window as unknown as { __xTooltip?: number }
  if (w.__xTooltip) {
    return
  }
  w.__xTooltip = 1
  const dismissed = 'x-tooltip--dismissed'
  const edge = 8
  const popover = Object.hasOwn(HTMLElement.prototype, 'popover')
  const tipOf = (node: EventTarget | null) =>
    node instanceof Element ? (node.closest('.x-tooltip') as HTMLElement | null) : null
  const bubbleOf = (tip: HTMLElement) => tip.querySelector<HTMLElement>(':scope > .x-tooltip__bubble')
  // Theme tokens are lengths or percentages of the trigger (left) or the bubble (shift, arrow).
  const size = (value: string, fallback: string, of: number) => {
    const v = value.trim() || fallback
    return v.endsWith('%') ? (parseFloat(v) / 100) * of : parseFloat(v) || 0
  }

  const place = (tip: HTMLElement, bubble: HTMLElement) => {
    const style = getComputedStyle(bubble)
    const token = (name: string, fallback: string, of = 0) => size(style.getPropertyValue(name), fallback, of)
    const t = tip.getBoundingClientRect()
    // Excludes scrollbars, unlike innerWidth.
    const { clientWidth: vw, clientHeight: vh } = document.documentElement
    const width = bubble.offsetWidth
    const height = bubble.offsetHeight
    const gap = token('--x-tooltip-gap', '10px')
    const above = t.top - gap - height >= edge
    const below = t.bottom + gap + height <= vh - edge
    const side = tip.classList.contains('x-tooltip--bottom')
      ? below || !above
        ? 'bottom'
        : 'top'
      : above || !below
        ? 'top'
        : 'bottom'
    const want = t.left + token('--x-tooltip-left', '50%', t.width) + token('--x-tooltip-shift', '-50%', width)
    const left = Math.max(edge, Math.min(want, vw - edge - width))
    const arrow = token('--x-tooltip-arrow', '6px')
    const arrowLeft = token('--x-tooltip-arrow-left', '50%', width) + want - left
    bubble.dataset.xTooltipSide = side
    bubble.style.left = `${left}px`
    bubble.style.top = `${side === 'top' ? t.top - gap - height : t.bottom + gap}px`
    bubble.style.setProperty('--x-tooltip-arrow-x', `${Math.min(Math.max(arrowLeft, arrow * 2), width - arrow * 2)}px`)
  }

  // Tooltips with --open are static previews and keep their inline bubble.
  const show = (tip: HTMLElement | null) => {
    const bubble = tip && bubbleOf(tip)
    if (
      !popover ||
      !tip ||
      !bubble ||
      tip.matches(`.x-tooltip--open, .${dismissed}`) ||
      bubble.matches(':popover-open')
    ) {
      return
    }
    bubble.showPopover()
    place(tip, bubble)
  }
  const hide = (bubble: HTMLElement | null) => {
    if (bubble?.matches(':popover-open')) {
      bubble.hidePopover()
    }
  }
  const hideAll = () => document.querySelectorAll<HTMLElement>('.x-tooltip__bubble:popover-open').forEach(hide)
  const leaves = (event: Event & { relatedTarget: EventTarget | null }, tip: HTMLElement) =>
    !(event.relatedTarget instanceof Node && tip.contains(event.relatedTarget))

  document.addEventListener('pointerover', (event) => show(tipOf(event.target)))
  document.addEventListener('pointerout', (event) => {
    const tip = tipOf(event.target)
    if (tip && leaves(event, tip)) {
      tip.classList.remove(dismissed)
      if (!tip.contains(document.activeElement) || !document.activeElement?.matches(':focus-visible')) {
        hide(bubbleOf(tip))
      }
    }
  })
  document.addEventListener('focusin', (event) => {
    const tip = tipOf(event.target)
    tip?.classList.remove(dismissed)
    if (event.target instanceof Element && event.target.matches(':focus-visible')) {
      show(tip)
    }
  })
  document.addEventListener('focusout', (event) => {
    const tip = tipOf(event.target)
    if (tip && leaves(event, tip)) {
      tip.classList.remove(dismissed)
      if (!tip.matches(':hover')) {
        hide(bubbleOf(tip))
      }
    }
  })
  document.addEventListener(
    'keydown',
    (event) => {
      if (event.key !== 'Escape') {
        return
      }
      document.querySelectorAll<HTMLElement>(`.x-tooltip:not(.${dismissed})`).forEach((tip) => {
        const bubble = bubbleOf(tip)
        const shown = bubble?.matches(':popover-open')
        if (!shown && !tip.matches(':hover, :has(:focus-visible)')) {
          return
        }
        tip.classList.add(dismissed)
        if (shown) {
          hide(bubble)
          // Escape only closes the tooltip, not a dialog around it.
          event.preventDefault()
        }
      })
    },
    true,
  )
  // Hide rather than follow: the trigger may scroll out of view.
  addEventListener('scroll', hideAll, true)
  addEventListener('resize', hideAll)
}

export const tooltipScript = `(${installTooltips})()`

/** @deprecated Use `tooltipScript`. */
export const tooltipEscapeScript = tooltipScript
