// components/Card.js
import React from 'react';
const card = ({ title, director }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>Director: {director}</p>
    </div>
  )
};
export default card;