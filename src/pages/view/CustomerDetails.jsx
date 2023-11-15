import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { MyContext } from '../../App'
import { getDate } from '../../Helper/fetch';
import TransactionTable from '../../components/TransactionTable';
import ProductAcceptanceTable from '../../components/ProductAcceptanceTable';
import DispatchRequestTable from '../../components/DispatchRequestTable';

function CustomerDetails() {
    const {user}=useContext(MyContext);
    const [curView,setCurView]=useState(1);
  return (
    <div id="par-cont"  style={{backgroundColor:'unset'}}>
        <h3 style={{color:"white"}}>Customer Details</h3>
        <div style={{display:'flex',justifyContent:'space-around',gap:"20px"}}>
            <button className={`btn btn-${curView==1 ? "o":"b"}`} onClick={()=>{setCurView(1)}}>Customer Info</button>
            <button className={`btn btn-${curView==2 ? "o":"b"}`} onClick={()=>{setCurView(2)}}>Transactions</button>
            <button className={`btn btn-${curView==3 ? "o":"b"}`} onClick={()=>{setCurView(3)}}>Product Acceptace Request</button>
            <button className={`btn btn-${curView==4 ? "o":"b"}`} onClick={()=>{setCurView(4)}}>Dispatch Request</button>
        </div>
        {curView==1 && <div id="par-info">
            <div className="data-field">
                <div className="df-l">Customer Id</div>
                <div className="df-r">{user.email}</div>
            </div>
            <div className="data-field">
                <div className="df-l">Customer Name</div>
                <div className="df-r">{user.Name}</div>
            </div>
            <div className="data-field">
                <div className="df-l">PhoneNo</div>
                <div className="df-r">{user.phoneNo}</div>
            </div>
            {/* <div className="data-field">
                <div className="df-l">Address Line 1</div>
                <div className="df-r">{user.Address}</div>
            </div>
            <div className="data-field">
                <div className="df-l">Address Line 2</div>
                <div className="df-r">{user.Address2}</div>
            </div>
            <div className="data-field">
                <div className="df-l">LandMark</div>
                <div className="df-r">{user.Landmark}</div>
            </div>
            <div className="data-field">
                <div className="df-l">City</div>
                <div className="df-r">{user.City}</div>
            </div>
            <div className="data-field">
                <div className="df-l">Pincode</div>
                <div className="df-r">{user.pincode}</div>
            </div>
            <div className="data-field">
                <div className="df-l">State</div>
                <div className="df-r">{user.State}</div>
            </div>
            <div className="data-field">
                <div className="df-l">Country</div>
                <div className="df-r">{user.Country}</div>
            </div> */}
            <div className="data-field">
                <div className="df-l">Last Login</div>
                <div className="df-r">{getDate(user.Time) }</div>
            </div>
            <div className="data-field">
                <div className="df-l">Wallet Balace</div>
                <div className="df-r">₹{user.Wallete }</div>
            </div>
        </div>}
        {curView==2 && <TransactionTable cid={user.Cid}/> }
        {curView==3 && <ProductAcceptanceTable cid={user.Cid}/> }
        {curView==4 && <DispatchRequestTable cid={user.Cid}/> }
    </div> 
  )
}

export default CustomerDetails