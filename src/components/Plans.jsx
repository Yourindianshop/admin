import React, { useContext, useEffect, useRef, useState } from "react";
import "../stylesheet/Plans.css";
import { MyContext } from "../App";
import { useNavigate } from "react-router-dom";
import { fetchreq } from "../Helper/fetch";

const Plans = ({ plan,setEdit,setPlanInfo }) => {
  // const {setPlanId,isLogin,user}=useContext(MyContext);
  const nav  = useNavigate();
  const [state,setState]=useState(plan.status==1);
  const [run,setRun]=useState(false);
  const planDetails = [
    `Consolidation: Pay Rs ${plan.consolidation} per shipment.`,
    `Storage: Up to ${plan.storage} days is free, after which it's Rs 75 per item per day.`,
    `Photo: ${plan.photo} photos are free, detailed photo service up to 10 items costs Rs 400.`,
    `Package Return: Rs ${plan.package_ret==null?"50":plan.package_ret} per item.`,
    `Warehouse Pickup: Rs ${plan.warehouse_pic}.`,
    `Scanned Copies of Documents: Rs ${plan.scane_copy==null?"80":plan.scane_copy} per page.`,
    `Shipping Address: Up to ${plan.shippingAddress==null?"5":plan.shippingAddress} addresses.`,
    `Real-time Tracking: ${plan.tracking==null?"Free":plan.tracking}.`,
    `Personal Shopper: 7% of the item value (exclusive of all charges).`,
    `Receive Parcels: ${plan.recParcel}.`,
    `liquid clearence charge: ${plan.liquidCharge==null ? "10":plan.liquidCharge}% (EXCLUSIVE OF ALL OTHER CHARGES)`,
    `state: ${state?"On":"Off"}` 
    

    // `Indian Virtual Shipping Address & Personal Locker: Free.`,
    // `Set Up a Local Hub for Your Business: Free.`,
    // `Assisted Purchase: Actual charges + other charges.`,
  ];
  const changeState = async ()=>{
    // setState(!state);
    setRun(true);
    const dt = await fetchreq("GET",`${state?"off":"on"}Plan/${plan.Pid}`,{});
    dt?setState(!state):console.log(dt);
    setRun(false);
  }
  const ref = useRef();
  const editplan = async ()=>{
    setEdit(true);
    ref.current = document.getElementById("mngplan");
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setPlanInfo(plan);
  }
  useEffect(()=>{
    // if(!isLogin){
    //   nav("/");
    // }
  },[])
  return (
    <div id="pl-ol">
      <div className="plan-card">
        <div id="pc-top">
          <div className="plan-name">{plan.Name}</div>
          <span className="plan-price">
            <small>₹ </small>
            {plan.Price}
            <small> .00</small>
          </span>
        </div>
        <div id="pc-mid">
          <ul>
            {planDetails.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
        <div id="pc-bot">
          <div className="choose-plan" style={{display:'flex'}}>
            <button className="btn btn-b" onClick={changeState}>{!run?("Turn"+ (state?" Off":" On")):"Please Wait"}</button>
            <button className="btn btn-b" onClick={editplan}>Edit Plan</button>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Plans;
