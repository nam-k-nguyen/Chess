import { useState } from 'react';
import './App.css';

function App() {
  const [content, setContent] = useState(null)

  function getInfo() {
    
  }
  return (
    <div className="App">
      <div className="title">
        Content
      </div>
      <button className="button" onClick={''}>
        CLICK
      </button>
      <div className="content">
        {content ? content : "NULL"}
      </div>
    </div>
  );
}

export default App;
