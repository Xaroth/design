'use client'

import './dialog.scss'
import { useEffect, useId, useRef, type MouseEvent, type ReactNode } from 'react'
import { Button } from '../button/button.tsx'
import { Icon } from '../icon/icon.tsx'
import { modalCommand } from '../modal/index.ts'
import { Modal, type ModalProps } from '../modal/modal.tsx'
import { confirmFocus, dialogClass, dialogIds, type ConfirmTone } from './index.ts'

export type DialogProps = Omit<ModalProps, 'id' | 'title'> & {
  /** Base for the title and body ids. Generated when left out. */
  id?: string
  /** Heading, and the dialog's accessible name. */
  title: string
  /** Footer, right aligned, usually buttons. */
  actions?: ReactNode
  /** Close button in the head. */
  closeButton?: boolean
  closeLabel?: string
}

export function Dialog({
  id,
  title,
  actions,
  closeButton = true,
  closeLabel = 'Close',
  dismissible = true,
  onClose,
  className,
  children,
  ...rest
}: DialogProps) {
  const generated = useId()
  const base = id ?? generated
  const ids = dialogIds(base)
  return (
    <Modal
      aria-labelledby={ids.title}
      aria-describedby={children != null ? ids.body : undefined}
      {...rest}
      id={base}
      dismissible={dismissible}
      onClose={onClose}
      className={dialogClass({ className })}
    >
      <div className="x-dialog__head">
        <h2
          className="x-dialog__title"
          id={ids.title}
        >
          {title}
        </h2>
        {closeButton && (
          <button
            type="button"
            className="x-dialog__close"
            aria-label={closeLabel}
            disabled={!dismissible}
            {...modalCommand(base, 'close')}
            onClick={(event) => {
              event.preventDefault()
              onClose()
            }}
          >
            <Icon name="close" />
          </button>
        )}
      </div>
      {children != null && (
        // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- a scrolling body must be keyboard scrollable
        <div
          className="x-dialog__body"
          id={ids.body}
          tabIndex={0}
        >
          {children}
        </div>
      )}
      {actions != null && <div className="x-dialog__actions">{actions}</div>}
    </Modal>
  )
}

export type ConfirmDialogProps = Omit<DialogProps, 'actions' | 'closeButton' | 'closeLabel' | 'dismissible' | 'ref'> & {
  confirmLabel: string
  cancelLabel?: string
  /** Danger colors the confirm button and starts focus on Cancel. */
  tone?: ConfirmTone
  onConfirm: () => void
  /** Disables both buttons and dismissal, and shows progress on confirm. */
  pending?: boolean
}

export function ConfirmDialog({
  id,
  open,
  onClose,
  confirmLabel,
  cancelLabel = 'Cancel',
  tone = 'default',
  onConfirm,
  pending,
  ...rest
}: ConfirmDialogProps) {
  const generated = useId()
  const base = id ?? generated
  const dialog = useRef<HTMLDialogElement>(null)
  const focus = confirmFocus(tone)
  const close = modalCommand(base, 'close')

  // React sets autoFocus by calling focus() on mount, while the dialog is still closed. Modal's effect runs
  // first and opens it, so focus is placed here.
  useEffect(() => {
    if (open) {
      dialog.current?.querySelector<HTMLElement>(`[value="${focus.cancel ? 'cancel' : 'confirm'}"]`)?.focus()
    }
  }, [open, focus.cancel])

  return (
    <Dialog
      {...rest}
      ref={dialog}
      id={base}
      role="alertdialog"
      open={open}
      onClose={onClose}
      dismissible={!pending}
      closeButton={false}
      actions={
        <>
          <Button
            variant="secondary"
            value="cancel"
            disabled={pending}
            autoFocus={focus.cancel}
            {...close}
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              event.preventDefault()
              onClose()
            }}
          >
            {cancelLabel}
          </Button>
          <Button
            tone={tone}
            value="confirm"
            loading={pending}
            autoFocus={focus.confirm}
            {...close}
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              event.preventDefault()
              onConfirm()
            }}
          >
            {confirmLabel}
          </Button>
        </>
      }
    />
  )
}
