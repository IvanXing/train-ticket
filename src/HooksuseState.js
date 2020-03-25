import React, { Component, useState } from "react";
import "./App.css";

function HooksuseState(props) {
  const [count, setCount] = useState(() => {
    return props.defaultCount || 0;
  });
  // const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click {count}</button>
    </div>
  );
}

class HooksuseState2 extends Component {
  state = {
    count: 0
  };
  render() {
    const { count } = this.state;
    return (
      <div>
        <button onClick={() => this.setState({ count: count + 1 })}>
          Click {count}
        </button>
      </div>
    );
  }
}

export default HooksuseState;
