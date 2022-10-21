import React from 'react'

export default function TestZone({ socketConnected, handleSocketConnection }) {
    return (
        <div className='test_zone_container'>
            <div className="title"><b>Connection status:</b> {socketConnected ? 'Connected' : 'Disconnected'}</div>
            <input
                type="button"
                className="button"
                value={socketConnected ? 'Disconnect' : 'Connect'}
                onClick={handleSocketConnection} />
        </div>
    )
}
