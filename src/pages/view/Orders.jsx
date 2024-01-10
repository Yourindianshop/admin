import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../App'
import {useNavigate} from 'react-router-dom'
import { fetchreq, getDate } from '../../Helper/fetch';

function Orders() {
    const {isLogin}=useContext(MyContext);
    const nav = useNavigate();
    const [orders,setOrders]=useState(null);
    const getOrders =async ()=>{
        const res = await fetchreq("GET","getallOrders",{});
        res?setOrders(res.result):setOrders([]);
    }
    const url = process.env.REACT_APP_URL;
    useEffect(()=>{
        if(!isLogin){
            nav('/');
        }else{
            getOrders();
        }
    },[])
  return (
    <div style={{overflowY:'scroll',height:'100dvh'}}>
      Customer Orders
      {orders && orders.map((o)=><div style={{border:'1px solid black',display:'flex',gap:'20px',justifyContent:'space-around',alignItems:'center'}}>
        <div style={{display:'flex',gap:'20px'}}>
            <img width="150px" src={`${url}/${o.Images[0]}`} loading='lazy' />
            <div>
                <h4>OrderId: {o.Oid}</h4>
                <p>ProductId: {o.Pid}</p>
                <p>CustomerId: {o.Cid}</p>
                <p>Product Name: {o.Name}</p>
                <h4 style={{color:'green'}}>Order Price: ₹{o.Price} paid </h4>
                <p>Time: {getDate(o.time)}</p>
            </div>
        </div>
        <button style={{width:'200px'}} className='btn btn-b'>View More</button>
      </div>)}
    </div>
  )
}

export default Orders
