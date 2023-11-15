import React from "react";
import "../../stylesheet/DisReq.css";
import DispatchRequestTable from "../../components/DispatchRequestTable";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const DisReq = () => {
  const {isLogin}=useContext(MyContext);
  const nav = useNavigate();
  useEffect(()=>{
    if(!isLogin){
      nav("/");
    }
  },[])
  return (
    <>
      <div id="dr-cont">
        <div id="dash-title">
          <div>
            <span id="blue">Dispatch</span>
            <span id="org">Request</span>
            <span id="blue">Section</span>
          </div>
        </div>
        <DispatchRequestTable cid={false} />
      </div>
    </>
  );
};

export default DisReq;
