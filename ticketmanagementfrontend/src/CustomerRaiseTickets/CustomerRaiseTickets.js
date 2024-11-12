import React from "react";
import "./CustomerRaiseTickets.css";
import CustomerForm from "../CustomerForm/CustomerForm";

const CustomerRaiseTickets = ({ isSidebarCollapsed }) => {
  return (
    <div
      className={`flex-grow p-4 main-content2 my-4 ${
        isSidebarCollapsed ? "collapsed" : ""
      }`}
    >
      <section className="relative w-auto top-39">
        <div className="h-10 text-white w-90">
          <ul className="relative flex flex-row justify-around gap-5 px- step-list">
            <li className="step-item">
              <span className="step-text">Describe Problem</span>
              <div className="circle-container">
                <div className="line left"></div>
                <div className="circle"></div>
                <div className="line right"></div>
              </div>
            </li>
            <li className="step-item">
              <span className="step-text">Provide Details</span>
              <div className="circle-container">
                <div className="line left"></div>
                <div className="circle"></div>
                <div className="line right"></div>
              </div>
            </li>
            <li className="step-item">
              <span className="step-text">Review Help</span>
              <div className="circle-container">
                <div className="line left"></div>
                <div className="circle"></div>
                <div className="line right"></div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <p className="flex justify-center my-20 text-2xl font-bold text-white">
          Hi Prince, What do you need help with
        </p>

        <div>
          <CustomerForm></CustomerForm>
        </div>
      </section>
    </div>
  );
};

export default CustomerRaiseTickets;
