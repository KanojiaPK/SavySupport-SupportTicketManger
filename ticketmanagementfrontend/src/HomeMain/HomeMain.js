import React, { useState } from "react";

import underlined from "../images/underline.png";
import logo1 from "../images/companyLogo1.svg";
import logo2 from "../images/companyLogo2.svg";
import logo3 from "../images/companyLogo3.svg";
import logo4 from "../images/companyLogo4.svg";
import logo5 from "../images/companyLogo5.svg";
import logo6 from "../images/companyLogo6.svg";
import logo7 from "../images/companyLogo7.svg";
import logo8 from "../images/companyLogo8.svg";

import FooterMain from "../FooterMain/FooterMain";

const HomeMain = () => {
  const [demoButtonHover, setDemoButtonHover] = useState(false);

  return (
    <>
      <div className="container flex items-center justify-center w-100% h-auto px-3 m-auto mt-20">
        <div className="flex flex-col items-center gap-5">
          <ul className="flex h-10 gap-7">
            <li className="flex items-center rounded-[20px] bg-[#dd335c] ">
              <p className="flex items-center gap-2 px-3 text-white">
                <lord-icon
                  src="https://cdn.lordicon.com/cgzlioyf.json"
                  trigger="hover"
                  stroke="bold"
                  state="hover-loading"
                  colors="primary:white"
                  style={{ width: "35px", height: "100px" }}
                ></lord-icon>
                Data security and GDPR compliance
              </p>
            </li>
            <li className="flex items-center bg-[#dd335c] rounded-[20px] text-white">
              <p className="flex items-center gap-2 px-3">
                <lord-icon
                  src="https://cdn.lordicon.com/cgzlioyf.json"
                  trigger="hover"
                  stroke="bold"
                  state="hover-loading"
                  colors="primary:white"
                  style={{ width: "35px", height: "100px" }}
                ></lord-icon>
                24/7/365 support
              </p>
            </li>
          </ul>
          <div>
            <h1 className="font-bold text-center text-white text-70px ">
              The{" "}
              <span className="relative">
                {" "}
                Easiest{" "}
                <img
                  src={underlined}
                  alt="Underlined green"
                  className="absolute  bottom-[-14px] left-0 w-full h-5 "
                />
              </span>
              Support Desk System <br /> For A Team Like Yours
            </h1>
            <p className="text-center text-white text-28px ">
              Manage all your customer messages in one place with the power of
              AI.
              <br />
              Build better bonds automatically.
            </p>
            <div className="flex flex-row justify-center gap-3 my-2 mt-10 text-lg">
              <button
                className={`w-24 h-10 rounded-[20px] ${
                  !demoButtonHover
                    ? "bg-[#dd335c] text-white"
                    : "bg-white text-[#dd335c]"
                } border border-red-600 transition-colors duration-300`}
              >
                Sign Up
              </button>
              <button
                className={`px-2 rounded-[20px] ${
                  demoButtonHover
                    ? "bg-[#dd335c] text-white"
                    : "bg-white text-[#dd335c]"
                } hover:bg-[#dd335c] hover:text-white border border-red-600 transition-colors duration-300`}
                onMouseEnter={() => setDemoButtonHover(true)}
                onMouseLeave={() => setDemoButtonHover(false)}
              >
                View Demo
              </button>
            </div>
            <ul className="relative flex flex-row justify-center gap-5 my-3 mt-6 text-white ">
              <li className="items-center text-15px">✔ Free 14-day trial</li>
              <li className="items-center text-15px">
                ✔ No credit card required
              </li>
              <li className="items-center text-15px">✔ 5-minute setup</li>
            </ul>
            <p className="flex justify-center p-2 mt-[14rem] font-bold text-white text-20px ">
              Trusted by 7,000+ customer success experts
            </p>
            <ul className="z-10 flex flex-row justify-center gap-10">
              <li>
                <img src={logo1} alt="company1" />
              </li>
              <li>
                <img src={logo2} alt="company2" />
              </li>
              <li>
                <img src={logo3} alt="company3" />
              </li>
              <li>
                <img src={logo4} alt="company4" />
              </li>
              <li>
                <img src={logo5} alt="company5" />
              </li>
              <li>
                <img src={logo6} alt="company6" />
              </li>
              <li>
                <img src={logo7} alt="company7" />
              </li>
              <li>
                <img src={logo8} alt="company8" />
              </li>
            </ul>
            <section className="mt-20 text-lg text-white body-font">
              <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col w-full mb-20 text-center ">
                  <h1 className="mb-4 text-2xl font-bold text-white sm:text-3xl title-font">
                    What makes Savy Support stand out?
                  </h1>
                  <p className="mx-auto text-base leading-relaxed lg:w-2/3 text-[20px]">
                    Solve all customer cases at the service desk, enabling
                    effortless, high-quality, and secure assistance.
                  </p>
                </div>
                <div className="flex flex-wrap -m-4 text-center">
                  <div className="w-full p-8 md:w-1/3 sm:w-1/2">
                    <div className="flex flex-col items-center justify-center h-full px-8 py-10 border-2 border-gray-200 rounded-lg hover:">
                      <lord-icon
                        src="https://cdn.lordicon.com/rmjnvgsm.json"
                        trigger="hover"
                        colors="primary:#dd335c,secondary:#dd335c"
                        style={{ width: "184px", height: "250px" }}
                      ></lord-icon>
                      <h2 className="mb-4 text-3xl font-medium text-center text-white title-font">
                        Intuitive solution
                      </h2>
                      <p className="leading-relaxed text-center">
                        Savy Support boasts an exceptionally user-friendly
                        interface and workflow, making it easy for your team to
                        navigate it. You don't need extensive training or
                        technical expertise to get started.
                      </p>
                    </div>
                  </div>
                  <div className="w-full p-8 md:w-1/3 sm:w-1/2">
                    <div className="flex flex-col items-center justify-center h-full px-8 py-10 border-2 border-gray-200 rounded-lg shadow-lg">
                      <lord-icon
                        src="https://cdn.lordicon.com/ysonqgnt.json"
                        trigger="hover"
                        colors="primary:#dd335c,secondary:#dd335c"
                        style={{ width: "184px", height: "250px" }}
                      ></lord-icon>
                      <h2 className="mb-4 text-3xl font-medium text-center text-white title-font">
                        Productivity growth
                      </h2>
                      <p className="leading-relaxed text-center">
                        SavySupport maximizes agent output with automation, AI
                        features, or customizable ticket views. Route tickets to
                        the right experts and handle even more cases without
                        compromising service quality.
                      </p>
                    </div>
                  </div>
                  <div className="w-full p-8 md:w-1/3 sm:w-1/2">
                    <div className="flex flex-col items-center justify-center h-full px-8 py-10 border-2 border-gray-200 rounded-lg shadow-lg">
                      <lord-icon
                        src="https://cdn.lordicon.com/vistbkts.json"
                        trigger="hover"
                        colors="primary:#dd335c,secondary:#dd335c"
                        style={{ width: "184px", height: "250px" }}
                      ></lord-icon>
                      <h2 className="mb-4 text-3xl font-medium text-center text-white title-font">
                        Safety and full control
                      </h2>
                      <p className="leading-relaxed text-center">
                        SavySupport offers robust security features, including
                        role-based access controls, encryption, and regular data
                        backups, ensuring that your sensitive data remains safe
                        at all times.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <FooterMain />
    </>
  );
};

export default HomeMain;
