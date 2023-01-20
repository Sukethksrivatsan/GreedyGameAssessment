import React, { useState } from "react";
import './DisplayTable.css'
//fetching information from the links here and then creating a merged table which we are rendering and inserting
class DisplayTable extends React.Component{
    constructor(props){
        super(props)
        this.state={list:[],startdate:"01-07-2021",enddate:"30-07-2021",http1:"http://go-dev.greedygame.com/v3/dummy/report?startDate=",numberofrows:0,
        totalrevenue:0,
        totalnumberofimpressions:0,
        totalnumberofresponses:0,
        totalnumberofrequests:0,
        totalnumberofclicks:0,
        averagefillrate:0,
        averagectr:0,
        visibleColumns:{column1:true,column2:true,column3:true,column4:true,column5:true,column6:true,column7:true,column8:true,column9:true,column10:true}
    }
        this.toggleColumnVisibility = this.toggleColumnVisibility.bind(this);
        this.getData=this.getData.bind(this);
        this.sortData = this.sortData.bind(this);
    }
    sortData(key) {
        const sortedData = [...this.state.list].sort((a, b) => (a[key] > b[key] ? 1 : -1));
        this.setState({ list: sortedData });
        console.log({key})
      }

    startdateselector=(event)=>{
       this.setState({
            startdate: event.target.value
        })
    }
    enddateselector=(event)=>{
        this.setState({
             enddate: event.target.value
         })
     }
     
