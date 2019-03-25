import React, { Component } from 'react';
import './App.css';
import User from './components/User'
import Header from './components/Header'
import { listItems, MoviesList } from './components/ListDemo';
import DynamicMoviesList from './components/dynamicListsDemo/DynamicMoviesList'

class App extends Component {
  state = {
    userA: {
      firstName: "Harper",
      lastName: "Perez",
      avatarUrl:
        "https://www.refreshmiami.com/wp-content/uploads/2018/07/55085_logo-ironhack.png"
    },
    userB: {
      firstName: "Ana",
      lastName: "Hello",
      avatarUrl:
        "https://s3.amazonaws.com/owler-image/logo/ironhack_owler_20180828_221413_original.png"
    },
    clickCount: 0,
    backColor: "yellow",
  };
  // App.js - add changes to clickHandler(), add new colorMapper() method, the rest of the code stays the same
  // ...
  colorMapper = () => {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };
  clickHandler = () => {
    const newCount = this.state.clickCount + 1;
    if (newCount !== 5) {
      this.setState({
        clickCount: newCount,
        backColor: this.colorMapper()
      });
    } else {
      this.setState({
        clickCount: newCount,
        backColor: "yellow",
        userA: {
          firstName: "Jon",
          lastName: "Doe",
          avatarUrl:
            "https://www.refreshmiami.com/wp-content/uploads/2018/07/55085_logo-ironhack.png"
        },
        userB: {
          firstName: "Susanne",
          lastName: "Smith",
          avatarUrl:
            "https://s3.amazonaws.com/owler-image/logo/ironhack_owler_20180828_221413_original.png"
        }
      });
    }
  };

  render() {
    return (
      <div className="App">
        <h1> Hello Ironhackers! </h1>
        <p>Count is: {this.state.clickCount}</p>
        <button onClick={this.clickHandler}>Click me</button>

        <User
          theColor={this.state.backColor}
          firstName={this.state.userA.firstName}
          lastName={this.state.userA.lastName}
          image={this.state.userA.avatarUrl}
        />
        <User
          firstName={this.state.userB.firstName}
          lastName={this.state.userB.lastName}
          image={this.state.userB.avatarUrl}
        />
        <Header></Header>
        <ul className="list-style">{ listItems }</ul>
					<div>
						<MoviesList />
          </div>
          <hr />
          <DynamicMoviesList />  
      </div>
    );
  }
}

export default App;




