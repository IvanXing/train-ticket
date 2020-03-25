import React, { Component, useState, useEffect } from "react";
import "./App.css";

function HooksuseEffect() {
  const [count, setCount] = useState(0);
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  };

  useEffect(() => {
    console.log("触发useEffect的count：", count);
  }, [count]);

  useEffect(() => {
    document.title = count;
  });

  useEffect(() => {
    window.addEventListener("resize", onResize, false);
    return () => {
      window.removeEventListener("resize", onResize, false);
    };
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Click （{count}）size: {size.width} * {size.height}
      </button>
    </div>
  );
}

class HooksuseEffect2 extends Component {
  state = {
    count: 0,
    size: {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  };
  onResize = () => {
    this.setState({
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    });
  };
  componentDidMount() {
    document.title = this.state.count;
    window.addEventListener("resize", this.onResize, false);
  }
  componentDidUpdate() {
    document.title = this.state.count;
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize, false);
  }
  render() {
    const { count, size } = this.state;
    return (
      <div>
        <button onClick={() => this.setState({ count: count + 1 })}>
          Click （{count}） size: {size.width} * {size.height}
        </button>
      </div>
    );
  }
}

export default HooksuseEffect;
