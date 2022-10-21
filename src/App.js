import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState(null)
  const [socketConnected, setSocketConnected] = useState(false)
  const socket_url_source = 'https://nestjs-socket-server-production.up.railway.app/'

  // Establish socket connection
  useEffect(() => {
    setSocket(io(socket_url_source));
  }, [])

  // Subscribe to the socket event
  useEffect(() => {
    if (!socket) return
    socket.on('connect', () => {
      setSocketConnected(socket.connected);
    })
    socket.on('disconnect', () => {
      setSocketConnected(socket.connected);
    })
  }, [socket])

  // Manage socket connection
  const handleSocketConnection = () => {
    if (socketConnected) {socket.disconnect()}
    else {socket.connect()}
  }

    })
  }

  return (
    <div className="App">
      <div className="title"><b>Connection status:</b> {socketConnected ? 'Connected' : 'Disconnected'}</div>
      <input
        type="button"
        className="button"
        value={socketConnected ? 'Disconnect' : 'Connect'}
        onClick={handleSocketConnection} />
    </div>
  );
}

export default App;
