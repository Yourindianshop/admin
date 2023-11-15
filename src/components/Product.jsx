import React, { useState } from "react";
import "../stylesheet/Product.css";
import { fetchreq } from "../Helper/fetch";
const Product = (props) => {
  const {product}=props;
  const [unlist,setUnlist]=useState(product.Unlist);
  async function deleteproduct(){
    const dt = await fetchreq("GET",`${unlist?"":"un"}listProduct/${product.Pid}`,{}); 
    if(dt){
      setUnlist(!unlist);
    }else{
      alert("something went wrong")
    }
  }
  return (
    <div id="prod">
      <div className="proTop">
        <img src={props.proImg} alt="" />
      </div>
      <div id="proData">
        <div className="proName">{props.proName}</div>
        <div className="proPrice">{props.proPrice}</div>
        <div>Availabel Stock: {product.Available}</div>
        <div>Status: {unlist? "Unlist": "Listed"}</div>
        <div>{props.proDes}</div>
      </div>
      <div className="atc">
        {/* <div className="btn btn-y">Edit</div> */}
        <div className="btn btn-r" onClick={deleteproduct}>{unlist? "List":"Unlist"} Item</div>
      </div>
    </div>
  );
};

export default Product;
