import React, { useState } from "react";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import "../stylesheet/Sidebar.css";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from "react-router-dom";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
const Sidebar = () => {
  const [isCollapsedSidebar, setisCollapsedSidebar] = useState(false);

  const toggleSidebarCollapseHandler = () => {
    setisCollapsedSidebar((prev) => !prev);
    console.log(isCollapsedSidebar);
  };

  return (
    <>
      <aside data-collapse={isCollapsedSidebar}>
        <div id="side_nav">
          <header id="side_header" className="row">
            <span className="sidebar_nav_txt">
              <div className="logo">
                <span id="org">Your</span>
                <img src="./imgs/6.png" height="40px" alt="" />
                <span className="">Shop</span>
              </div>
            </span>
            <button
              className="toggle gray toggle_btn"
              onClick={toggleSidebarCollapseHandler}
            >
              <MenuOpenIcon />
            </button>
          </header>
          <div id="nav_links">
            <div id="link">
              <Link to="/dashboard">
                <span>
                  <DashboardOutlinedIcon />
                </span>
                <b className="sidebar_nav_txt">dashboard</b>
              </Link>
              <small className="sidebar_nav_txt">View List</small>
              <Link to="/product-acceptance">
                <span>
                  <AddBusinessIcon />
                </span>
                <b className="sidebar_nav_txt">Product Acceptance</b>
              </Link>
              <Link to="/dispatch-req">
                <span>
                  <LocalShippingIcon />
                </span>
                <b className="sidebar_nav_txt">Dispatching Items</b>
              </Link>
              <Link to="/assisted-purchase">
                <span>
                  <AddBusinessIcon />
                </span>
                <b className="sidebar_nav_txt">Assisted Purchase Req</b>
              </Link>
              <Link to="/whiteLabeling">
                <span>
                  <AddBusinessIcon />
                </span>
                <b className="sidebar_nav_txt">White Labeling</b>
              </Link>
              <Link to="/customers">
                <span>
                  <LanguageOutlinedIcon />
                </span>
                <b className="sidebar_nav_txt">Customers List</b>   
              </Link>{" "}
              <Link to="/transaction">
                <span>
                  <AddBusinessIcon />
                </span>
                <b className="sidebar_nav_txt">All Transactions</b>
              </Link>{" "}
              <small className="sidebar_nav_txt">Manage</small>
              <Link to="/manage-plan">
                <span>
                  <AddBusinessIcon />
                </span>
                <b className="sidebar_nav_txt">Plans</b>
              </Link>
              
              <Link to="/manage-warehouse">
                <span>
                  <AddBusinessIcon />
                </span>
                <b className="sidebar_nav_txt">Warehouses</b>
              </Link>
              <Link to="/country">
                <span>
                  <AddBusinessIcon />
                </span>
                <b className="sidebar_nav_txt">Countries</b>
              </Link>
              {/* <Link to="/companys">
                <span>
                  <AddBusinessIcon />
                </span>
                <b className="sidebar_nav_txt">Add Affiliated Company</b>
              </Link> */}
              <Link to="/addProduct">
                <span>
                  <AddBusinessIcon />
                </span>
                <b className="sidebar_nav_txt">Products</b>
              </Link>
              <Link to="/ManageCoupens">
                <span>
                  <AddBusinessIcon />
                </span>
                <b className="sidebar_nav_txt">Coupens</b>
              </Link>
              <small className="sidebar_nav_txt">Others</small>
              <Link to="/edit-landing-page">
                <span>
                  <AddBusinessIcon />
                </span>
                <b className="sidebar_nav_txt">Edit Landing Page</b>
              </Link>
              <Link to="/">
                <span>
                  <LogoutOutlinedIcon />
                </span>
                <b className="sidebar_nav_txt">logout</b>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
