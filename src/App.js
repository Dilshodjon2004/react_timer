import { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      isCounting: false,
    };
  }

  handleStart = () => {
    this.setState({ isCounting: true });

    this.counterId = setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  };

  handleStop = () => {
    this.setState({ isCounting: false });
    clearInterval(this.counterId);
  };

  handleReset = () => {
    this.setState({ isCounting: false, count: 0 });
    clearInterval(this.counterId);
  };

  componentDidMount() {
    console.log("componentDidMount");
    const userCount = localStorage.getItem("timer");
    if (userCount) {
      this.setState({ count: +userCount });
    }
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
    localStorage.setItem("timer", this.state.count);
  }

  componentWillUnmount() {
    clearInterval(this.counterId);
  }

  render() {
    return (
      <div className="App">
        <h1>React Timer</h1>
        <p>{this.state.count}</p>
        {!this.state.isCounting ? (
          <button className="success" onClick={this.handleStart}>
            Start
          </button>
        ) : (
          <button className="danger" onClick={this.handleStop}>
            Stop
          </button>
        )}
        <button className="secondary" onClick={this.handleReset}>
          Reset
        </button>
      </div>
    );
  }
}

export default App;