     toggleColumnVisibility(column) {
        this.setState((prevState) => ({
          visibleColumns: {
            ...prevState.visibleColumns,
            [column]: !prevState.visibleColumns[column],
          },
        }));
      }
    getData = async (event) => {
        event.preventDefault();
        let date_records, app_ids;
        // console.log(this.state.startdate)
        // console.log(this.state.enddate)
        // this.setState({
        //     http1:String("http://go-dev.greedygame.com/v3/dummy/report?startDate=")+String(this.state.startdate)+"&"+String(this.state.enddate)
        // })
        // console.log(this.state.http1);
        let http1=String("http://go-dev.greedygame.com/v3/dummy/report?startDate=")+String(this.state.startdate)+"&endDate="+String(this.state.enddate);
        console.log(http1)
        await fetch(http1)
          .then((response) => response.json())
          .then((data_date) => {
            date_records = data_date.data;
            console.log(date_records);
          });
        await fetch("http://go-dev.greedygame.com/v3/dummy/apps")
          .then((response) => response.json())
          .then((data_app) => {
            app_ids = data_app.data;
            console.log(app_ids);
          });
    
        let merged = [];
    
        if (date_records && app_ids) {
          for (let i = 0; i < date_records.length; i++) {
            merged.push({
              ...date_records[i],
              ...app_ids.find(
                (itmInner) => itmInner.app_id === date_records[i].app_id
              ),
            });
          }
        }
        this.setState({
            list:merged
        })
        this.componentDidMount();
        return merged; 
      };
      componentDidMount(){
        let count=0;
            let totalnumberofimpressions=0;
            let totalnumberofresponses=0;
            let totalnumberofrequests=0;
            let totalnumberofclicks=0;
            let totalrevenue=0;
            let averagefillrate=0;
            let averagectr=0;
        this.state.list.map((item)=>{
            count+=1;
            console.log(item.impressions);
            totalnumberofimpressions+=item.impressions;
            totalrevenue+=item.revenue;
            totalnumberofresponses+=item.responses;
            totalnumberofrequests+=item.requests;
            totalnumberofclicks+=item.clicks;
            averagefillrate+=(parseFloat(item.requests)*100)/parseFloat(item.responses);
            averagectr+=(parseFloat(item.clicks)*100)/parseFloat(item.impressions);
        })
            averagefillrate=averagefillrate/count;
            averagectr=averagectr/count;
            this.setState({
                numberofrows:count,
                totalrevenue:totalrevenue,
                totalnumberofclicks:totalnumberofclicks,
                totalnumberofimpressions:totalnumberofimpressions,
                totalnumberofrequests:totalnumberofrequests,
                totalnumberofresponses:totalnumberofresponses,
                averagefillrate:averagefillrate,
                averagectr:averagectr
            });
                
            };
    render(){
        
        let tb_data=this.state.list.map((item)=>{
            return(
                <tr key={item.app_id}>
                <td style={{ display: this.state.visibleColumns.column1 ? 'table-cell' : 'none' }}>{item.app_id}</td>
                <td style={{ display: this.state.visibleColumns.column2 ? 'table-cell' : 'none' }}>{item.app_name}</td>
                <td style={{ display: this.state.visibleColumns.column3 ? 'table-cell' : 'none' }}>{item.date}</td>
                <td style={{ display: this.state.visibleColumns.column4 ? 'table-cell' : 'none' }}>{item.requests}</td>
                <td style={{ display: this.state.visibleColumns.column5 ? 'table-cell' : 'none' }}>{item.responses}</td>
                <td style={{ display: this.state.visibleColumns.column6 ? 'table-cell' : 'none' }}>{item.impressions}</td>
                <td style={{ display: this.state.visibleColumns.column7 ? 'table-cell' : 'none' }}>{item.clicks}</td>
                <td style={{ display: this.state.visibleColumns.column8 ? 'table-cell' : 'none' }}>{item.revenue}</td>
                <td style={{ display: this.state.visibleColumns.column9 ? 'table-cell' : 'none' }}>{(parseFloat(item.requests)*100)/parseFloat(item.responses)}</td>
                <td style={{ display: this.state.visibleColumns.column10 ? 'table-cell' : 'none' }}>{(parseFloat(item.clicks)*100)/parseFloat(item.impressions)}</td>
                </tr>
        
        )
    })
    return(
        <div>
            <form id="inputforms" onSubmit={this.getData}>
            <label for="startdate">Enter start date for the report</label>
            <input type="date" id="startdate" onChange={this.startdateselector}/><br/>
            <br/>
            <label for="enddate">Enter End date for the report</label>
            <input type="date" id="enddate" onChange={this.enddateselector}/><br/>
            <br/>
            <button type="submit" id="formbutton">Click here to generate tables</button>
            <pre  >Click on these buttons to show/hide a column present in the table</pre>
            <div id="togglebuttons">
                <button onClick={() => this.toggleColumnVisibility('column1')}>Toggle App ID Visibility</button>
                <button onClick={() => this.toggleColumnVisibility('column2')}>Toggle App Name Visibility</button>
                <button onClick={() => this.toggleColumnVisibility('column3')}>Toggle Date Visibility</button>
                <button onClick={() => this.toggleColumnVisibility('column4')}>Toggle Requests Visibility</button>
                <button onClick={() => this.toggleColumnVisibility('column5')}>Toggle Responses Visibility</button>
                <button onClick={() => this.toggleColumnVisibility('column6')}>Toggle Impressions Visibility</button>
                <button onClick={() => this.toggleColumnVisibility('column7')}>Toggle  Clicks</button>
                <button onClick={() => this.toggleColumnVisibility('column8')}>Toggle Revenue</button>
                <button onClick={() => this.toggleColumnVisibility('column9')}>Toggle FillRate Visibility</button>
                <button onClick={() => this.toggleColumnVisibility('column10')}>Toggle CTR Visibility</button>
                </div>
                </form>
            <pre>Click on the heading of the table,for instance -"app_id" to sort by app_id</pre>
            <pre>Total number of field entries,averages have been calculated and inserted accordingly</pre>
            <table>
                <thead>
                <tr>
                    <th onClick={() => this.sortData("app_id")} style={{ display: this.state.visibleColumns.column1 ? 'table-cell' : 'none' }}>App ID {this.state.numberofrows}</th>
                    <th onClick={() => this.sortData("app_name")} style={{ display: this.state.visibleColumns.column2 ? 'table-cell' : 'none' }}>App Names-{this.state.numberofrows}</th>
                    <th onClick={() => this.sortData("date")} style={{ display: this.state.visibleColumns.column3 ? 'table-cell' : 'none' }}>Dates-{this.state.numberofrows}</th>
                    <th onClick={() => this.sortData("requests")} style={{ display: this.state.visibleColumns.column4 ? 'table-cell' : 'none' }}>Requests-{this.state.totalnumberofrequests}</th>
                    <th onClick={() => this.sortData("responses")} style={{ display: this.state.visibleColumns.column5 ? 'table-cell' : 'none' }}>Responses-{this.state.totalnumberofresponses}</th>
                    <th onClick={() => this.sortData("impressions")} style={{ display: this.state.visibleColumns.column6 ? 'table-cell' : 'none' }}>Impressions-{this.state.totalnumberofimpressions}</th>
                    <th onClick={() => this.sortData("clicks")} style={{ display: this.state.visibleColumns.column7 ? 'table-cell' : 'none' }}>Clicks-{this.state.totalnumberofclicks}</th>
                    <th onClick={() => this.sortData("revenue")} style={{ display: this.state.visibleColumns.column8 ? 'table-cell' : 'none' }}>Revenue-${this.state.totalrevenue}</th>
                    <th style={{ display: this.state.visibleColumns.column9 ? 'table-cell' : 'none' }}>Fill Rate-{this.state.averagefillrate}%</th>
                    <th style={{ display: this.state.visibleColumns.column10 ? 'table-cell' : 'none' }}>CTR-{this.state.averagectr}%</th>
                </tr>  
                </thead>
                <tbody>
                    {tb_data}
                </tbody>
            </table>
        </div>
    )

}}
export default DisplayTable;
