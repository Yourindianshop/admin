
 
import React, { useContext, useEffect, useState } from "react";
import Warehouse from "../../components/Warehouse";
// import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { fetchreq } from "../../Helper/fetch";

const SelectWareHouse = () => {
  const [warehouse,setWareHouses]=useState([]);
  const [singleWh,setSingleWh]=useState(null);
  const [addManager,setAddManager]=useState(null);
  const [mdt,setMdt]=useState(null);
  const [aFx,setAFx]=useState(null);
  const [nullMan,setNullMan]=useState(null);
  const [addNewMan,setAddNewMan]=useState(false);
  const [managerInfo, setManagerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  let warehosusesStored;
  const [isProcess,setIsProcess]=useState(false);
  // const {planId,user,isLogin}=useContext(MyContext);
  const nav = useNavigate()
  const [manager,setManager]=useState(false);
  const getWarehose = async ()=>{
    const dt = await fetchreq('GET',`selectWarehouseAll`,{})
    dt?setWareHouses(dt.result):setWareHouses([]);
    warehosusesStored = dt.result;
  }
  const getManager = async (wid)=>{
    const dt = await fetchreq("GET",`getManagerByWid/${wid}`,{});
    if(dt){
      if(dt.result.length==0){
        setAddManager(true);
      }else{
        setAddManager(false);
        setMdt(dt.result);
      }
    }
    console.log(dt);
  }
  
  const removeManager  =async (ind)=>{
    setIsProcess(true);
    const dt = await fetchreq("DELETE",`rejectManager/${mdt[ind].Mid}`,{});
    if(dt){
      setAddManager(true);
      setManager(false);
    }else{
      alert("something went wrong")
    }
    setIsProcess(false);
  }

  const aFromx = async ()=>{
    setAFx(true);
    const dt = await fetchreq("GET","NullManager",{});
    if(dt){
      setNullMan(dt.result);
    }else{
      setNullMan([]);
    }
  }
  const assignManager = async (mid)=>{
    setIsProcess(true);
    const wid = singleWh.Wid;
    const body ={
      Mid:mid,
      Wid:wid
    }
    const dt = await fetchreq("POST","assignManager",body);
    if(dt){
      openManager(singleWh);
      aFromx();
    }else{
      alert("something went wrong");
    }
    setIsProcess(false);
  }
  const openManager = async (wh)=>{
    setManager(true);
    setSingleWh(wh);
    getManager(wh.Wid);
  }
  const searchWh = async (key)=>{
    const fo = warehouse.filter((o)=>{o.Name.includes(key)})
    setWareHouses(fo);
  }
  const handleManagerSubmit = async (e)=>{
    e.preventDefault();
    setIsProcess(true);
    const body = {
      Wid: singleWh.Wid,
      Name: managerInfo.name,
      email: managerInfo.email,
      password: managerInfo.password,
      phoneNo: managerInfo.phone,
      Status: 1,
    }
    const dt = await fetchreq("POST","addManager",body);
    if(dt){
      alert("Manger Added Successfully");
      setAddManager(false);
      getManager(singleWh.Wid);
    }else{
      alert("something went wrong");
    }
    setIsProcess(false);
  }
  useEffect(()=>{
    // if(isLogin){
    //   if(planId==null){
    //     nav("/plan");
    //   }else{
    //     getWarehose();
    //   }
    // }else{
    //   nav("/")
    // }
    getWarehose();
  },[])
  return (
    <>
      {!isProcess &&  !manager && <><center>
        <div className="plan-page-title">
          <span id="blue">Choose </span>
          <span id="org">WareHouse</span>
        </div>
      </center>
      {/* <input className="btn" onChange={(e)=>searchWh(e.target.value)} type="search" placeholder="Search WareHouse Here"  /> */}
      <div className="warehouse-container">
        {warehouse.length!=0 && warehouse.map((warehouse) => (
          <Warehouse
            key={warehouse.Wid}
            warehouse={warehouse}
            openManager={openManager}
          />
        ))}
      </div></>}
      {!isProcess &&  manager && singleWh && <div>
        <button style={{position:'absolute',width:'120px',top:'0px'}} onClick={()=>{setManager(false)}}> Go back </button>
        <h1>{singleWh.Name}</h1>
        { <div>
          <div className="add-manager-to-warehouse-form">
            <button onClick={()=>{setAddNewMan(!addNewMan)}}>{addNewMan?"Hide New Manager":"Add New Manager"}</button>
            {addNewMan && <div>
              <h2>
                <span id="blue">Add New </span>
                <span id="org">Manager</span>
              </h2>
              <form onSubmit={handleManagerSubmit}>
                {/* Manager Information */}
                <div className="form-group">
                  <input
                    required
                    type="text"
                    placeholder="Manager Name"
                    value={managerInfo.name}
                    onChange={(e) =>
                      setManagerInfo({ ...managerInfo, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    value={managerInfo.phone}
                    onChange={(e) =>
                      setManagerInfo({ ...managerInfo, phone: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={managerInfo.email}
                    onChange={(e) =>
                      setManagerInfo({ ...managerInfo, email: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    value={managerInfo.password}
                    onChange={(e) =>
                      setManagerInfo({ ...managerInfo, password: e.target.value })
                    }
                  />
                </div>
                
                {/* Submit Button */}
                <div className="form-group">
                  <button className="btn btn-g" type="submit">
                    Add New Manager
                  </button>
                </div>
              </form>
            </div>}
            <hr /><br />
            <button className="btn " onClick={()=>{!aFx?aFromx():setAFx(false)}}>{aFx?"Hide existing Manager":"assign from existing Managers"}</button>
            {aFx && <div>
              <h2>
                <span id="blue">Assign From </span>
                <span id="org">Existing Manager</span>
              </h2>
              {nullMan && nullMan.map((m)=>{
                return <div>
                  <p>Manager Id: {m.Mid}</p>
                  <p>Name: {m.Name}</p>
                  <p>Email: {m.email}</p>
                  <p>phoneNo: {m.phoneNo}</p>
                  <button style={{width:'300px'}} className="btn-g" onClick={()=>assignManager(m.Mid)}  >Assign</button>
                </div>
              })}
            </div>} <hr /><br />
          </div> 
        </div> }
        {!addManager && mdt && <div>
          <h3>Current Manager Details</h3>
          {mdt?.map((m,ind)=>{
            return <div>
              <p>Name: {m.Name}</p>
              <p>Email: {m.email}</p>
              <p>PhoneNo: {m.phoneNo}</p>
              <p>password: {m.password}</p>
              <div style={{display:"flex",width:'300px'}}>
                <button className="btn-r" onClick={()=>{removeManager(ind)}}>Reject Manager</button>
              </div>
            </div>
          })}
        </div> }
      </div> }
      {isProcess && <div>
        <h1>Please Wait...</h1>
      </div> }
    </>
  );
};

export default SelectWareHouse;
