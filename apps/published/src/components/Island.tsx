import { Badge, Button, Progress } from '@xaroth.nl/design/react'
import { useState } from 'react'

export function Island() {
  const [count, setCount] = useState(0)
  return (
    <div className="x-cluster-sm">
      <Button onClick={() => setCount(count + 1)}>Clicked {count}</Button>
      <Badge tone="success">Stable</Badge>
      <Progress
        value={60}
        label="Progress"
      />
    </div>
  )
}
