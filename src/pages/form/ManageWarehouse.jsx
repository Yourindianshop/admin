


import React, { useState } from "react";
import "../../stylesheet/Form.css"; // Import your CSS file for styling
import {fetchreq} from '../../Helper/fetch'
import SelectWareHouse from "./SelectWareHouse";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function WarehouseManagement() {
  // State variables to store warehouse data, including a file for warehouse image upload
  const [warehouseInfo, setWarehouseInfo] = useState({
    Name: "",
    Address: "",
    Address2: "",
    Landmark: "",
    City: "",
    Country: "",
    State: "",
    pincode: "",
    Capacity: "",
    Status: "",
  });
  const [addman,setAddman]=useState(false);

  // Handle form submissions for warehouse
  const handleWarehouseSubmit =async (e) => {
    e.preventDefault();
    const areAllValuesNotNull = Object.values(warehouseInfo).every((value) => (value !== null && value !== ""));
    if(areAllValuesNotNull){
      const dt = await fetchreq("POST","addWarehouse",warehouseInfo);
      dt?alert("added succesfully"): alert("something went wrong");
    }else{
      alert("please fill all the details");
    }
  };
  const {isLogin}=useContext(MyContext);
  const nav = useNavigate();
  useEffect(()=>{
    if(!isLogin){
      nav("/");
    }
  },[])
  return (
    <div id="dash-pa">
      <div className="manage-warehouse-form">
        <h2>
          <span id="blue">Manage </span>
          <span id="org">Warehouse</span>
        </h2>
        <button className="btn" onClick={()=>setAddman(!addman)}>{!addman?"Add":"Hide"} WareHouse</button>
        {addman && <form onSubmit={handleWarehouseSubmit}>
          {/* Warehouse Information */}
          <div className="form-group">
            <input
              type="text"
              required
              placeholder="Warehouse Name"
              value={warehouseInfo.Name}
              onChange={(e) =>
                setWarehouseInfo({
                  ...warehouseInfo,
                  Name: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              required
              placeholder="Address"
              value={warehouseInfo.Address}
              onChange={(e) =>
                setWarehouseInfo({ ...warehouseInfo, Address: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              required
              placeholder="Address2"
              value={warehouseInfo.Address2}
              onChange={(e) =>
                setWarehouseInfo({ ...warehouseInfo, Address2: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              required
              placeholder="Landmark"
              value={warehouseInfo.Landmark}
              onChange={(e) =>
                setWarehouseInfo({ ...warehouseInfo, Landmark: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              required
              placeholder="City"
              value={warehouseInfo.City}
              onChange={(e) =>
                setWarehouseInfo({ ...warehouseInfo, City: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              required
              placeholder="Country"
              value={warehouseInfo.Country}
              onChange={(e) =>
                setWarehouseInfo({ ...warehouseInfo, Country: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              required
              placeholder="State"
              value={warehouseInfo.State}
              onChange={(e) =>
                setWarehouseInfo({ ...warehouseInfo, State: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              required
              placeholder="Pincode"
              value={warehouseInfo.pincode}
              onChange={(e) =>
                setWarehouseInfo({ ...warehouseInfo, pincode: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              required
              placeholder="Capacity"
              value={warehouseInfo.Capacity}
              onChange={(e) =>
                setWarehouseInfo({ ...warehouseInfo, Capacity: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="Number"
              placeholder="Status (Enter 0 or 1)"
              value={warehouseInfo.Status}
              onChange={(e) =>
                setWarehouseInfo({ ...warehouseInfo, Status: e.target.value })
              }
            />
          </div>
          {/* Submit Button */}
          <div className="form-group">
            <button className="btn btn-b" type="submit">
              Save Warehouse
            </button>
          </div>
        </form>}
        
        <hr /><hr /><br />
        <SelectWareHouse/>
      </div>
      
    </div>
  );
}

export default WarehouseManagement;
