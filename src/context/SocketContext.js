import React, { useContext, useState, useEffect } from 'react'
import { io } from 'socket.io-client';

const SocketContext = React.createContext();
export function useSocket() { return useContext(SocketContext) }

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null)
  const [inMatch, setInMatch] = useState(false)
  const [queueing, setQueueing] = useState(false)
  const [boardArray, setBoardArray] = useState([])
  const [socketConnected, setSocketConnected] = useState(false)
  function toggleSocketConnection() { socketConnected ? socket.disconnect() : socket.connect() }


  // ESTABLISH SOCKET CONNECTION
  useEffect(() => {
    const socket_url = {
      production: 'https://nestjs-socket-server-production.up.railway.app/',
      dev: 'http://localhost:3001/',
    };
    let sk = io(socket_url.dev)
    console.log('Connecting to socket... ', sk)
    setSocket(sk)
  }, [])


  // SOCKET EVENT LISTENERS
  useEffect(() => {
    if (!socket) return

    socket.on('connect', () => {
      const session_id = sessionStorage.getItem('chess_session_id')
      socket.emit("client_connect", session_id)
      setSocketConnected(socket.connected);
      console.log('Socket connected')
    })

    socket.on('disconnect', () => {
      setSocketConnected(socket.connected);
      console.log('Socket disconnected')
    })

    socket.on('update_session_id', (session_id_from_server) => {
      sessionStorage.setItem('chess_session_id', session_id_from_server);
    })

    socket.on('enter_match', board => {
      setInMatch(true)
      setQueueing(false)
      setBoardArray(board)  
    })

    socket.on('update_board', board => {
      setBoardArray(board)
    })
  }, [socket])

  const contexts = {
    socket,
    socketConnected,
    toggleSocketConnection,
    inMatch, setInMatch,
    queueing, setQueueing,
    boardArray, setBoardArray
  }

  return (
    <SocketContext.Provider value={contexts}>
      {children}
    </SocketContext.Provider>
  )
}
