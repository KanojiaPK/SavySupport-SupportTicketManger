import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftCircle } from "react-feather";

const CustomerSubmited = () => {
    
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <lord-icon
        src="https://cdn.lordicon.com/aycieyht.json"
        trigger="loop"
        state="loop-flying"
        colors="primary:#dd335c,secondary:#dd335c"
        style={{ width: "250px", height: "250px" }}
      ></lord-icon>
      <div className="mb-4 text-3xl font-semibold">
        Your Ticket Has Been Submitted!
      </div>
      <div className="mb-8 text-2xl">Thank you for reaching out to us</div>
      <div className="mb-8 text-1xl">
        An Agent Will Be Assigned To Your Request Shortly
      </div>

      <div className="flex flex-row gap-2">
        <ArrowLeftCircle className="text-6xl h-[44px]" />
        <Link
          to="/customermain"
          className="px-4 py-2 mr-4 text-lg border border-white rounded-md w- hover:bg-[#dd335c] hover:text-gray-900  hover:border-black"
        >
          Back to Dashboard
        </Link>
      </div>
      <Link
        to="/customermain/raisetickets"
        className="px-4 mr-4 text-lg py-2 mr hover: hover:text-[#dd335c]"
      >
        Continue to Add More Tickets
      </Link>
    </div>
  );
};

export default CustomerSubmited;
