import { useState } from "react";
import "./Counter.css";

function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <div className="counter">
      <h1>Counter</h1>
      <p className="value">{count}</p>
      <div className="buttons">
        <button onClick={decrement}>-</button>
        <button onClick={reset} className="reset">Reset</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}

export default Counter;
