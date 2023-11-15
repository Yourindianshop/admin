import React, { useEffect, useState } from "react";
import { fetchreq, getDate } from "../Helper/fetch";
import { useContext } from "react";
import { MyContext } from "../App";
import {useNavigate} from "react-router-dom"

const CustomerTable = () => {
  const customerData=[]
  const [filteredData, setFilteredData] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [warehouseFilter, setWarehouseFilter] = useState("All"); // New filter state
  const [customer,setCustomer]=useState([]);
  const {setUser,user}=useContext(MyContext);
  const nav = useNavigate();

  // Function to handle type filter change
  const handleTypeFilterChange = (e) => {
    const newTypeFilter = e.target.value;
    setTypeFilter(newTypeFilter);

    // Filter the data based on type
    const filteredByType = customerData.filter(
      (customer) => newTypeFilter === "All" || customer.type === newTypeFilter
    );

    // Apply other filters on the newly filtered data
    const finalFilteredData = applyFilters(filteredByType);

    setFilteredData(finalFilteredData);
  };
  const handleWarehouseFilterChange = (e) => {
    const newWarehouseFilter = e.target.value;
    setWarehouseFilter(newWarehouseFilter);

    // Filter the data based on warehouse ID
    const filteredByWarehouse = customerData.filter(
      (customer) =>
        newWarehouseFilter === "All" ||
        customer.warehouseId === newWarehouseFilter
    );

    // Apply other filters on the newly filtered data
    const finalFilteredData = applyFilters(filteredByWarehouse);

    setFilteredData(finalFilteredData);
  };
  // Function to handle plan filter change
  const handlePlanFilterChange = (e) => {
    const newPlanFilter = e.target.value;
    setPlanFilter(newPlanFilter);

    // Filter the data based on plan
    const filteredByPlan = customerData.filter(
      (customer) => newPlanFilter === "All" || customer.plan === newPlanFilter
    );

    // Apply other filters on the newly filtered data
    const finalFilteredData = applyFilters(filteredByPlan);

    setFilteredData(finalFilteredData);
  };
  // Function to handle status filter change
  const handleStatusFilterChange = (e) => {
    const newStatusFilter = e.target.value;
    setStatusFilter(newStatusFilter);

    // Filter the data based on status
    const filteredByStatus = customerData.filter(
      (customer) =>
        newStatusFilter === "All" || customer.status === newStatusFilter
    );

    // Apply other filters on the newly filtered data
    const finalFilteredData = applyFilters(filteredByStatus);

    setFilteredData(finalFilteredData);
  };
  // Function to apply all filters
  const applyFilters = (data) => {
    let filteredData = data;

    // Apply type filter
    if (typeFilter !== "All") {
      filteredData = filteredData.filter(
        (customer) => customer.type === typeFilter
      );
    }

    // Apply plan filter
    if (planFilter !== "All") {
      filteredData = filteredData.filter(
        (customer) => customer.plan === planFilter
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filteredData = filteredData.filter(
        (customer) => customer.status === statusFilter
      );
    }

    return filteredData;
  };

  const getData = async ()=>{
    const dt = await fetchreq("GET","getCustomer",{});
    dt?setCustomer(dt.result):setCustomer(null);
  }
  const viewMore = async (c)=>{
    setUser(c);
    nav("/CustomerDetails");
  }
  useEffect(()=>{
    getData();
    setUser(null);
  },[])
  return (
      <div className="customer-table-container dispatch-request-container product-acceptance-container">
        <div style={{display:'none'}} className="filters" >
          <div className="filter-title">Filter</div>
          <div className="filter-tab">
            <div className="filter-item">
              <label>Type:</label>
              <select value={typeFilter} onChange={handleTypeFilterChange}>
                <option value="All">All</option>
                <option value="Self">Self</option>
                <option value="Business">Business</option>
              </select>
            </div>{" "}
            <div className="filter-item">
              <label>Warehouse ID:</label>
              <select
                value={warehouseFilter}
                onChange={handleWarehouseFilterChange}
              >
                <option value="All">All</option>
                {/* Include unique warehouse IDs from your data */}
                {Array.from(
                  new Set(customerData.map((customer) => customer.warehouseId))
                ).map((warehouseId) => (
                  <option key={warehouseId} value={warehouseId}>
                    {warehouseId}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-item">
              <label>Plan:</label>
              <select value={planFilter} onChange={handlePlanFilterChange}>
                <option value="All">All</option>
                <option value="Free">Free</option>
                <option value="Half Yearly">Half Yearly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>
        </div>
        <table className="customer-table">
          <thead>
            <tr>
              <th>CId</th>
              <th>Name</th>
              <th>Type</th>
              {/* <th>City</th>  */}
              <th>Phone No.</th>
              <th>Last Login</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customer && customer.map((customer) => (
              <tr key={customer.id}>
                {/* <td><a href={`mailto:${customer.email}`}>{customer.email}</a></td> */}
                <td>{customer.email}</td>
                <td>{customer.Name}</td>
                <td>self</td>
                {/* <td>{customer.City}</td> */}
                <td>{customer.phoneNo}</td>
                <td>{getDate( customer.Time)}</td>
                <button className="btn-b " onClick={()=>{viewMore(customer)}}>View More</button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default CustomerTable;
