import React from 'react';
 import './App.css';
import CovidPage from './CovidPage';
import Deaths from './Deaths'

function App() {
  return (
    <div className="App">
      <CovidPage/>
      {/* <Deaths/> */}
      <a href="/Deaths">Deaths</a>
      <Deaths/>
           </div>
  );
}

export default App;
