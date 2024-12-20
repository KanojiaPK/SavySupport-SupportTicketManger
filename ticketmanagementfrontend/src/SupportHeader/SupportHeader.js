import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SupportHeader.css";

const SupportHeader = ({ isSidebarCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopover, setShowPopover] = useState(false);

  const searchAndHighlight = (query) => {
    const bodyText = document.body.innerText;
    const searchIndex = bodyText.toLowerCase().indexOf(query.toLowerCase());

    if (searchIndex === -1) {
      return false;
    }

    const range = document.createRange();
    const selection = window.getSelection();
    selection.removeAllRanges();

    // Find the node and offset of the search index
    let currentNode = document.body;
    let offset = searchIndex;

    while (currentNode && offset >= 0) {
      if (currentNode.nodeType === Node.TEXT_NODE) {
        if (currentNode.textContent.length > offset) {
          range.setStart(currentNode, offset);
          range.setEnd(currentNode, offset + query.length);
          selection.addRange(range);
          break;
        } else {
          offset -= currentNode.textContent.length;
        }
      }
      currentNode = currentNode.nextSibling;
    }

    if (currentNode) {
      currentNode.scrollIntoView({ behavior: "smooth", block: "center" });
      return true;
    }

    return false;
  };

  const handleSearch = () => {
    if (searchQuery === "raise tickets") {
      navigate("/customermain/raisetickets");
    } else if (searchQuery === "someotherpage") {
      navigate("/customermain/someotherpage");
    } else {
      const found = searchAndHighlight(searchQuery);
      if (!found) {
        setShowPopover(true);
        setTimeout(() => setShowPopover(false), 3000); // Hide popover after 3 seconds
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="z-30 flex items-center justify-between w-auto p-4 text-white headerCustomer my-9">
      <div className="flex items-center justify-start">
        <div className="relative flex">
          <input
            type="search"
            placeholder="Search"
            className="w-[56rem] h-10 pl-4 pr-10 transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black relative"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />

          <lord-icon
            src="https://cdn.lordicon.com/unukghxb.json"
            trigger="hover"
            colors="primary:#dd335c,secondary:#dd335c"
            style={{ width: "79px", height: "38px" }}
            onClick={handleSearch}
          ></lord-icon>
          {showPopover && (
            <div className="bg-[#dd335b7d] popover w-fit rounded-lg p-4 flex justify-center absolute top-10">
              <lord-icon
                src="https://cdn.lordicon.com/usownftb.json"
                trigger="in"
                delay="100"
                stroke="bold"
                state="in-reveal"
                colors="primary:#ffff00,secondary:#ffff00"
                style={{ width: "36px", height: "32px" }}
              ></lord-icon>
              <p className="w-auto h-5 mt-1">Not found</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="relative" onClick={toggleSidebar}>
          <lord-icon
            src="https://cdn.lordicon.com/vspbqszr.json"
            trigger="hover"
            colors="primary:#dd335c"
            className="lordIconsclass"
            style={{ width: "38px", height: "38px" }}
          ></lord-icon>
        </div>
        <button className="mr-4" onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-log-out"
            style={{ width: "58px", height: "35px", color: "#dd335c" }}
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default SupportHeader;
