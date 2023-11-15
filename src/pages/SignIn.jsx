
import React, { useContext, useEffect, useState } from "react";
import "../stylesheet/Login.css"; // Import your CSS styles here
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom"; // Import Link from 'react-router-dom' if you are using React Router
import { fetchreq, jwtauth } from "../Helper/fetch";
import { MyContext } from "../App";

const SignIn = () => {
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const {setIsLogin,setAdmin}=useContext(MyContext);
  const nav = useNavigate();
  // const {setMg,setIsLogin}=useContext(MyContext);
  const login = async (e)=>{
    e.preventDefault();
    if(email!="" && pass != ""){
      const out = await fetchreq("POST","loginAdmin",{email,password:pass});
     
      if(out){
        setAdmin(out.user);
        setIsLogin(true);
        setTimeout(() => {
          nav("/dashboard");
        }, 500);
      }else{
        alert("wrong id or password");
        setEmail("");
        setPass("");
      }
    }else{
      alert("invalid credentials...");
    }
  }
  useEffect(()=>{
    setAdmin(null);
    setIsLogin(false);
  },[])
  return (
    <>
      <section className="signup">
        <div className="wrapper">
          <form onSubmit={login} className="form">
            <div className="title">
              <div className="line"></div>
              <div className="uline">
                Welcome to <span id="org">Your Indian Shop</span>
              </div>
            </div>
            <label htmlFor="username">Username:</label>
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" id="username" />
            <label htmlFor="password">Password:</label>
            <input value={pass} onChange={(e)=>{setPass(e.target.value)}} type="password" id="password" />
            <br />
            <div>
              <button type="submit" className="btn btn-o">
                <LoginIcon />
                Sign In
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignIn;

