import './avatar.scss'
import type { HTMLAttributes } from 'react'
import { avatarClass, avatarState, type AvatarOptions } from './index.ts'

export type AvatarProps = Omit<AvatarOptions, 'className'> & HTMLAttributes<HTMLSpanElement>

export function Avatar({ name, src, alt, initials, size, className, ...rest }: AvatarProps) {
  const state = avatarState({ name, src, alt, initials })
  return (
    <span
      {...rest}
      {...state.root}
      className={avatarClass({ size, src, className })}
    >
      {/* Lazy also keeps React from emitting a preload link, which the Astro part has no equivalent for. */}
      {src ? (
        <img
          className="x-avatar__image"
          src={src}
          alt={state.alt}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span
          className="x-avatar__initials"
          aria-hidden="true"
        >
          {state.initials}
        </span>
      )}
    </span>
  )
}
