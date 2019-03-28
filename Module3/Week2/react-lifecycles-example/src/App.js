// App.js
import React, { Component } from 'react';
import './App.css';
import Counter from './components/Counter'
class App extends Component {
constructor(props) {
    super(props);
    this.state = { isRunning: true };
    console.log('I am in the CONSTRUCTOR of the App.js.');
  }
stopCounter = () => {
      this.setState({...this.state, isRunning: false })
  }
render() {
    console.log('I am in RENDER of the App.js.');
    return this.state.isRunning ? (
      <div className="App">
        <h2>Clicking this button will destroy the Counter component and clear the state.</h2>
        <button onClick={this.stopCounter}>Stop the counter</button>
        <Counter /> 
      </div>
    ) : null
  }
}

export default App;

