import React from 'react'

export const ComponentC = ({x, onXClick}) =>{
    return (
        <div>
            <h1>Component C</h1>
            <button onClick={onXClick}>{x}</button>
        </div>
    )
}