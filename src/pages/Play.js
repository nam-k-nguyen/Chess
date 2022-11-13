import React from 'react'
import Board from '../components/Board'
import GameControl from '../components/GameControl'
import BoilerplateBoard from '../components/BoilerplateBoard'
import { useSocket } from '../context/SocketContext'

export default function Play() {
  const { inMatch } = useSocket()

  return (
    <div className='page_container play_page'>
        {inMatch ? <Board /> : <BoilerplateBoard/>}
        <GameControl />
    </div>
  )
}
