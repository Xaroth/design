import { Container } from '@xaroth.nl/design/react'
import type { ReactNode } from 'react'

// Matrix stories render every combination at once, so controls would do nothing there.
export const matrix = { controls: { disable: true } }

// A captioned row of examples. `stack` lays them out as a column, for wide parts. `inset` lines the caption up
// with the page container, for full-bleed parts like Header and Footer.
export function Row({
  label,
  stack,
  inset,
  children,
}: {
  label: string
  stack?: boolean
  inset?: boolean
  children: ReactNode
}) {
  const caption = <p className="x-label x-muted">{label}</p>
  return (
    <div className="x-stack-xs">
      {inset ? <Container>{caption}</Container> : caption}
      <div className={stack ? 'x-stack-md' : 'x-cluster-sm'}>{children}</div>
    </div>
  )
}

export function Rows({ children, width }: { children: ReactNode; width?: number | string }) {
  return (
    <div
      className="x-stack-xl"
      style={width ? { maxWidth: width } : undefined}
    >
      {children}
    </div>
  )
}
