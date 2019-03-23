import React from "react";
import FancyBorder from './FancyBorder.js'

function Dialog(props) {
    return (
      <FancyBorder>
        <h1>{props.title}</h1>
        <p>{props.message}</p>
      </FancyBorder>
    );
  }
  
function WelcomeDialog() {
    return (
      <Dialog
        title="Welcome"
        message="Thank you for visiting our spacecraft!" />
    );
}

class SignUpDialog extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSignUp = this.handleSignUp.bind(this);
      this.state = {login: ''};
    }
  
    render() {
      return (
        <Dialog title="Mars Exploration Program" message="How should we refer to you?">
          <input value={this.state.login} onChange={this.handleChange} />
          <button onClick={this.handleSignUp}>Sign Me Up!</button>
        </Dialog>
      );
    }
  
    handleChange(e) {
      this.setState({login: e.target.value});
    }
  
    handleSignUp() {
      alert(`Welcome aboard, ${this.state.login}!`);
    }
}

export default SignUpDialog;

