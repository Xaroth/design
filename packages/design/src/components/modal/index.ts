import { bem } from '../../bem.ts'

export type ModalSize = 'sm' | 'md'

export type ModalOptions = {
  size?: ModalSize
  className?: string
}

const modal = bem('x-modal', { defaults: { size: 'sm' } })

export const modalClass = ({ size = 'sm', className }: ModalOptions = {}): string => modal({ size }, className)

// closedby="any" lets Escape and a backdrop click close the dialog natively; "none" blocks both.
export const modalAttrs = ({ dismissible = true }: { dismissible?: boolean }) => ({
  closedby: dismissible ? ('any' as const) : ('none' as const),
})

// Attributes for a button that opens or closes a modal without script (invoker commands).
export const modalCommand = (id: string, command: 'show-modal' | 'close') => ({ commandfor: id, command })
