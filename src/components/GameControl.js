import React from 'react'

export default function GameControl() {
    function onResign() {
        alert('Resign')
    }

    function onDraw() {
        alert('Draw')
    }

    return (
        <div className='game_control_container'>
            <button onClick={onResign}>Regisn</button>
            <button onClick={onDraw}>Draw</button>
        </div>
    )
}
