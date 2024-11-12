import React, { useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
// import CustomerHeader from "../CustomerHeader/CustomerHeader";
// import CustomerSideBar from "../CustomerSideBar/CustomerSideBar";
// import CustomerDashBoard from "../CustomerDashboard/CustomerDashBoard";
// import CustomerRaiseTickets from "../CustomerRaiseTickets/CustomerRaiseTickets";
import { motion } from "framer-motion";
import "./SupportMain.css";
// import CustomerSubmited from "../CustomerSubmited/CustomerSubmited";
import SupportTicketUpdate from "../SupportTicketUpdate/SupportTicketUpdate";

import SupportSidebar from "../SupportSidebar/SupportSidebar";
import SupportHeader from "../SupportHeader/SupportHeader";
import SupportDashboard from "../SupportDashboard/SupportDashboard";

const SupportMain = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <motion.section
      className="h-full bg-gray-950"
      style={{
        backgroundImage:
          "radial-gradient(125% 125% at 50% 0%, #020617 50%, #DD335c)",
      }}
    >
      {!location.pathname.startsWith("/supportmain/SupportTicketUpdate") &&
        !location.pathname.endsWith("/ticketsubmitted") && (
          <SupportHeader
            isSidebarCollapsed={isSidebarCollapsed}
            toggleSidebar={toggleSidebar}
          />
        )}
      <div className="flex h-full">
        <SupportSidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
          onMenuClick={handleMenuClick}
        />
        <div
          className={`flex-grow p-4 main-content ${
            isSidebarCollapsed ? "collapsed" : ""
          }`}
        >
          <Routes>
            <Route path="/" element={<SupportDashboard />} />
            {/* <Route
              path="raisetickets"
              element={
                <CustomerRaiseTickets isSidebarCollapsed={isSidebarCollapsed} />
              }
            />
            <Route
              path="ticketsubmitted"
              element={
                <CustomerSubmited isSidebarCollapsed={isSidebarCollapsed} />
              }
            />*/}

            <Route
              path="SupportTicketUpdate/:ticketId"
              element={
                <SupportTicketUpdate isSidebarCollapsed={isSidebarCollapsed} />
              }
            />
          </Routes>
        </div>
      </div>
    </motion.section>
  );
};

export default SupportMain;
