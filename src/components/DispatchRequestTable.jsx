import React, { useContext, useEffect, useState } from "react";
import "../stylesheet/DispatchRequestTable.css";
import { fetchreq, getDate } from "../Helper/fetch";
import { MyContext } from "../App";
import { useNavigate } from "react-router-dom";



const DispatchRequestTable = ({cid}) => {
  // const {setRd,savedt2,setSavedt2,ispen,setIspen,dr,setDr,mg}=useContext(MyContext);
 
  const [Ddt,setDdt]=useState([]);
  const [apr,setApr]=useState([]);
  const [pnd,setpnd]=useState([]);
  const [ispen,setIspen]=useState(false);
 
const getApproved = async (dt)=>{
  document.getElementById('p1').classList.remove("btn-b");
  document.getElementById('a1').classList.add("btn-b");
  const ap =await dt.filter((k)=>k?.Status==1);
  setApr(ap);
  setIspen(false);
}
const getPendings =async (dt)=>{
  document.getElementById('a1').classList.remove("btn-b");
  document.getElementById('p1').classList.add("btn-b");
  const pen =await dt.filter((k)=>k?.Status==0);
  setIspen(true);
  setpnd(pen);
} 
const getData=async ()=>{
  const dt  = await fetchreq("GET",`dispachreqAdmin`);
  if(dt){
    await setDdt(dt.result);
    getPendings(dt.result);
    // setSavedt2(dt.result);
  }else{
    setDdt(null);
  }
} 
const getData2 = async ()=>{
  const dt  = await fetchreq("GET",`dispachreqAdmin/${cid}`);
  if(dt){
    await setDdt(dt.result);
    getPendings(dt.result);
    // setSavedt2(dt.result);
  }else{
    setDdt(null);
  }
}
useEffect(()=>{
  // if(savedt2!=null){
  //   setDdt(savedt2);
  //   console.log(ispen)
  //   if(ispen){
  //     getPendings(savedt2);
  //   }else{
  //     getApproved(savedt2);
  //   }
  // }else{
  //   getData();
  // }
  !cid?getData():getData2();
},[])
  return (
    <div className="dispatch-request-container product-acceptance-container">
     
      <div style={{display:'flex'}}>
        <button id="p1" onClick={()=>getPendings(Ddt)} className="btn ">Pending</button>
        <button id="a1" onClick={()=>getApproved(Ddt)} className="btn ">Dispatched</button>
      </div>
      <table className="dispatch-request-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>ProductId</th>
            <th>Reciver</th>
            <th>email</th>
            <th>City</th>
            <th>State</th>
            <td>Country</td>
            <td>Pincode</td>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {ispen && Ddt && pnd.map((request, index) => (
            <tr key={index} id="rr">
              <td>{request.Sid}</td>
              <td>{request.Did}</td>
              <td>{request.Name}</td>
              <td>{request.Email}</td>
              <td>{request.City}</td>
              <td>{request.State}</td>
              <td>{request.Country}</td>
              <td>{request.pincode}</td>
              <td>{getDate(request.Time)}</td>
            </tr>
          ))}
          {!ispen && Ddt && apr.map((request, index) => (
            <tr key={index} id="rr">
              <td>{request.Sid}</td>
              <td>{request.Did}</td>
              <td>{request.Name}</td>
              <td>{request.Email}</td>
              <td>{request.City}</td>
              <td>{request.State}</td>
              <td>{request.Country}</td>
              <td>{request.pincode}</td>
              <td>{getDate(request.Time)}</td>
            </tr>
          ))}
          {!Ddt && <p>No data found</p> }
        </tbody>
      </table>  
    </div>
  );
};

export default DispatchRequestTable;
