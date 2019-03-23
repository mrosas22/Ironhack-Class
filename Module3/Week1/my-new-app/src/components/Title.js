// components/Header.js
import React from 'react';

const title = (props) => {
  return (
      <h1 className="App-title">{props.data}</h1>
  );
}

export default title;