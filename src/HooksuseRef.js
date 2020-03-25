import React, {
  useState,
  PureComponent,
  useMemo,
  useRef,
  useEffect,
  useCallback
} from "react";
import "./App.css";

class Counter extends PureComponent {
  speak() {
    console.log(`now counter is: ${this.props.count}`);
  }
  render() {
    const { props } = this;
    return <h1 onClick={props.onClick}>{props.count}</h1>;
  }
}

function HooksuseRef() {
  const [count, setCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const counterRef = useRef();
  let it = useRef();

  const double = useMemo(() => {
    return count * 2;
  }, [count === 3]);

  const onClick = useCallback(() => {
    console.log("Click");
    setClickCount(clickCount => clickCount + 1);
    console.log("counter:", counterRef.current);
    // counterRef.current返回的是Counter组件
    counterRef.current.speak();
  }, [counterRef]);

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

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Click （{count}），double（{double}）
      </button>
      <Counter ref={counterRef} count={double} onClick={onClick} />
    </div>
  );
}

export default HooksuseRef;
