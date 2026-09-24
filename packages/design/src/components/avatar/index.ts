export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

export type AvatarOptions = {
  /** The person's name: the accessible name and the source of the initials. */
  name: string
  /** Image URL. Without it the avatar shows initials. */
  src?: string
  /** Overrides the accessible name. Pass '' when the name is already printed next to the avatar. */
  alt?: string
  /** Overrides the initials taken from `name`. */
  initials?: string
  size?: AvatarSize
  className?: string
}

export const avatarClass = ({
  size = 'md',
  src,
  className,
}: Pick<AvatarOptions, 'size' | 'src' | 'className'> = {}): string =>
  ['x-avatar', `x-avatar--${size}`, src && 'x-avatar--image', className].filter(Boolean).join(' ')

// First letter of the first and last word, so "Xaroth Brook" gives "XB" and "Xaroth" gives "X".
export const avatarInitials = (name: string): string => {
  const words = name.trim().split(/\s+/).filter(Boolean)
  const first = words[0]?.[0] ?? ''
  const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? '') : ''
  return (first + last).toUpperCase()
}

// An image carries its own alt. Initials are not a name, so the box is an img with the full name as label.
export const avatarState = ({ name, src, alt, initials }: Pick<AvatarOptions, 'name' | 'src' | 'alt' | 'initials'>) => {
  const label = alt ?? name
  const root = src
    ? {}
    : label === ''
      ? { 'aria-hidden': 'true' as const }
      : { role: 'img' as const, 'aria-label': label }
  return {
    root,
    alt: label,
    initials: initials ?? avatarInitials(name),
  }
}
