import React from "react";
import "../../stylesheet/DisReq.css";
import TransactionTable from "../../components/TransactionTable";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Transaction = () => {
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
            <span id="blue">Wallet</span>
            <span id="org">Transactions</span>
            <span id="blue">Section</span>
          </div>
        </div>
        <TransactionTable cid={false} />
      </div>
    </>
  );
};


export default Transaction