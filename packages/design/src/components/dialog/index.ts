import { bem } from '../../bem.ts'

export type ConfirmTone = 'default' | 'danger'

const dialog = bem('x-dialog')

export const dialogClass = ({ className }: { className?: string } = {}): string => dialog({}, className)

export const dialogIds = (id: string) => ({ title: `${id}-title`, body: `${id}-body` })

// Danger starts on Cancel so a stray Enter does not confirm.
export const confirmFocus = (tone: ConfirmTone = 'default') => ({
  cancel: tone === 'danger',
  confirm: tone !== 'danger',
})
