// App.js
import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import {Switch, Route} from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<div className="App">
        <Navbar />
        {/* <Switch> returns only the first matching route */}
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/about' component={About}/>
        </Switch>
				
			</div>
		);
	}
}

export default App;










