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

// Escape hides the shown tooltip (WCAG 1.4.13) until the pointer leaves it or focus moves in or out of it.
// Guarded so copies on one page register once.
export const tooltipEscapeScript = `(()=>{if(window.__xTooltip)return;window.__xTooltip=1;const c='${tooltipDismissedClass}';const clear=(e)=>{const t=e.target instanceof Element&&e.target.closest('.'+c);if(t)t.classList.remove(c)};document.addEventListener('keydown',(e)=>{if(e.key!=='Escape')return;document.querySelectorAll('.x-tooltip:not(.'+c+')').forEach((t)=>{if(!t.matches(':hover,:has(:focus-visible)'))return;t.classList.add(c);t.addEventListener('pointerleave',()=>t.classList.remove(c),{once:true})})});document.addEventListener('focusin',clear);document.addEventListener('focusout',clear)})()`
