// components/Header.js
import React from 'react';
import Title from './Title';
import Description from './Description';
import logo from '../logo.svg'; // importing logo from src folder

const header = () => {
  return (
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Title data="Welcome to React, Ironhacker!"></Title>
        <Description data="You are ready to take this to the next level!"></Description>
    </header>
  );
}

export default header;

