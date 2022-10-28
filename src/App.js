import { Routes, Route } from 'react-router-dom';
import './App.css';

import Matching from './pages/Matching';
import Setting from './pages/Setting';
import Play from './pages/Play';
import Login from './pages/Login';

import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/matching" element={<Matching />} />
        <Route path="/play" element={<Play />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </div>
  )
}

export default App;
