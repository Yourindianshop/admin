import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { MyContext } from "../App";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const {isLogin}=useContext(MyContext);
  const nav = useNavigate();
  useEffect(()=>{
    if(!isLogin){
      nav("/");
    }
  },[])
  return <div id="temp">Admin dashboard</div>;
};

export default Dashboard;
