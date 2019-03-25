import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Counter from './components/Counter';
import StudentsList from './components/StudentsList';
import ProductsList from './components/ProductsList';

class App extends Component {
  render() {
    return (
      <div className="App">
      {/* <Header></Header> */}
        <Header />
        <Counter />
        <StudentsList/>
        <hr />
        <ProductsList/>
      </div>
    );
  }
}

export default App;
