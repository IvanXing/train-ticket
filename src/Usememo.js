import React, { Component, PureComponent, memo } from "react";
import "./App.css";

class Foo extends Component {
  render() {
    console.log("Foo render");
    return null;
  }
}

class Foo1 extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.name === this.props.name) {
      return false;
    }
    return true;
  }
  render() {
    console.log("Foo1 render");
    return null;
  }
}

class Foo2 extends PureComponent {
  render() {
    console.log("Foo2 render");
    return <div>{this.props.person.age}</div>;
  }
}

const Foo3 = memo(function Foo3(props) {
  console.log("Foo3 render");
  return <div>{props.person.age}</div>;
});

class Usememo extends Component {
  state = {
    count: 0,
    person: {
      age: 1
    }
  };
  callback = () => {};
  render() {
    return (
      <div>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          fixCount
        </button>
        <button
          onClick={() => {
            this.state.person.age++;
            this.setState({ person: this.state.person });
          }}
        >
          fixAge
        </button>
        <Foo name="mike" />
        <Foo1 name="mike" />
        <Foo2 person={this.state.person} cb={this.callback} />
        <Foo3 person={this.state.person} cb={this.callback} />
      </div>
    );
  }
}

export default Usememo;
