import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './components/user-pages/Signup';
import axios from 'axios'

class App extends Component {
  constructor(){
    super();
    this.state ={
      currentUser: null,

    }
  }
  componentDidMount(){
    axios.get('http://localhost:3001/api/checkuser', {withCredentials:true})
    .then(responseFromBackend =>{
      console.log('Response from Backend is: ', responseFromBackend.data)
      const {userDoc} = responseFromBackend.data
      this.syncCurrentUser(userDoc)
    });
  }
  syncCurrentUser(user){
    this.setState({currentUser: user})
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>IronPhone </h1>         
        </header>
        <Signup currentUser={this.state.currentUser} onUserChange={ userDoc => this.syncCurrentUser(userDoc)}/>
        <footer>
          Made by Miller 
        </footer>
      </div>
    );
  }
}

export default App;
