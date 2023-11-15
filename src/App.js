import React from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AssistedPurchase from "./pages/view/AssistedPurchase"
import Dashboard from "./pages/Dashboard"
import Customers from "./pages/view/Customers"
import DisReq from "./pages/view/DisReq"
import SignIn from "./pages/SignIn"
import ProAccReq from "./pages/view/ProAccReq"
import AccRqInfo from "./components/AccRqInfo";
import ManagePlan from "./pages/form/ManagePlan";
import AddToShop from "./pages/form/AddToShop";
import Transaction from './pages/view/Transaction'
import ManageCoupon from "./pages/form/ManageCoupon";
import ManageWarehouse from "./pages/form/ManageWarehouse";
import EditLandingPage from "./pages/form/EditLandingPage";
import { createContext } from "react";
import { useState } from "react";
import Country from "./pages/view/Country";
import Company from "./pages/view/Company";
import CustomerDetails from "./pages/view/CustomerDetails";
import AddProduct from "./pages/view/AddProduct";
import WhiteLabeling from "./pages/view/WhiteLabeling";
export const MyContext = createContext();
const App = () => { 
  const [isLogin,setIsLogin]=useState(false);
  const [admin,setAdmin]=useState(null);
  const [user,setUser]=useState(null);
  return (
    <MyContext.Provider value={{isLogin,setIsLogin,admin,setAdmin,user,setUser}}>
      <Router>
        <div id="app" className="row">
            {isLogin && <Sidebar />}
          <main>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/admin" element={<SignIn />} />
              <Route path="/product-acceptance" element={<ProAccReq/>} />
              <Route path="/par-info" element={
                <AccRqInfo/>
              } />
              <Route path="/customers" element={<Customers/>} />
              <Route path="/addProduct" element={<AddProduct/>} />
              <Route path="/CustomerDetails" element={<CustomerDetails/>} />
              <Route path="/transaction" element={<Transaction/>} />
              <Route path="/dispatch-req" element={<DisReq/>} />
              <Route path="/manage-plan" element={<ManagePlan/>} />
              <Route path="/assisted-purchase" element={<AssistedPurchase/>} />
              <Route path="/add-to-shop" element={<AddToShop/>} />
              <Route path="/manage-coupon" element={<ManageCoupon/>} />
              <Route path="/manage-warehouse" element={<ManageWarehouse/>} />
              <Route path="/edit-landing-page" element={<EditLandingPage/>} />
              <Route path="/ManageCoupens" element={<ManageCoupon/>} />
              <Route path="/country" element={<Country/>} />
              <Route path="/companys" element={<Company/>} />
              <Route path="/whiteLabeling" element={<WhiteLabeling/>} />
            <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
          </main>
        </div>
        {/* <div id="app" className="row">
          <aside>
            <Sidebar />
          </aside>
          <main>
              <Home />
      
          </main>
        </div> */}
      </Router>
    </MyContext.Provider>
  );
};

export default App;
