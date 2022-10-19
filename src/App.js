import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import io from 'socket.io-client';

function App() {
  const [content, setContent] = useState(null)
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

  function getInfo() {
    // return null;
    axios({
      method: 'get',
      url: 'https://nestjs-socket-server-production.up.railway.app/',
      // url: 'https://nestjs-socket-server.vercel.app/',
      // url: 'https://nestjs-test-ochre.vercel.app/',
      // url: 'https://developer.usajobs.gov/api/codelist/agencysubelements',
    }).then((response) => {
      console.log(response)
      console.log(response.data)
      setContent(JSON.stringify(response.data))
      return response
    })
  }

  return (
    <div className="App">
      <div className="title"><b>Connection status:</b> {socketConnected ? 'Connected' : 'Disconnected'}</div>
      <button className="button" onClick={getInfo}>
        CLICK
      </button>
      <input
        type="button"
        className="button"
        value={socketConnected ? 'Disconnect' : 'Connect'}
        onClick={handleSocketConnection} />
      <div className="content">API content: {content ? content : "NULL"}</div>
    </div>
  );
}

export default App;
