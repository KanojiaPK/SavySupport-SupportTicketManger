// App.js

import { Routes, Route, useLocation } from "react-router-dom";
import HeaderMain from "./HeaderMain/HeaderMain";
import RegistrationMain from "./RegistrationMain/RegistrationMain";
import HomeMain from "./HomeMain/HomeMain";
import LoginMain from "./LoginMain/LoginMain";
import { Provider } from "react-redux";
import store from "./store/store";
import CustomerMain from "./CustomerMain/CustomerMain";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { motion } from "framer-motion";
import SupportMain from "./SupportMain/SupportMain";

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

function App() {
  const { pathname } = useLocation();
  const hideHeader =
    pathname === "/login" ||
    pathname === "/registration" ||
    pathname === "/customermain/CustomerTicketUpdate" ||
    pathname === "/customermain/ticketsubmitted" ||
    pathname.startsWith("/customermain") ||
    pathname.startsWith("/supportmain");

  return (
    <Provider store={store}>
      <div className="App">
        <motion.section
          className="h-full bg-gray-950"
          style={{
            backgroundImage:
              "radial-gradient(125% 125% at 50% 0%, #020617 50%, #DD335c)",
          }}
        >
          {!hideHeader && <HeaderMain />}
          <Routes>
            <Route path="/" element={<HomeMain />} />
            <Route path="/registration" element={<RegistrationMain />} />
            <Route path="/login" element={<LoginMain />} />
            <Route path="/customermain/*" element={<CustomerMain />} />
            <Route path="/supportmain/*" element={<SupportMain />} />
          </Routes>
        </motion.section>
      </div>
    </Provider>
  );
}

export default App;
