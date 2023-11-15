import React, { useContext, useState } from "react";
import "../stylesheet/Warehouse.css";
// import { MyContext } from "../App";
import { fetchreq, walletTransaction } from "../Helper/fetch";
import { useNavigate } from "react-router-dom";
const Warehouse = ({warehouse,openManager}) => {
  // const {planId,user,setUser}=useContext(MyContext);
  const nav = useNavigate();
  const [status,setStatus]=useState(warehouse.Status==1?true:false);
  const changeWs = async ()=>{
    const wid=warehouse.Wid;
    const dt = await fetchreq("GET",`changeWs/${wid}/${status?0:1}`)
    dt?setStatus(!status): alert("something Went Wrong...");
  }
  return (
      <div className="warehouse-card">
        {/* <div className="wh-img-ol">
          <img src={a.image} alt={warehouse.Name} className="warehouse-image" />
        </div> */}
        <div className="w-data">
          <h3 className="warehouse-name">{warehouse.Name}</h3>
          <p className="warehouse-details">
            <strong>WareHouse Id:</strong> {warehouse.Wid}<br />
            <strong>Address:</strong> {warehouse.Address}<br />
            <strong>Strit:</strong> {warehouse.Address2}<br />
            <strong>Landmark:</strong> {warehouse.Landmark}<br />
            <strong>City:</strong> {warehouse.City}<br />
            <strong>Pincode:</strong> {warehouse.pincode}<br />
            <strong>State:</strong> {warehouse.State}<br />
            <strong>Country:</strong> {warehouse.Country}<br />
            <strong>Capacity:</strong> {warehouse.Capacity}<br />
            <strong>Status: </strong> {(status )?"On":"Off"}
          </p>
        </div>
        <div style={{display:'flex'}}>
          <button className="btn btn-b" onClick={changeWs}>{(!status )?"On":"Off"} WareHouse</button>
          <button className="btn btn-b" onClick={()=>{openManager(warehouse)}}>Details</button>
        </div>
      </div>
  );
};

export default Warehouse;
