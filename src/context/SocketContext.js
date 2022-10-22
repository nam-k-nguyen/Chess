import React, { useContext, useState, useEffect } from 'react'
import { io } from 'socket.io-client';

const SocketContext = React.createContext();
export function useSocket() { return useContext(SocketContext) }

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null)
  const [socketConnected, setSocketConnected] = useState(false)
  function toggleSocketConnection() { socketConnected ? socket.disconnect() : socket.connect() }

  return (
    <SocketContext.Provider value={{ socket, socketConnected, toggleSocketConnection }}>
      {children}
    </SocketContext.Provider>
  )
}
