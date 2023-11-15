import React from "react";
import CustomerTable from "../../components/CustomerTable";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Customers = () => {
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
          <span id="blue">Site </span>
          <span id="org">Customer </span>
          <span id="blue">List </span>
        </div>
      </div>
      <div>
        <CustomerTable />
      </div>
    </div>
  );
};

export default Customers;
