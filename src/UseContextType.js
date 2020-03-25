import React, { Component, createContext } from "react";
import "./App.css";

const BatteryContext = createContext();
const OnlineContext = createContext();

class Leaf extends Component {
  static contextType = BatteryContext;
  render() {
    const battery = this.context;
    return <h1>Battery: {battery}</h1>;
  }
}

class Middle extends Component {
  render() {
    return <Leaf />;
  }
}

class UseContextType extends Component {
  state = {
    battery: 60,
    online: false
  };
  render() {
    const { battery, online } = this.state;
    return (
      <BatteryContext.Provider value={battery}>
        <OnlineContext.Provider value={online}>
          <div>=========== demo: contextType ==========</div>
          <button
            type="button"
            onClick={() => this.setState({ battery: battery - 1 })}
          >
            PlueBattery
          </button>
          <button
            type="button"
            onClick={() => this.setState({ online: !online })}
          >
            TurnOnline
          </button>
          <Middle />
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    );
  }
}

export default UseContextType;
