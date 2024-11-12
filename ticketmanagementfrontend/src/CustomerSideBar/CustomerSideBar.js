import React, { useEffect, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import logo from "../images/Savy (1).png";
import "./CustomerSideBar.css";

const CustomerSideBar = ({ isCollapsed, toggleSidebar, onMenuClick }) => {
  const [userdata, setUserdata] = useState({
    firstname: "",
    lastname: "",
    image: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    setUserdata(userData);
  }, []);

  return (
    <div
      className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
      onClick={toggleSidebar}
    >
      <div className="sidebar-content">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
          {!isCollapsed && <h2 className="sidebar-title">User Panel</h2>}
        </div>
        <ul className="sidebar-menu">
          <li
            className="sidebar-item"
            onClick={() => onMenuClick("/customermain")}
          >
            <HomeOutlinedIcon />
            {!isCollapsed && <span className="item-label">Home</span>}
          </li>
          <li
            className="sidebar-item"
            onClick={() => onMenuClick("/customermain/raisetickets")}
          >
            <PeopleOutlinedIcon />
            {!isCollapsed && <span className="item-label">Raise Ticket</span>}
          </li>
          <li className="sidebar-item">
            <ContactsOutlinedIcon />
            {!isCollapsed && <span className="item-label">Contacts</span>}
          </li>
          <li className="sidebar-item">
            <ReceiptOutlinedIcon />
            {!isCollapsed && <span className="item-label">Profile</span>}
          </li>
          <li className="sidebar-item">
            <HelpOutlineOutlinedIcon />
            {!isCollapsed && <span className="item-label">FAQ</span>}
          </li>
          <li>
            {!isCollapsed && (
              <div className="profile-container sidebar-item">
                <img
                  alt="profile-pic"
                  className="profile-picture"
                  src={`http://localhost:8003/uploads/${userdata.image}`}
                />
                <span className="profile-name">
                  {userdata.firstname} {userdata.lastname}
                </span>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomerSideBar;
