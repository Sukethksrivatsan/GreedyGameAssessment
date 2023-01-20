import React from 'react';
import DisplayTable from './components/DisplayTable';
import './Analytics.css';
const App = () => {
  return <div className='display'>
    <h1>GreedyGame Frontend Assessment</h1>
    <h2>Select dates within a specific range</h2>
  <pre id="defaultperiod">By default a period between 1-Jun and 30-Jun has been selected</pre>
    <pre className='tableheading'>Table containing values as mentioned in the Assignment</pre>
    <DisplayTable/>
  </div>
};

export default App;
