import React from 'react'
import { useState } from 'react'
function Fetch() {
    const [databydate,setDatabydate]=useState([])
    const [databyapp,setDatabyapp]=useState([])
    const [result1,setresult1]=useState([])
    const [result2,setresult2]=useState([])
    const apiGetdate=()=>{
        fetch('http://go-dev.greedygame.com/v3/dummy/report?startDate=2021-05-01&endDate=2021-05-03')
  .then((response) => response.json())
  .then((datadate) =>{
    console.log(json["data"][0]);
    setDatabydate(datadate)
  });
}
    const apiGetapp=()=>{
        fetch('http://go-dev.greedygame.com/v3/dummy/apps')
  .then((response) => response.json())
  .then((dataapp) =>{
    console.log(dataapp);
    setDatabyapp(dataapp)
  });
}
    const compiledata=()=>{
        apiGetapp();
        apiGetdate();
    }
  return (
    <div>
      <button onClick={compiledata}>Fetch API</button>
      <table className='optable'>
        <thead className='tableheading'>
            <tr>
                <th>Date</th>
                <th>App name</th>
                <th>App ID</th>
                <th>Ad Requests</th>
                <th>Ad Response</th>
                <th>Impression</th>
                <th>Clicks</th>
                <th>revenue</th>
            </tr>
        </thead>
        <tbody id="tablebody">

        </tbody>
      </table>
      <pre>{JSON.stringify(databyapp["data"])}</pre>
    </div>
  )
}
export default Fetch
// Date
// App Name
// AD Request
// AD Response
// Impression
// Clicks
// Revenue
