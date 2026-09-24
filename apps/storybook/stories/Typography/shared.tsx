import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

// Shows the rendered size of the element next to it, so the scale reads the same in every theme.
export function Measured({ label, token, children }: { label: string; token: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState('')
  // Stories remount on theme change (keyed), so measuring once per mount is enough.
  useLayoutEffect(() => {
    const el = ref.current?.firstElementChild
    if (el) {
      const cs = getComputedStyle(el)
      setSize(
        `${Math.round(parseFloat(cs.fontSize))}px / ${(parseFloat(cs.lineHeight) / parseFloat(cs.fontSize)).toFixed(2)}`,
      )
    }
  }, [])
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '11rem minmax(0, 1fr)', gap: 24, alignItems: 'baseline' }}>
      <div className="x-small x-muted">
        <div>{label}</div>
        <code>{token}</code>
        <div>{size}</div>
      </div>
      <div ref={ref}>{children}</div>
    </div>
  )
}

export const stack = { display: 'grid', gap: 32, maxWidth: 1200 } as const
