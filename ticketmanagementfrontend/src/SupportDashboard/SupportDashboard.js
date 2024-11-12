import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./SupportDashboard.css";
import SupportTickets from "../SupportTickets/SupportTickets";

const SupportDashboard = ({ isSidebarCollapsed }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8003/api/v1/tickets/get-ticketsWithusers"
        );
        setTickets(response.data.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, [tickets.assignedAgent]);

  // Filter tickets for the particular user
  const userTickets = tickets;
  console.log(userTickets);

  const calculatePriorityCounts = () => {
    const priorityCounts = {
      low: 0,
      medium: 0,
      high: 0,
    };

    userTickets.forEach((ticket) => {
      switch (ticket.priority.toLowerCase()) {
        case "low":
          priorityCounts.low++;
          break;
        case "medium":
          priorityCounts.medium++;
          break;
        case "high":
          priorityCounts.high++;
          break;
        default:
          break;
      }
    });

    return priorityCounts;
  };

  const priorityCounts = calculatePriorityCounts();

  const barGraphData = {
    labels: Object.keys(priorityCounts),
    datasets: [
      {
        label: "Ticket Priority",
        backgroundColor: ["#00e600", "#ffff00", "#ff0000"],
        borderColor: ["#00e600", "#ffff00", "#ff0000"],
        borderWidth: 1,
        hoverBackgroundColor: ["#009900", "#cccc00", "#cc0000"],
        hoverBorderColor: ["#009900", "#cccc00", "#cc0000"],
        data: Object.values(priorityCounts),
      },
    ],
  };

  const calculateStatusCounts = () => {
    const statusCounts = {
      open: 0,
      closed: 0,
      inProgress: 0,
      resolved: 0,
    };

    tickets.forEach((ticket) => {
      if (ticket.status) {
        switch (ticket.status) {
          case "open":
            statusCounts.open++;
            break;
          case "closed":
            statusCounts.closed++;
            break;
          case "resolved":
            statusCounts.resolved++;
            break;
          case "inprogress":
            statusCounts.inProgress++;
            break;
          default:
            break;
        }
      }
    });

    return statusCounts;
  };

  const statusCounts = calculateStatusCounts();

  const pieChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#00e600", "#dd335c", "#ffff00", "#3399ff"],
        hoverBackgroundColor: ["#00b300", "#ae1e3f", "#cccc00", "#2673b7"],
        borderColor: "#00000000",
      },
    ],
  };

  const pieChartOptions = {
    plugins: {
      legend: {
        position: "right",
        align: "center",
      },
    },
  };

  // Filter high priority tickets
  const highPriorityTickets = userTickets.filter(
    (ticket) => ticket.priority.toLowerCase() === "high"
  );

  const unassignedAgentTickets = userTickets.filter(
    (ticket) => !ticket.assignedagentDetails
  );

  console.log(unassignedAgentTickets);
  return (
    <div className={`main-content2 ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <div className="grid grid-cols-1 gap-6 p-6 support-dashboard-grid md:grid-cols-2 lg:grid-cols-4">
        <div className="support-dashboard-card">
          <lord-icon
            src="https://cdn.lordicon.com/osybhpkm.json"
            trigger="hover"
            colors="primary:#dd335c,secondary:#dd335c"
            style={{ width: "70px", height: "90px" }}
          ></lord-icon>
          <h3>Open</h3>
          <p>{statusCounts.open}</p>
        </div>
        <div className="support-dashboard-card">
          <lord-icon
            src="https://cdn.lordicon.com/wzrwaorf.json"
            trigger="hover"
            colors="primary:#dd335c,secondary:#dd335c"
            style={{ width: "70px", height: "90px" }}
          ></lord-icon>
          <h3>In Progress</h3>
          <p>{statusCounts.inProgress}</p>
        </div>
        <div className="support-dashboard-card">
          <lord-icon
            src="https://cdn.lordicon.com/wvaaucoa.json"
            trigger="hover"
            colors="primary:#dd335c,secondary:#dd335c"
            style={{ width: "70px", height: "90px" }}
          ></lord-icon>
          <h3>Closed</h3>
          <p>{statusCounts.closed}</p>
        </div>
        <div className="support-dashboard-card">
          <lord-icon
            src="https://cdn.lordicon.com/ozmbktct.json"
            trigger="hover"
            colors="primary:#dd335c,secondary:#dd335c"
            style={{ width: "70px", height: "90px" }}
          ></lord-icon>
          <h3>Resolved</h3>
          <p>{statusCounts.closed}</p>
        </div>

        <div className="flex items-center justify-center col-span-1 support-dashboard-chart md:col-span-2 lg:col-span-2">
          <div className="chart-container">
            <Pie
              data={pieChartData}
              options={pieChartOptions}
              className="pieChart"
            />
          </div>
        </div>
        <div className="flex items-center justify-center col-span-1 support-dashboard-chart md:col-span-2 lg:col-span-2">
          <div className="chart-container">
            <Bar data={barGraphData} className="barGraph" />
          </div>
        </div>
        {/* Display High Priority Tickets */}
        <div className="support-dashboard-card">
          <lord-icon
            src="https://cdn.lordicon.com/dndbceuc.json"
            trigger="hover"
            state="hover-snooze"
            colors="primary:#dd335c,secondary:#dd335c"
            style={{ width: "70px", height: "90px" }}
          ></lord-icon>
          <div className="flex flex-col justify-center gap-3">
            <h3>Total High Priority tickets </h3>
            <p className="text-[aliceblue] ">{highPriorityTickets.length}</p>
          </div>
        </div>

        <div className="support-dashboard-card">
          <lord-icon
            src="https://cdn.lordicon.com/usownftb.json"
            trigger="hover"
            state="hover-oscillate"
            colors="primary:#dd335c,secondary:#dd335c"
            style={{ width: "70px", height: "90px" }}
          ></lord-icon>
          <h3>High Priority Ticket Codes</h3>
          <div className="flex flex-wrap justify-center gap-3 mt-3 text-[aliceblue]">
            {highPriorityTickets.map((ticket, index) => (
              <div
                key={ticket.ticketCode}
                className="bg-[#ff040045] rounded-lg py-1 w-2 hover:bg-[#ff04002b]"
                style={{ minWidth: "50px" }}
              >
                {ticket.ticketCode}
              </div>
            ))}
          </div>
        </div>

        <div className="support-dashboard-card">
          <lord-icon
            src="https://cdn.lordicon.com/bgebyztw.json"
            trigger="hover"
            state="hover-looking-around"
            colors="primary:#dd335c,secondary:#dd335c"
            style={{ width: "50px", height: "90px" }}
          ></lord-icon>
          <div className="flex flex-col justify-center gap-3">
            <h3>Total Unassigned Agent Tickets</h3>
            <p className="text-[aliceblue]">{unassignedAgentTickets.length}</p>
          </div>
        </div>

        <div className="support-dashboard-card">
          <lord-icon
            src="https://cdn.lordicon.com/zrkkrrpl.json"
            trigger="hover"
            state="hover-swirl"
            colors="primary:#dd335c,secondary:#dd335c"
            style={{ width: "70px", height: "90px" }}
          ></lord-icon>
          <div className="flex flex-col justify-center gap-3">
            <h3>Total Tickets </h3>
            <p className="text-[aliceblue]">{tickets.length}</p>
          </div>
        </div>
      </div>
      <SupportTickets tickets={tickets}></SupportTickets>
    </div>
  );
};

export default SupportDashboard;
