import React, { useEffect, useState } from "react";
import PlanCard from "../../components/Plans";
import {fetchreq} from "../../Helper/fetch"

const PlanPage = ({setEdit,setPlanInfo}) => {
  const [plans,setPlans]=useState([]);

  const loadplans = async ()=>{
    const pl = await fetchreq("GET","adminPlans",{});
    pl? setPlans(pl.result): setPlans(null);
  }
  useEffect(()=>{
    loadplans();
  },[]) 
  return (
    <div>
      <center>
        <div className="plan-page-title">
          <span id="blue">Current </span>
          <span id="org">Plan</span>
        </div>
      </center>
      <div id="plan-cards">
        {plans &&  plans.length !=0 && plans.map((plan, index) => (
          <PlanCard
            key={index}
            plan={plan}
            setEdit={setEdit}
            setPlanInfo={setPlanInfo}
          />
        ))}
      </div>
    </div>
  );
};

export default PlanPage;
