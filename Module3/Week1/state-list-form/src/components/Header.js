import React from 'react';
import logo from '../logo.svg';
import './Header.css';
import Title from './Title';


// the following is the same as above just using ES6 syntax

const header = () => {
    return (
        <header>
            <img src={logo} alt="logo" className="App-logo" />
            <Title data="Welcome to React, Ironhacker!"></Title>
        </header>
    )
}

export default header;