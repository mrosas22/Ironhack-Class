import React from 'react'

export const ComponentD = ({x, onXClick}) =>{
    return (
        <div>
            <h1>Component D</h1>
            <button onClick={onXClick}>{x}</button>
        </div>
    )
}