import React from "react";
import AssistedPurchaseTable from "../../components/AssistedPurchaseTable";
import { MyContext } from "../../App";
import { useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useEffect } from "react";


const AssistedPurchase = () => {
  const {isLogin}=useContext(MyContext);
  const nav = useNavigate();
  useEffect(()=>{
    if(!isLogin){
      nav("/");
    }
  },[])
  return (
    <div id="dr-cont">
      <div id="dash-title">
        <div>
          <span id="blue">Assisted </span>
          <span id="org">Purchase </span>
          <span id="blue">Section </span>
        </div>
        <Link to="/addProduct" className="btn btn-b" >Add Product</Link>
      </div>
      <div id="pd">
        <AssistedPurchaseTable iswhiteLabeling={false} />
      </div>
    </div>
  );
};

export default AssistedPurchase;
