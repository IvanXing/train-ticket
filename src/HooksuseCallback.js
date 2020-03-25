import React, { useState, useMemo, memo, useCallback } from "react";
import "./App.css";

const Counter = memo(function Counter(props) {
  console.log("counter render");
  return <h1 onClick={props.onClick}>{props.count}</h1>;
});

function HooksuseCallback() {
  const [count, setCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const double = useMemo(() => {
    return count * 2;
  }, [count === 3]);

  // 此种写法 onClick句柄变化，在double不变化的情况下，Counter每次也会重新渲染
  // const onClick = () => {
  //   console.log("Click");
  // };

  // 此种写法没有生成新的句柄
  // const onClick = useMemo(() => {
  //   return () => {
  //     console.log("Click");
  //   };
  // }, []);

  // useMemo(()=>fn) 等价于 useCallback(fn)
  // const onClick = useCallback(() => {
  //   console.log("Click");
  // }, []);

  const onClick = useCallback(() => {
    console.log("Click");
    // setClickCount(clickCount + 1);
    setClickCount(clickCount => clickCount + 1);
  }, [clickCount]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Click （{count}），double（{double}）
      </button>
      <Counter count={double} onClick={onClick} />
    </div>
  );
}

export default HooksuseCallback;
