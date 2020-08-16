import React, { useState } from 'react';
import './App.css';


function filterer(total,present)
{
//This filters the both List
const totalStd=total.split(',')
const currentStd = present.split(',')
for(var i=0;i<totalStd.length;i++)
{
    totalStd[i]=totalStd[i].replace(/(\r\n|\n|\r)/gm,"");
    totalStd[i]=totalStd[i].toLowerCase()
}
// eslint-disable-next-line no-redeclare
for(var i=0;i<currentStd.length;i++)
{
    currentStd[i]=currentStd[i].replace(/(\r\n|\n|\r)/gm,"");
    currentStd[i]=currentStd[i].toLowerCase()

}
var missing=[]
var found=0
for(var a=0;a<totalStd.length;a++)
{
  found=0
  for(var b=0;b<currentStd.length;b++)
  {
    if(totalStd[a]===currentStd[b])
    {
      found=1
      //Its is present
    }
    
  }
  if(found===0)
    {
      missing.push(totalStd[a])
      //Particular student is not Available
    }
}

return missing
}




function App() {

  const [data,setData]=useState({total:"",current:"",unavailable:["Null"]})

  const filterAll=()=>{
    const missing=filterer(data.total,data.current)
    for(var i=0;i<missing.length;i++)
    {
      missing[i]=missing[i].charAt(0).toUpperCase()+missing[i].slice(1)
    }
    if(missing.length!==0)
      {setData({...data,unavailable:missing});}
  }


  return (
    <div className="containerApp">
  
      <div className="totalStudentsContainer">
        {/* Total STudent Entry List */}
        <h1 className="headings">Total List of Students</h1>
        <textarea placeholder="Separate with a ',' " className="textarea" id="total" onChange={(e)=>setData({...data,total:e.target.value})} />
      </div>
      <div className="unavailabeStudentsContainer">
        {/* Missing STudents */}
        <h3 className="headings">Currently Unavailable Students</h3>
          <div className="resultContainer">
          {data.unavailable.map(student=>
            <h1 className="results" key={student}>{student}</h1>
          )}
          </div>
        <br />
        <button onClick={()=>filterAll()} className="filterButton">FILTER</button>
      </div>
      <div className="currentStudentsContainer">
      <h1 className="headings">Current List of Students</h1>
        {/* Present STudents List */}
        <textarea placeholder="Separate with a ',' " className="textarea" id="current" onChange={(e)=>setData({...data,current:e.target.value})}/>
      </div>
    </div>
  );
}

export default App;
