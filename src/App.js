import { useEffect, useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

import Matching from './pages/Matching';
import Setting from './pages/Setting';
import Play from './pages/Play';

import TestZone from './components/TestZone';
import Board from './components/Board';


function App() {

  return (
    <>
      <nav className='navbar'>
        <NavLink end to="/matching">Matching</NavLink>
        <NavLink end to="/play">Play</NavLink>
        <NavLink end to="/setting">Setting</NavLink>
      </nav>

      <div className="App">
        <TestZone />
        <Board />
      </div>

      <Routes>
        <Route path="/matching" element={<Matching />} />
        <Route path="/play" element={<Play />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </>
  )
}

export default App;
