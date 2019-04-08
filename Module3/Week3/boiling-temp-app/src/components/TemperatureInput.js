// components/TemperatureInput.js
import React, { Component } from 'react';
class TemperatureInput extends Component {
  constructor(props){
    super(props);
    // this.state = {
    //   temperature: ''
    // }
  }
  
  scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
  };
handleChange(e) {
    // Before: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
}
render() {
    const {temperature} = this.props;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {this.scaleNames[scale]}:</legend>
        <input value={temperature} onChange={e => this.handleChange(e)} />
      </fieldset>
    );
  }
}
export default TemperatureInput;





  
