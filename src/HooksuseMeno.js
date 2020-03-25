import React, { useState, useMemo } from "react";
import "./App.css";

function Counter(props) {
  return <h1>{props.count}</h1>;
}

function HooksuseMeno() {
  const [count, setCount] = useState(0);

  const double = useMemo(() => {
    return count * 2;
  }, [count === 3]);
  // count发生变化，double才会重新计算
  // 不传[]，则每次都运行，传入[],只运行一次
  // useMemo的返回值可以直接参与渲染，是在渲染期间完成
  // useEffect是执行副作用的，是在渲染之后执行的

  // half依赖double
  const half = useMemo(() => {
    return double / 4;
  }, [double]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Click （{count}），double（{double}），half（{half}）
      </button>
      <Counter count={count} />
    </div>
  );
}

export default HooksuseMeno;
