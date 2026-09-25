import './icon.scss'
import type { SVGAttributes } from 'react'
import { iconClass, icons, iconState, type IconOptions } from './index.ts'

export type IconProps = Omit<IconOptions, 'className'> & Omit<SVGAttributes<SVGSVGElement>, 'name' | 'width' | 'height'>

export function Icon({ name, size, label, className, ...rest }: IconProps) {
  return (
    <svg
      {...rest}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...iconState({ size, label })}
      className={iconClass({ className })}
    >
      {icons[name].map((d) => (
        <path
          key={d}
          d={d}
        />
      ))}
    </svg>
  )
}
