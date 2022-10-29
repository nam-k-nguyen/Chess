import React, { useState } from 'react'
import { useSocket } from '../context/SocketContext'

export default function Matching() {
  const { socket } = useSocket();
  function onQuickMatch() {
    console.log('Quick Match')
    socket.emit('quick_match', 'data from quick match', res => {
      console.log(res);
    })
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
