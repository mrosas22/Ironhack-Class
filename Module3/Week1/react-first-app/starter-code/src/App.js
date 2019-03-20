import React, { Component } from "react";
// import the npm package's component
import ReactPlayer from "react-player";
import User from './User.js'
import "./App.css";

class App extends Component {

  render() {

    const formatName = (user) => {
      return `${user.firstName} ${user.lastName}`;
    }
   
    const user = {
        firstName: 'Harper',
        lastName: 'Perez',
        avatarUrl:'http://uplay-avatars.s3.amazonaws.com/bd295c9e-c874-4d57-8d82-92778543308b/default_256_256.png'
      };
    
      const displayAvartar = (user) => {
        if(user.avatarUrl){
          return <img src={user.avatarUrl} />
        } else {
          return <img src='https://s3.amazonaws.com/owler-image/logo/ironhack_owler_20180828_221413_original.png' width='300' height='300'/>
        }
      }
    
    const element = (
      <h2>
        Hello, {formatName(user)}!
      </h2>
    );
 
    return (
        <div className="App">
          <User firstName="Harper"/>
          <User firstName="Ana"/>
          {/* // our Vimeo video */}
          <ReactPlayer url="https://vimeo.com/channels/top/22439234" />
        </div>
    );
  }
}

export default App;


  
              
  




