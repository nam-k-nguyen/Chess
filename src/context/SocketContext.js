import React, { useContext, useState, useEffect } from 'react'
import { io } from 'socket.io-client';

const SocketContext = React.createContext();
export function useSocket() { return useContext(SocketContext) }

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null)
  const [socketConnected, setSocketConnected] = useState(false)
  const socket_url = {
    production: 'https://nestjs-socket-server-production.up.railway.app/',
    dev: 'http://localhost:3001/',
  };

  // Establish socket connection
  useEffect(() => {
    let sk = io(socket_url.dev)
    console.log('Connecting to socket... ', sk)
    setSocket(sk)
  }, [])

  // Update socket connection state when it changes
  useEffect(() => {
    if (!socket) return
    socket.on('connect', () => { setSocketConnected(socket.connected); console.log('Socket connected') })
    socket.on('disconnect', () => { setSocketConnected(socket.connected); console.log('Socket disconnected') })
    socket.on('update_session_id', (session_id_from_server) => {
      sessionStorage.setItem('chess_session_id', session_id_from_server);
    })
  }, [socket])

  function toggleSocketConnection() { socketConnected ? socket.disconnect() : socket.connect() }

  return (
    <SocketContext.Provider value={{ socket, socketConnected, toggleSocketConnection }}>
      {children}
    </SocketContext.Provider>
  )
}
