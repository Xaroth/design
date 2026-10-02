'use client'

import './modal.scss'
import { useEffect, useImperativeHandle, useRef, type DialogHTMLAttributes, type Ref } from 'react'
import { modalAttrs, modalClass, type ModalOptions } from './index.ts'

export type ModalProps = Omit<ModalOptions, 'className'> &
  Omit<DialogHTMLAttributes<HTMLDialogElement>, 'open' | 'onClose' | 'closedby'> & {
    /** Shown as a modal while true. */
    open: boolean
    /** Escape, a backdrop click or a close control asked to close. Set `open` to false to close. */
    onClose: () => void
    /** False blocks Escape and backdrop close, for example while a request is pending. */
    dismissible?: boolean
    ref?: Ref<HTMLDialogElement>
  }

// Browsers without closedby get backdrop clicks handled here.
const nativeLightDismiss = () => typeof HTMLDialogElement !== 'undefined' && 'closedBy' in HTMLDialogElement.prototype

const outside = (el: HTMLElement, x: number, y: number) => {
  const box = el.getBoundingClientRect()
  return x < box.left || x > box.right || y < box.top || y > box.bottom
}

export function Modal({
  open,
  onClose,
  dismissible = true,
  size,
  className,
  onCancel,
  onClick,
  ref,
  children,
  ...rest
}: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  useImperativeHandle(ref, () => dialog.current as HTMLDialogElement, [])

  useEffect(() => {
    const el = dialog.current
    if (open && el && !el.open) {
      el.showModal()
    } else if (!open && el?.open) {
      el.close()
    }
  }, [open])

  return (
    // oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- backdrop click; Escape is the keyboard path
    <dialog
      {...rest}
      {...modalAttrs({ dismissible })}
      ref={dialog}
      className={modalClass({ size, className })}
      onCancel={(event) => {
        onCancel?.(event)
        // The caller owns `open`, so the browser may not close it. A cancel the browser will not let us stop
        // closes the dialog anyway and is reported by the close event below.
        if (event.nativeEvent.cancelable) {
          event.preventDefault()
          if (dismissible) {
            onClose()
          }
        }
      }}
      onClose={() => {
        if (open) {
          onClose()
        }
      }}
      onClick={(event) => {
        onClick?.(event)
        if (
          dismissible &&
          event.target === event.currentTarget &&
          !nativeLightDismiss() &&
          outside(event.currentTarget, event.clientX, event.clientY)
        ) {
          onClose()
        }
      }}
    >
      {children}
    </dialog>
  )
}
