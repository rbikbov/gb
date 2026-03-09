import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button 
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer"
      onClick={() => setCount((count) => count + 1)}
    >
      count is {count}
    </button>
  )
}
