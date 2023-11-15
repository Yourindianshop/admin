


import React, { useState } from "react";
import "../../stylesheet/ManagePlan.css"; // Import your CSS file for styling
import "../../stylesheet/Form.css"; // Import your CSS file for styling
import PlanPage from "./PlanPage";
import {fetchreq} from '../../Helper/fetch'
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MyContext } from "../../App";

function ManagePlan() {
  // State variables to store form data
  const basicinfo = {
    Name: "",
    status: "",
    details: "",
    Price: "",
    duration: "",
    consolidation: "",
    storage: "",
    storage_price: "",
    photo: "",
    photoPrice: "",
    package_ret: "",
    warehouse_pic: "",
    scane_copy: "",
    shippingAddress: "",
    realTimeTracking: "",
  }
  const [planInfo, setPlanInfo] = useState(basicinfo);
  const [edit,setEdit]=useState(false);
  const [run ,setRun]=useState(false);
  const [planshow,setPlanShow]=useState(true);
  const [addplan,setAddplan]=useState(false);

  // Handle form submissions
  const handleSubmit =async (e) => {
    e.preventDefault();
    const areAllValuesNotNull =edit || Object.values(planInfo).every((value) => (value !== null && value!="" ));
    if(!run && areAllValuesNotNull){
      setRun(true);
        // Process and send form data to the server or admin
      const dt = await fetchreq("POST",`${edit?"editplan":"addplan"}`,planInfo);
      if(dt){
        setPlanShow(false);
        setEdit(false);
        setPlanInfo(basicinfo);
        setAddplan(false);
        setTimeout(() => {
          setPlanShow(true);
        }, 500);
      }else{
        alert("something went wrong...")
      }
      setRun(false);
    }else if(!areAllValuesNotNull){
      alert('please fill all the details');
    }else{
      alert("please Wait...")
    }
  };
  const {isLogin}=useContext(MyContext);
  const cancelEdit  = async ()=>{
    setEdit(false);
    setPlanInfo(basicinfo);
    setAddplan(false);
  }
  const nav = useNavigate();
  useEffect(()=>{
    if(!isLogin){
      nav("/");
    }
  },[])
  return (
    <div id="dash-pa" className="product-acceptance-form">
      <h2 id="mngplan">
        <span id="blue">Manage </span>
        <span id="org">Plan</span>
      </h2>
      {edit&&<><h1>Edit Mode</h1> <button onClick={cancelEdit}>Cancel Edit</button> </>}
      {!edit && <button className={!addplan && "btn btn-b"} onClick={()=>{setAddplan(!addplan)}}>{!addplan?"Add":"Hide"} Plan</button> }
      {(addplan || edit) && <form onSubmit={handleSubmit}>
        {/* Plan Information */}
        <div className="form-group">
          <label htmlFor="Plan Name">Plan Name: </label>
          <input
            type="text"
            placeholder="Plan Name"
            value={planInfo.Name}
            onChange={(e) =>
              setPlanInfo({ ...planInfo, Name: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label >Status: </label>
          <input
            type="number"
            placeholder="Status"
            value={planInfo.status}
            onChange={(e) =>
              setPlanInfo({ ...planInfo, status: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label >Details: </label>
          <input
            type="text"
            placeholder="Details"
            value={planInfo.details}
            onChange={(e) =>
              setPlanInfo({ ...planInfo, details: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label >Price: </label>
          <input
            type="number"
            placeholder="Price"
            value={planInfo.Price}
            onChange={(e) =>
              setPlanInfo({ ...planInfo, Price: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Duration: </label>
          <input
            type="number"
            placeholder="Duration"
            value={planInfo.duration}
            onChange={(e) =>
              setPlanInfo({ ...planInfo, duration: e.target.value })
            }
          />
        </div>
        
        <div className="feature-group">
          <label>Consolidation: </label>
          <input
            type="number"
            placeholder="Consolidation Cost (per Shipment)"
            value={planInfo.consolidation}
            onChange={(e) =>
              setPlanInfo({ ...planInfo, consolidation: e.target.value })
            }
          />
        </div>
        <div className="feature-group">
          <label>Storage Rent per Day: </label>
          <input
            type="number"
            placeholder="Storage Rent (Per day and Per Item)"
            value={planInfo.storage_price}
            onChange={(e) =>
              setPlanInfo({ ...planInfo, storage_price: e.target.value })
            }
          />
        </div>
        <div className="feature-group">
        <label>Free Storage in Days: </label>
          <input
            type="number"
            placeholder="Free Storage"
            value={planInfo.storage}
            onChange={(e) =>
              setPlanInfo({ ...planInfo, storage: e.target.value })
            }
          />
        </div>
        
        <div className="feature-group">
        <label>Free Photos: </label>
          <input
            type="number"
            placeholder="Free Photos"
            value={planInfo.photo}
            onChange={(e) =>
              setPlanInfo({ ...planInfo, photo: e.target.value })
            }
          />
        </div>
        <div className="feature-group">
        <label>Photo Price: </label>
          <input
            type="number"
            placeholder="Photos Price "
            value={planInfo.photoPrice}
            onChange={(e) =>
              setPlanInfo({ ...planInfo, photoPrice: e.target.value })
            }
          />
        </div>
        <div className="feature-group">
        <label>Package Return Cost: </label>
          <input
            type="number"
            placeholder="Package Return Cost"
            value={planInfo.package_ret}
            onChange={(e) =>
              setPlanInfo({ ...planInfo, package_ret: e.target.value })
            }
          />
        </div>
        <div className="feature-group">
        <label>Warehouse Pickup Cost: </label>
          <input
            type="number"
            placeholder="Warehouse Pickup Cost"
            value={planInfo.warehouse_pic}
            onChange={(e) =>
              setPlanInfo({ ...planInfo, warehouse_pic: e.target.value })
            }
          />
        </div>
        <div className="feature-group">
        <label>Recive Parcel Cost: </label>
          <input
            type="number"
            placeholder="Recive Parcel Cost"
            value={planInfo.scane_copy}
            onChange={(e) =>
              setPlanInfo({ ...planInfo, scane_copy: e.target.value })
            }
          />
        </div>
        <div className="feature-group">
        <label>Shipping Address: </label>
          <input
            type="number"
            placeholder="Shipping Address"
            value={planInfo.shippingAddress}
            onChange={(e) =>
              setPlanInfo({ ...planInfo, shippingAddress: e.target.value })
            }
          />
          { <p>Note: here -1 means unlimited</p>}
        </div>
        {/* <div className="feature-group">
        <label>Real-time Tracking : </label>
          <input
            type="number"
            placeholder="Real-time Tracking (Free/Cost)"
            value={planInfo.realTimeTracking}
            onChange={(e) =>
              setPlanInfo({ ...planInfo, realTimeTracking: e.target.value })
            }
          />
        </div> */}

        {/* Submit Button */}
        <div className="form-group">
          <button className="btn btn-b" type="submit">
            {edit?(run?"Plase Wait":"Edit Plan"):(run?"Adding Plan...":"Add Plan")}
          </button>
        </div>
      </form>}
      {planshow && <PlanPage setEdit={setEdit} setPlanInfo={setPlanInfo}/>}
    </div>
  );
}

export default ManagePlan;
