import React from 'react'
import Board from '../components/Board'
import GameControl from '../components/GameControl'

export default function Play() {
  return (
    <div className='page_container play_page'>
        <Board />
        <GameControl />
    </div>
  )
}
