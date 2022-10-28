import { Routes, Route } from 'react-router-dom';
import './App.css';

import Matching from './pages/Matching';
import Setting from './pages/Setting';
import Play from './pages/Play';

import TestZone from './components/TestZone';
import Board from './components/Board';
import Navbar from './components/Navbar';

function App() {

  return (
    <>
      <Navbar/>

      <div className="App">
        <TestZone />
        <Board />
      </div>

      <Routes>
        <Route path="/" element={"Home"}/>
        <Route path="/matching" element={<Matching />} />
        <Route path="/play" element={<Play />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </>
  )
}

export default App;
