import React from "react";

import ProductAcceptanceTable from "../../components/ProductAcceptanceTable";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const ProAccReq = () => {
  const {isLogin}=useContext(MyContext);
  const nav = useNavigate();
  useEffect(()=>{
    if(!isLogin){
      nav("/");
    }
  },[])
  return (
    <div id="dr-cont">
      {" "}
      <div id="dash-title">
        <div>
          <span id="blue">Product</span>
          <span id="org">Acceptance</span>
          <span id="blue">Requests</span>
        </div>
      </div>
      <ProductAcceptanceTable cid={false} />
    </div>
  );
};

export default ProAccReq;
