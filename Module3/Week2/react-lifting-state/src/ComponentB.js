import React from 'react'
import {ComponentC} from './ComponentC'

export const ComponentB = ({x, onXClick}) =>{
    return (
        <div>
            <h1>Component B</h1>
            <ComponentC  x={x} onXClick={onXClick}/>
        </div>
    )
}