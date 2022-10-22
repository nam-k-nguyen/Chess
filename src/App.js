import { useEffect, useState } from 'react';
import './App.css';
import TestZone from './components/TestZone';
import Board from './components/Board';

function App() {


  return (
    <div className="App">
      <TestZone
        socketConnected={socketConnected}
        handleSocketConnection={handleSocketConnection}
      />
      <Board appHandleCellClick={appHandleCellClick} />
    </div>
  );
}

export default App;
