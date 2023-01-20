import React from 'react';
import DisplayTable from './components/DisplayTable';
import './Analytics.css';
const App = () => {
  return <div className='display'>
    <h1>GreedyGame Frontend Assessment</h1>
    <h2>Select dates within a specific range of 1-Jun-2021 to
31-Jun-2021</h2>
  <pre><a href="https://github.com/Sukethksrivatsan">Suketh K Srivatsan-Github</a></pre>
    <pre className='tableheading'>Table containing values as mentioned in the Assignment</pre>
    <DisplayTable/>
  </div>
};

export default App;
