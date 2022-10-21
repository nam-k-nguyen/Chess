import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';

function App() {
  // Set state and constants
  const [socket, setSocket] = useState(null)
  const [socketConnected, setSocketConnected] = useState(false)
  const dev = true;
  const socket_url = dev ? 'http://localhost:3001/' : 'https://nestjs-socket-server-production.up.railway.app/';

  // Establish socket connection
  useEffect(() => { setSocket(io(socket_url)) }, [socket_url])

  // Subscribe to the socket event
  useEffect(() => {
    if (!socket) return
    socket.on('connect', () => { setSocketConnected(socket.connected) })
    socket.on('disconnect', () => { setSocketConnected(socket.connected) })
    socket.on('cell_click', (data) => {
      alert(`The server said that we clicked cell ${data}`)
    })
  }, [socket])

  // Manage socket connection
  const handleSocketConnection = () => {
    console.log(socketConnected ? socket.disconnect() : socket.connect());
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
