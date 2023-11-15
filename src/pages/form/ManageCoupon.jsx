import React, { useEffect, useState } from "react";
// import "../../stylesheet/ManageCoupon.css"; // Import your CSS file for styling
import "../../stylesheet/Form.css"; // Import your CSS file for styling
import { fetchreq,getDate, uploadImageAws } from "../../Helper/fetch";

function ManageCoupon() {
  // State variables to store form data, including a file for image upload
  const initialcv = {
    saleName: "",
    discountPercentage: "",
    validity: "",
    posterImageFile: null, // Initialize as null
    minamount : null,
    maxamount: null,
    img: null
  }
  const [couponInfo, setCouponInfo] = useState(initialcv);
  const [coupens,setCoupens]=useState(null);
  const url = process.env.REACT_APP_URL;
  const [run,setRun]=useState(false);

  // Handle form submissions
  const checkcoupen = async (code)=>{
    const dt = await fetchreq("GET",`getCoupons/${code}`,{});
    if(dt){
      if(dt.result.length==0){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }

  }
  const handleSubmit =async (e) => {
    e.preventDefault();
    if(!run){
      setRun(true);
      const ispercentage = ischeck;
      const s1 = couponInfo.img?.size / 1024;
      const coupencode = ispercentage?`YISP${couponInfo.discountPercentage}` :`YIS${couponInfo.discountPercentage}`
      if(!(await checkcoupen(coupencode))){
        return;
      }else{
        if(s1>1000){
          alert("Image 1 size Must be less than 1 MB");
          setRun(false);
          return;
        }else{
          const url = await uploadImageAws("YIS.png",couponInfo.img);
          const obj = { name: couponInfo.saleName,amount: couponInfo.discountPercentage ,isPercentage: ispercentage,days: couponInfo.validity,maxamount: ischeck==1?couponInfo.maxamount:couponInfo.discountPercentage, img: url,minamount: couponInfo.minamount,coupencode }
          const dt = await fetchreq("POST","addCoupen",obj);
          dt? getCoupens(): alert("Something went wrong");
        }
      }
      setRun(false);
    }
  };
  const DeleteCoupen=async (cid)=>{
    const dt = await fetchreq("GET",`deleteCoupen/${cid}`,{});
    console.log(dt);
    dt?getCoupens(): alert("not Deleted...");
  }
  // Handle file input change
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setCouponInfo({ ...couponInfo, img: selectedFile });
  };
  const [ischeck,setIscheck]=useState(-1);
  const getCoupens = async ()=>{
    setCoupens(null)
    const dt = await fetchreq("GET","getAllCoupens",{});
    if(dt){
      setCouponInfo(initialcv);
      setCoupens(dt.result);
    }else{
      setCoupens(null)
    }
  }
  const OnOffCoupen = async (c)=>{
    const dt = await fetchreq("GET",`setCouponsStatus/${c.Cid}/${c.isOn==1?0:1}`)
    dt?getCoupens(): alert("not changed...")
  }
  useEffect(()=>{
    getCoupens();
  },[])
  return (
    <div id="dash-pa" className="product-acceptance-form">
      <h2>
        <span id="blue">Manage </span>
        <span id="org">Coupon</span>
      </h2>
      <hr /><br />
      <h3>Add Coupens</h3>
      <form onSubmit={handleSubmit}>
        {/* Coupon Information */}
        <div className="form-group">
          <input
            required
            type="text"
            placeholder="Coupen Name"
            value={couponInfo.saleName}
            minlenght={3}
            onChange={(e) =>
              setCouponInfo({ ...couponInfo, saleName: e.target.value })
            }
          />
        </div>
      <label>Percentage: <input
          required
          name="choose"
          type="radio"
          value={1}
          onChange={()=>{setIscheck(1)}}
          /> {" "}
          Flat Amount: <input
          required
          name="choose"
          type="radio"
          value={0}
          onChange={()=>{setIscheck(0)}}
        />
      </label> 
        <div className="form-group">
          {ischeck!=-1 &&  <input
            required
            type="number"
            placeholder={"Enter Discount "+`${ischeck==0?"Amount":"percentage"}`}
            value={couponInfo.discountPercentage}
            step={1}
            min={1}
            max={ischeck==0?undefined:100}
            onChange={(e) =>
              setCouponInfo({
                ...couponInfo,
                discountPercentage: e.target.value,
              })
            }
          />}
        </div>
        <div className="form-group">
          <input
            required
            type="number"
            step={1}
            min={1}
            placeholder="Validity (in Days)"
            value={couponInfo.validity}
            onChange={(e) =>
              setCouponInfo({ ...couponInfo, validity: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <input
            required
            type="number"
            placeholder="Min Amount To Apply Coupn"
            step={1}
            min={1}
            value={couponInfo.minamount}
            onChange={(e) =>
              setCouponInfo({ ...couponInfo, minamount: e.target.value })
            }
          />
        </div>
        { ischeck==1 &&  <div className="form-group">
          <input
            required
            type="number"
            step={1}
            min={1}
            placeholder="Upto Amount"
            value={couponInfo.maxamount}
            onChange={(e) =>
              setCouponInfo({ ...couponInfo, maxamount: e.target.value })
            }
          /> 
        </div>} 
            
        {/* File Input for Poster Image */}
        <div className="form-group">
          <label htmlFor="posterImage">Poster Image:</label>
          <input
            required
            type="file"
            id="posterImage"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button className="btn btn-b" type="submit">
            {run? "Please Wait" :"Save Coupon"}
          </button>
        </div>
      </form>
          <hr /><br />
      <h2>Availabel Coupens</h2>
      <div>
            {coupens && coupens.map((c)=>{
              const timestamp = new Date(c.date);
              const currentDate = new Date();
              const timeDifference = timestamp - currentDate;
              const diff= Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
              const days = c.days-diff;
              return <div style={{border:'2px solid orange'}}>
                <h3>{c.Name}</h3>
                <img src={`${url}/${c.img}`} alt="" />
                {c.isPercentage==1 ? <p> Amount:  {c.amount}%  </p> : <p>Coupen Amount: ₹{c.amount}</p>}
                {c.isPercentage==1 && <p>Get Upto: ₹{c.maxamount}</p>}
                <p>Min Amount To Apply Coupen: ₹{c.minamount}  </p>
                <p>CoupenCode: {c.code}</p>
                <p>Status: {c.isOn ? "On": "Off" } </p>
                <p>Expire In : {days} Days </p>
                <p>Coupen Add Date: {getDate(c.date)} </p>
                <button onClick={()=>OnOffCoupen(c)} style={{width:'200px'}} className="btn btn-o">{!c.isOn? "On":"Off"} Coupon</button>
                <button onClick={()=>DeleteCoupen(c.Cid)} style={{width:'200px'}} className="btn btn-o">Delete</button>
              </div>
            }) }
      </div>
    </div>
  );
}

export default ManageCoupon;
