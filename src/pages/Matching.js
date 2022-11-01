import React, { useState } from 'react'
import { useSocket } from '../context/SocketContext'

export default function Matching() {
  const { socket } = useSocket();
  const [queueing, setQueueing] = useState(false);

  function onQuickMatch() {
    const session_id = sessionStorage.getItem('chess_session_id')
    const event_name = queueing ? 'exit_queue' : 'enter_queue'
    console.log('Quick Match')
    socket.emit('quick_match', 'data from quick match', res => {
      console.log(res);
    })
    socket.emit(event_name, session_id, res => {console.log(res)})
    setQueueing(curr => !curr)
  }

  function onCreateRoom() {
    console.log('Create Room')
    socket.emit('create_room', 'data from create room', res => {
      console.log(res);
    })
  }
  return (
    <div className='page_container matching_page'>
      <div className='find_match'>
        <button id='quick_match' onClick={onQuickMatch}>Quick Match ►</button>
        <button id='create_room' onClick={onCreateRoom}>Create Room ►</button>
      </div>
    </div>
  )
}
