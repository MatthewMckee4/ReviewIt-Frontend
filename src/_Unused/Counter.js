import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  increaseCount() {
    // this.setState(
    //   {
    //     count: this.state.count + 1,
    //   },
    //   () => {
    //     console.log("Callback value", this.state.count);
    //   }
    // );
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }

  increaseFive() {
    this.increaseCount();
    this.increaseCount();
    this.increaseCount();
    this.increaseCount();
    this.increaseCount();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.increaseCount()}>Counter Increase</button>
        <h1>Count {this.state.count}</h1>
      </div>
    );
  }
}

export default Counter;
