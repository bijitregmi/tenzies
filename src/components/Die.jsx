import React from 'react'

// Individual die
export default function Die(props) {
    return (
        <div className={`dice ${props.isHeld && 'green'}`} onClick={() => props.hold(props.id)}>
            <h2>{props.value}</h2>
        </div>
    )
}