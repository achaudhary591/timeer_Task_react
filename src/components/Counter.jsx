import { useState } from 'react'

function Counter({ title, initialValue = 0, step = 1 }) {
  const [count, setCount] = useState(initialValue)

  const increment = () => setCount(count + step)
  const decrement = () => setCount(count - step)
  const reset = () => setCount(initialValue)

  return (
    <div className="counter-widget">
      <h3>{title}</h3>
      <div className="counter-display">{count}</div>
      <div className="counter-controls">
        <button onClick={decrement} className="counter-btn">-</button>
        <button onClick={reset} className="reset-btn">Reset</button>
        <button onClick={increment} className="counter-btn">+</button>
      </div>
    </div>
  )
}

export default Counter
