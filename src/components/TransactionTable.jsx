import React, { useEffect, useState } from "react";
import { fetchreq, getDate } from "../Helper/fetch";

const TransactionTable = ({cid}) => { 
  const [transaction,setTransaction]=useState(null);

  const getData = async ()=>{
    const dt = await fetchreq("GET","getTransaction",{});
    dt?setTransaction(dt.result):setTransaction(null);
  }
  const getData2 = async ()=>{
    const dt = await fetchreq("GET",`getTransaction/${cid}`,{});
    dt?setTransaction(dt.result):setTransaction(null);
  }
  useEffect(()=>{
    !cid?getData():getData2();
  },[])
  return (
    <div className="customer-table-container dispatch-request-container product-acceptance-container">
     
         <p> note: Green color indicates that amount is paid To Admin OtherWise it just added in Customers Wallete;</p>
      <table className="customer-table">
        
        <thead>
          <tr>
            <th>TId</th>
            {!cid && <th>Customer Id</th>}
            <th>Amount</th>
            <th>note</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transaction && transaction.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.Tid}</td>
              {!cid && <td>{customer.email}</td>}
              <td className={`${customer.amount<0?"btn-g":""}`}>{Math.abs(customer.amount)}</td>
              <td>{customer.note}</td>
              <td>{getDate( customer.time)}</td>
              <td>Paid</td>
            </tr>
          ))}
          {!transaction && <p>Loading...</p> }
          {transaction && transaction.length==0 && <p>No data found...</p> }
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable