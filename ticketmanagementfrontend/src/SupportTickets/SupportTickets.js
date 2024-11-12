import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import ticketopen from "../images/ticketopen.svg";
import ticketclosed from "../images/ticketclosed.svg";
import ticketinprogress from "../images/ticketinprogress.svg";

const SupportTickets = ({ tickets }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const navigate = useNavigate();

  console.log(tickets);

  const maxDescriptionLength = 26;

  const truncateDescription = (description, maxDescriptionLength) => {
    return description.length <= maxDescriptionLength
      ? description
      : description.substring(0, maxDescriptionLength) + "...";
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

  const getStatusIcon = (status) => {
    if (!status) return null;
    switch (status.toLowerCase()) {
      case "open":
        return (
          <img
            src={ticketopen}
            alt="open ticket icon"
            className="h-[78px] ml-[17px]"
          />
        );
      case "closed":
        return (
          <img
            src={ticketclosed}
            alt="closed ticket icon"
            className="h-[78px] ml-[17px]"
          />
        );
      case "inprogress":
        return (
          <img
            src={ticketinprogress}
            alt="inprogress ticket icon"
            className="h-[78px] ml-[17px]"
          />
        );
      default:
        return null;
    }
  };

  const handleTicketClick = (ticketId) => {
    navigate(`/supportmain/SupportTicketUpdate/${ticketId}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handlePriorityFilterChange = (event) => {
    setPriorityFilter(event.target.value);
  };

  const filterAndSearchTickets = () => {
    return tickets.filter((ticket) => {
      const matchesSearchQuery =
        ticket.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.ticketCode?.toString().includes(searchQuery) ||
        `${ticket.assignedagentDetails?.firstname} ${ticket.assignedagentDetails?.lastname}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatusFilter =
        !statusFilter ||
        ticket.status?.toLowerCase() === statusFilter.toLowerCase();

      const matchesPriorityFilter =
        !priorityFilter ||
        ticket.priority?.toLowerCase() === priorityFilter.toLowerCase();

      return matchesSearchQuery && matchesStatusFilter && matchesPriorityFilter;
    });
  };

  const filteredTickets = filterAndSearchTickets();

  return (
    <div className="p-4 mb-10">
      <h2 className="mb-4 text-xl font-bold text-white">My Tickets</h2>
      <div className="h-0.5 bg-white mb-4"></div>

      {/* Search and Filter Section */}
      <div className="flex flex-col items-center justify-between mb-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search by Subject, ticket ID , Agent"
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 mb-2 border border-gray-300 bg-[#020617b3] text-[aliceblue] rounded-lg w-80 sm:mb-0"
        />

        <div className="flex space-x-4">
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="p-2 border border-gray-300 rounded-lg bg-[#020617b3] text-[aliceblue]"
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="inprogress">In Progress</option>
          </select>

          <select
            value={priorityFilter}
            onChange={handlePriorityFilterChange}
            className="p-2 border border-gray-300 rounded-lg bg-[#020617b3] text-[aliceblue]"
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Header Row */}
      <div className="grid grid-cols-10 gap-4 p-2 font-bold text-center text-white border-b border-gray-300">
        <div className="whitespace-nowrap">Ticket ID</div>
        <div className="whitespace-nowrap">Subject</div>
        <div className="whitespace-nowrap">Age</div>
        <div className="whitespace-nowrap">Created By</div>
        <div className="whitespace-nowrap">Updated By</div>
        <div className="whitespace-nowrap">Last Updated</div>
        <div className="whitespace-nowrap">Status</div>
        <div className="whitespace-nowrap">Priority</div>
        <div className="whitespace-nowrap">Agent</div>
        <div className="whitespace-nowrap">Description</div>
      </div>

      {/* Ticket Rows */}
      {filteredTickets.map((ticket) => (
        <motion.div
          key={ticket._id}
          className="grid grid-cols-10 gap-4 p-4 mt-4 rounded-lg bg-[#070707f9] text-[aliceblue] items-center text-center cursor-pointer"
          onClick={() => handleTicketClick(ticket._id)}
          whileHover={{
            boxShadow: "0 0 30px #020617b3",
            transition: { duration: 0.3 },
          }}
          initial={{ backgroundColor: "#020617b3" }}
          animate={{ backgroundColor: "#020617b3" }}
        >
          <div className="text-[aliceblue]">{ticket.ticketCode || "N/A"}</div>
          <div className="text-[aliceblue] hover:text-red-700">
            {ticket.title || "N/A"}
          </div>
          <div className="text-[aliceblue] hover:text-blue-500">
            {ticket.ageInDays ? `${ticket.ageInDays} d` : "N/A"}
          </div>
          <div className="text-[aliceblue]">
            {ticket.ownerDetails?.firstname
              ? `${ticket.ownerDetails.firstname} ${ticket.ownerDetails.lastname}`
              : "N/A"}
          </div>
          <div className="text-[aliceblue]">
            {ticket.updatedby === "NA" ? (
              <lord-icon
                src="https://cdn.lordicon.com/aycieyht.json"
                trigger="hover"
                colors="primary:#dd335c,secondary:#08a88a"
                style={{ width: "50px", height: "44px" }}
              ></lord-icon>
            ) : (
              ticket.updatedby || "N/A"
            )}
          </div>
          <div className="text-[aliceblue]">
            {ticket.updated === null ? (
              <lord-icon
                src="https://cdn.lordicon.com/qvyppzqz.json"
                trigger="hover"
                style={{ width: "50px", height: "35px" }}
                colors="primary:#dd335c,secondary:#dd335c"
              ></lord-icon>
            ) : (
              new Date(ticket.updated).toLocaleDateString()
            )}
          </div>
          <div className="text-[aliceblue]">{getStatusIcon(ticket.status)}</div>
          <div className="text-[#dd335c]">
            <span
              className="inline-block w-4 h-4 rounded-full"
              style={{ backgroundColor: getPriorityColor(ticket.priority) }}
            ></span>
          </div>
          <div className="text-[aliceblue]">
            {ticket.assignedagent ? (
              `${ticket.assignedagentDetails?.firstname || "N/A"} ${
                ticket.assignedagentDetails?.lastname || "N/A"
              }`
            ) : (
              <lord-icon
                src="https://cdn.lordicon.com/bgebyztw.json"
                trigger="hover"
                state="hover-looking-around"
                colors="primary:#dd335c,secondary:#dd335c"
                style={{ width: "50px", height: "37px" }}
              ></lord-icon>
            )}
          </div>

          <div className="truncate-description text-[aliceblue]">
            {truncateDescription(
              ticket.explainproblem || "No description",
              maxDescriptionLength
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SupportTickets;
