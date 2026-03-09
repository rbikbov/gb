import { useState } from 'react'
import './Counter.css'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button className="counter-button" onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
  )
}
