import React, { useState, PureComponent, useRef, useEffect } from "react";
import "./App.css";

class Counter extends PureComponent {
  render() {
    const { props } = this;
    return <h1>类组件：{props.count}</h1>;
  }
}

function useCounter(count) {
  return <h1>hooks组件：{count}</h1>;
}

function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount);
  let it = useRef();

  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current);
    }
  });

  return [count, setCount];
}

function MyHooks() {
  const [count, setCount] = useCount(0);
  const CounterJSX = useCounter(count);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click （{count}）</button>
      <Counter count={count} />
      {CounterJSX}
    </div>
  );
}

export default MyHooks;
