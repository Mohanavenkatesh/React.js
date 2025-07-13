import { Component } from "react"

class Myapp extends Component {

  constructor(props) {

    super(props);

    this.state = {
      one: 2,
      two: 3
    }

  }

  render() {
    return (
      <>
        <h1>Classbased Component</h1>

        <h1>Compoent State One : {this.state.one}</h1>
        <button onClick={() => this.setState({ one: this.state.one + 1 })}>Click</button>

        <h1>Compoent State Two :{this.state.two}</h1>
        <button onClick={() => this.setState({ two: this.state.two - 1 })}>Click</button>
      </>

    );
  }

}

export default Myapp;