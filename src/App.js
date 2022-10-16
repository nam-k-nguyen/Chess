import { useState } from 'react';
import './App.css';
import axios from 'axios';


function App() {
  const [content, setContent] = useState(null)

  function getInfo() {
    axios({
      method: 'get',
      url: 'https://developer.usajobs.gov/api/codelist/agencysubelements',
      
    }).then((response) => {
      console.log(response)
      console.log(response.data)
      setContent(JSON.stringify(response.data))
      return response
    })
  }
  return (
    <div className="App">
      <div className="title">
        Content
      </div>
      <button className="button" onClick={getInfo}>
        CLICK
      </button>
      <div className="content">
        {content ? content : "NULL"}
      </div>
    </div>
  );
}

export default App;
