import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ticketopen from "../images/ticketopen.svg";
import ticketclosed from "../images/ticketclosed.svg";
import ticketinprogress from "../images/ticketinprogress.svg";
import apiUrl from "../utils/apiURL";

const SupportTicketAdvance = ({ ticket, setTicket }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(ticket);

  const maxDescriptionLength = 26;

  const truncateDescription = (description, maxDescriptionLength) => {
    return description.length <= maxDescriptionLength
      ? description
      : description.substring(0, maxDescriptionLength) + "...";
  };

  const getStatusIcon = (status) => {
    if (!status) return null;
    switch (status.toLowerCase()) {
      case "open":
        return (
          <img
            src={ticketopen}
            alt="open ticket icon"
            className="h-[78px] ml-[17px]"
            onClick={(e) => {
              e.stopPropagation();
              setIsStatusModalOpen(true);
            }}
          />
        );
      case "closed":
        return (
          <img
            src={ticketclosed}
            alt="closed ticket icon"
            className="h-[78px] ml-[17px]"
            onClick={(e) => {
              e.stopPropagation();
              setIsStatusModalOpen(true);
            }}
          />
        );
      case "inprogress":
        return (
          <img
            src={ticketinprogress}
            alt="inprogress ticket icon"
            className="h-[78px] ml-[17px]"
            onClick={(e) => {
              e.stopPropagation();
              setIsStatusModalOpen(true);
            }}
          />
        );
      default:
        return null;
    }
  };

  const getPriorityColor = (priority) => {
    if (!priority) return "#00ffff"; // Default color for missing priority
    switch (priority.toLowerCase()) {
      case "high":
        return "#FF0000"; // Red for high priority
      case "medium":
        return "#FFFF00"; // Yellow for medium priority
      case "low":
        return "#00FF00"; // Green for low priority
      default:
        return "#ffffff"; // Fallback color
    }
  };

  const handleAssignTicket = async () => {
    try {
      setIsLoading(true);
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData._id;

      const response = await axios.put(
        `${apiUrl}/api/v1/tickets/update-ticket/${ticket.data._id}`,
        JSON.stringify({ assignedagent: userId }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setIsModalOpen(false);

        const ticketResponse = await axios.get(
          `${apiUrl}/api/v1/tickets/get-ticket/${ticket.data._id}`
        );

        if (ticketResponse.status === 200) {
          setTicket(ticketResponse.data);
        } else {
          console.error("Error fetching updated ticket data");
        }
      } else {
        console.error("Error updating ticket");
        console.log(response);
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnassignTicket = async () => {
    try {
      setIsLoading(true);

      const response = await axios.put(
        `${apiUrl}/api/v1/tickets/update-ticket/${ticket.data._id}`,
        JSON.stringify({ assignedagent: null }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setIsModalOpen(false);

        const ticketResponse = await axios.get(
          `${apiUrl}/api/v1/tickets/get-ticket/${ticket.data._id}`
        );

        if (ticketResponse.status === 200) {
          setTicket(ticketResponse.data);
        } else {
          console.error("Error fetching updated ticket data");
        }
      } else {
        console.error("Error updating ticket");
        console.log(response);
      }
    } catch (error) {
      console.error("Error unassigning ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (status) => {
    try {
      setIsLoading(true);

      const response = await axios.put(
        `${apiUrl}/api/v1/tickets/update-ticket/${ticket.data._id}`,
        JSON.stringify({ status }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setIsStatusModalOpen(false);

        const ticketResponse = await axios.get(
          `${apiUrl}/api/v1/tickets/get-ticket/${ticket.data._id}`
        );

        if (ticketResponse.status === 200) {
          setTicket(ticketResponse.data);
        } else {
          console.error("Error fetching updated ticket data");
        }
      } else {
        console.error("Error updating ticket status");
        console.log(response);
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Header Row */}
      <div className="grid grid-cols-10 gap-4 p-2 font-bold text-center text-white border-b border-gray-300">
        <div className="whitespace-nowrap">Ticket ID</div>
        <div className="whitespace-nowrap">Subject</div>
        <div className="whitespace-nowrap">Age</div>
        <div className="whitespace-nowrap">Created By</div>
        <div className="whitespace-nowrap">Updated By</div>
        <div className="whitespace-nowrap">Updated Date</div>
        <div className="whitespace-nowrap">Status</div>
        <div className="whitespace-nowrap">Priority</div>
        <div className="whitespace-nowrap">Agent</div>
        <div className="whitespace-nowrap">Description</div>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="relative p-6 bg-[#0000007d]  w-[24%] rounded-lg">
            <button
              className="absolute top-2 right-2 text-[white] font-bold  "
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
            <h2 className="mb-4 text-xl font-bold text-[white]">
              {ticket.data.assignedagent
                ? "Unassign or Reassign This Ticket"
                : "Assign This Ticket To Yourself"}
            </h2>
            {ticket.data.assignedagent && (
              <button
                onClick={handleUnassignTicket}
                className="px-4 py-2 mb-2 bg-red-500 rounded-lg text-[white]"
                disabled={isLoading}
              >
                {isLoading ? "Unassigning..." : "Unassign"}
              </button>
            )}
            <button
              onClick={handleAssignTicket}
              className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Assigning..." : "Assign"}
            </button>
          </div>
        </div>
      )}

      {isStatusModalOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="relative p-6  bg-[#0000007d] rounded-lg ">
            <button
              className="absolute top-2 right-2 text-[white] font-bold "
              onClick={() => setIsStatusModalOpen(false)}
            >
              X
            </button>
            <h2 className="mb-4 text-xl font-bold text-white">
              Update Ticket Status
            </h2>
            <button
              onClick={() => handleStatusChange("open")}
              className="px-4 py-2 mb-2 text-white bg-green-500 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Mark as Open"}
            </button>
            <button
              onClick={() => handleStatusChange("closed")}
              className="px-4 py-2 mb-2 ml-2 text-white bg-red-500 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Mark as Closed"}
            </button>
            <button
              onClick={() => handleStatusChange("inprogress")}
              className="px-4 py-2 ml-2 text-white bg-yellow-500 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Mark as In Progress"}
            </button>
          </div>
        </div>
      )}

      <motion.div
        key={ticket.data._id}
        className="relative grid grid-cols-10 gap-4 p-4 mt-4 rounded-lg bg-[#07070787] text-[aliceblue] items-center text-center cursor-pointer"
        whileHover={{
          boxShadow: "0 0 30px #020617b3",
          transition: { duration: 0.3 },
        }}
        initial={{ backgroundColor: "#07070787" }}
        animate={{ backgroundColor: "#07070787" }}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="text-[aliceblue]">
          {ticket.data.ticketCode || "N/A"}
        </div>
        <div className="text-[aliceblue] hover:text-red-700">
          {ticket.data.title || "N/A"}
        </div>
        <div className="text-[aliceblue] hover:text-blue-500">
          {ticket.data.ageInDays ? `${ticket.data.ageInDays} d` : "N/A"}
        </div>
        <div className="text-[aliceblue]">
          {ticket.data.owner?.firstname
            ? `${ticket.data.owner.firstname} ${ticket.data.owner.lastname}`
            : "N/A"}
        </div>
        <div className="text-[aliceblue]">
          {ticket.data.updatedby === "NA" ? (
            <lord-icon
              src="https://cdn.lordicon.com/aycieyht.json"
              trigger="hover"
              colors="primary:#dd335c,secondary:#08a88a"
              style={{ width: "50px", height: "44px" }}
            ></lord-icon>
          ) : (
            ticket.data.updatedby || "N/A"
          )}
        </div>

        <div className="text-[aliceblue]">
          {ticket.data.updated !== null ? (
            new Date(ticket.data.updated).toLocaleDateString()
          ) : (
            <lord-icon
              src="https://cdn.lordicon.com/qvyppzqz.json"
              trigger="hover"
              style={{ width: "50px", height: "35px" }}
              colors="primary:#dd335c,secondary:#dd335c"
            ></lord-icon>
          )}
        </div>

        <div className="text-[aliceblue]">
          {getStatusIcon(ticket.data.status)}
        </div>
        <div className="text-[#dd335c]">
          <span
            className="inline-block w-4 h-4 rounded-full"
            style={{ backgroundColor: getPriorityColor(ticket.data.priority) }}
          ></span>
        </div>
        <div className="text-[aliceblue]">
          {ticket.data.assignedagent ? (
            <div className="text-[aliceblue]">
              {`${ticket.data.assignedagent?.firstname || "N/A"} ${
                ticket.data.assignedagent?.lastname || "N/A"
              }`}
            </div>
          ) : (
            <button
              className="text-[aliceblue] focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              <lord-icon
                src="https://cdn.lordicon.com/bgebyztw.json"
                trigger="hover"
                state="hover-looking-around"
                colors="primary:#dd335c,secondary:#dd335c"
                style={{ width: "50px", height: "37px" }}
              ></lord-icon>
            </button>
          )}
        </div>

        <div className="truncate-description text-[aliceblue]">
          {truncateDescription(
            ticket.data.explainproblem || "No description",
            maxDescriptionLength
          )}
        </div>
      </motion.div>
    </>
  );
};

export default SupportTicketAdvance;
