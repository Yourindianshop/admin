import React, { useContext, useEffect, useState } from 'react'
import { fetchreq } from '../Helper/fetch'
import Product from './Product'
import {useNavigate} from 'react-router-dom'
import {MyContext} from  '../App'

function AvailableProduct() {
  const [products,setProducts]=useState([]);
  const url = process.env.REACT_APP_URL;
  const { isLogin}=useContext(MyContext);
  const nav = useNavigate()
  const getProduct = async ()=>{
    const dt = await fetchreq("GET","Products",{});
    setProducts(dt.result);
  }
  useEffect(()=>{
    if(isLogin){
      getProduct();
    }else{
      nav("/");
    }
  },[])
  return (
    <div id="shop-sec">
      <div id="the-gym">
        <div id="l-title">
          <div className="plan-page-title">
            <span id="wt">Available&nbsp;</span>
            <span id="org">Products</span>
          </div>
        </div>
      </div>

      <div id="displayProducts">
        {products.map((p, e) => {
          const photo = (p.Images);
          
          return (
            <Product
              // proImg={`./imgs/btt${e}.webp`}
              proImg={`${url}/${photo[0]}`}
              proName={p.Name}
              proPrice={` ₹${p.Price}`}
              proDes={p.Details}
              product = {p}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AvailableProduct
