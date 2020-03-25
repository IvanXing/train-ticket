import React, { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";

// 两个组件分享了关于size的状态逻辑
function useCounter(count) {
  const size = useSize();
  return (
    <h1>
      hooks组件：count:（{count}）size（{size.width}* {size.height}）
    </h1>
  );
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

function useSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  });
  useEffect(() => {
    window.addEventListener("resize", onResize, false);
    return () => {
      window.removeEventListener("resize", onResize, false);
    };
  }, []);
  return size;
}

function MineHooks() {
  const [count, setCount] = useCount(0);
  const Counter = useCounter(count);
  const size = useSize();
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Click （{count}）size（{size.width}* {size.height}）
      </button>
      {Counter}
    </div>
  );
}

export default MineHooks;
