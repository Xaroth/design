import { bem } from '../../bem.ts'

export type TooltipPlacement = 'top' | 'bottom'

export type TooltipOptions = {
  placement?: TooltipPlacement
  /** Always shown, for docs and previews. */
  open?: boolean
  className?: string
}

const tooltip = bem('x-tooltip', { defaults: { placement: 'top' } })

export const tooltipClass = ({ placement = 'top', open, className }: TooltipOptions = {}): string =>
  tooltip({ placement, open }, className)

export const tooltipId = (id: string): string => `${id}-tip`

// Keeps any description the trigger already has and adds the tooltip after it.
export const describedBy = (existing: string | undefined, id: string): string =>
  [existing, tooltipId(id)].filter(Boolean).join(' ')

// Astro cannot add props to slotted markup, so the first tag of the rendered trigger gets aria-describedby.
export const describeTrigger = (html: string, id: string): string => {
  const open = /<[a-zA-Z][^>]*>/.exec(html)
  if (!open) {
    return html
  }
  const tag = open[0]
  const current = /\saria-describedby="([^"]*)"/.exec(tag)
  const next = current
    ? tag.replace(current[0], ` aria-describedby="${describedBy(current[1], id)}"`)
    : tag.replace(/^(<[a-zA-Z][^\s/>]*)/, `$1 aria-describedby="${tooltipId(id)}"`)
  return html.slice(0, open.index) + next + html.slice(open.index + tag.length)
}
