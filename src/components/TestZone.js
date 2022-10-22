import React from 'react'
import { useSocket } from '../context/SocketContext'

export default function TestZone() {
    const { socketConnected, toggleSocketConnection } = useSocket() 

    return (
        <div className='test_zone_container'>
            <div className="title"><b>Connection status:</b> {socketConnected ? 'Connected' : 'Disconnected'}</div>
            <input
                type="button"
                className="button"
                value={socketConnected ? 'Disconnect' : 'Connect'}
                onClick={toggleSocketConnection} />
        </div>
    )
}
