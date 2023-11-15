import React, { useContext, useEffect, useState } from "react";
import "../stylesheet/ProductAcceptanceTable.css";
import {useNavigate} from 'react-router-dom'
import {fetchreq, getDate} from '../Helper/fetch'
// import { MyContext } from "../App";

const ProductAcceptanceTable = ({cid}) => {
  // 
  // const {savedt,setSavedt,ispen,setIspen,mg}=useContext(MyContext);
  const [pad,setPad]=useState([]);
  const [apr,setApr]=useState([]);
  const [pnd,setpnd]=useState([]);
  const [ispen,setIspen]=useState(false);
  
  const getApproved = async (dt)=>{
    document.getElementById('p1').classList.remove("btn-b");
    document.getElementById('a1').classList.add("btn-b");
    const ap =await dt.filter((k)=>k?.Verify==1);
    setApr(ap);
    setIspen(false);
  }
  const getPendings =async (dt)=>{
    document.getElementById('a1').classList.remove("btn-b");
    document.getElementById('p1').classList.add("btn-b");
    const pen =await dt.filter((k)=>k?.Verify!=1);
    setpnd(pen);
    setIspen(true);
  }
  
  const getData=async ()=>{
    const dt = await fetchreq("GET",`getPARA?pg=1`,{});
    if(dt){
      setPad(dt.result);
      getPendings(dt.result);
      // setSavedt(dt.result);
    }else{
      setPad(null);
    }
  }
  const getData2=async ()=>{
    const dt = await fetchreq("GET",`getPARAll/${cid}?pg=1`,{});
    if(dt){
      setPad(dt.result);
      getPendings(dt.result);
      // setSavedt(dt.result);
    }else{
      setPad(null);
    }
  }
  useEffect(()=>{
    // if(savedt!=null ){
    //   setPad(savedt);
    //   getPendings(savedt);
    // }else{
    //   getData();
    // }
    !cid? getData(): getData2();
  },[])
  
  return (
    <div className="product-acceptance-container">
      <div style={{display:'flex'}}>
        <button id="p1" onClick={()=>getPendings(pad)} className="btn ">Pending</button>
        <button id="a1" onClick={()=>getApproved(pad)} className="btn ">Approved</button>
      </div>
      <table className="product-acceptance-table">
        <thead>
          <tr>
            <th>Request ID</th>
            {!cid && <th>Customer ID</th>}
            <th>Product Name</th>
            <th>Request Timestamp</th>
            <th>Status</th>
            <th>WareHouseId</th>
          </tr>
        </thead>
        <tbody>
          {ispen && pnd && pnd.length!=0 && pnd.map((request, index) => {
            const time = getDate(request.time);
            const status = request.Verify!=1?"Pending":"Approved"
            return ( <tr key={index} id="rr">
              <td>{request.Rid}</td>
              {!cid && <td>{request.email}</td>}
              <td>{request.productName}</td>
              <td>{time}</td>
              <td className={request.status}>{status}</td>
              <td>{request.Wid}</td>
            </tr>
          )})}
          {!ispen && apr && apr.length!=0 && apr.map((request, index) => {
            const time = getDate(request.time);
            const status = request.Verify!=1?"Pending":"Approved"
            return ( <tr key={index} id="rr">
              <td>{request.Rid}</td>
              {!cid && <td>{request.email}</td>}
              <td>{request.productName}</td>
              <td>{time}</td>
              <td className={request.status}>{status}</td>
              <td>{request.Wid}</td>
            </tr>
          )})}
          {ispen && !pnd && <p>No data found</p> }
          {!ispen && !apr && <p>No data found</p> }
        </tbody>
      </table>
    </div>
  );
};

export default ProductAcceptanceTable;