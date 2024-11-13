import React, { useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "../utils/apiURL";

import CustomerTickets from "../CustomerTickets/CustomerTickets";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./CustomerDashboard.css";

const CustomerDashBoard = () => {
  const [tickets, setTickets] = useState([]);

  // Parse user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData._id ? userData._id : null;
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/tickets/get-ticketsWithusers`
        );
        setTickets(response.data.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, [tickets.assignedAgent]);

  // Filter tickets for the particular user
  const userTickets = tickets.filter((ticket) => ticket.owner === userId);
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

  // Calculate the number of tickets with different statuses
  const calculateStatusCounts = () => {
    const statusCounts = {
      open: 0,
      closed: 0,
      inProgress: 0,
    };

    userTickets.forEach((ticket) => {
      switch (ticket.status.toLowerCase()) {
        case "open":
          statusCounts.open++;
          break;
        case "closed":
        case "resolved":
          statusCounts.closed++;
          break;
        case "inprogress":
          statusCounts.inProgress++;
          break;
        default:
          break;
      }
    });

    return statusCounts;
  };

  const statusCounts = calculateStatusCounts();
  console.log(statusCounts);

  // Data for pie chart
  const pieChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#00e600", "#dd335c", "#ffff00"],
        hoverBackgroundColor: ["#00b300", "#ae1e3f", "#cccc00"],
        borderColor: "#00000000", // Set border color to black
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

  return (
    <>
      <div className="grid grid-cols-1 gap-6 p-6 dashboard-grid md:grid-cols-2 lg:grid-cols-4">
        <div className="dashboard-card">
          <lord-icon
            src="https://cdn.lordicon.com/osybhpkm.json"
            trigger="hover"
            colors="primary:#dd335c,secondary:#dd335c"
            style={{ width: "70px", height: "90px" }}
          ></lord-icon>
          <h3>Open</h3>
          <p>{statusCounts.open}</p>
        </div>
        <div className="dashboard-card">
          <lord-icon
            src="https://cdn.lordicon.com/wzrwaorf.json"
            trigger="hover"
            colors="primary:#dd335c,secondary:#dd335c"
            style={{ width: "70px", height: "90px" }}
          ></lord-icon>
          <h3>In Progress</h3>
          <p>{statusCounts.inProgress}</p>
        </div>
        <div className="dashboard-card">
          <lord-icon
            src="https://cdn.lordicon.com/wvaaucoa.json"
            trigger="hover"
            colors="primary:#dd335c,secondary:#dd335c"
            style={{ width: "70px", height: "90px" }}
          ></lord-icon>
          <h3>Closed</h3>
          <p>{statusCounts.closed}</p>
        </div>
        <div className="dashboard-card">
          <lord-icon
            src="https://cdn.lordicon.com/ozmbktct.json"
            trigger="hover"
            colors="primary:#dd335c,secondary:#dd335c"
            style={{ width: "70px", height: "90px" }}
          ></lord-icon>
          <h3>Resolved</h3>
          <p>{statusCounts.closed}</p>
        </div>

        <div className="flex items-center justify-center col-span-2 dashboard-chart md:col-span-2 lg:col-span-2">
          <div className="chart-container">
            <Pie
              data={pieChartData}
              options={pieChartOptions}
              className="pieChart"
            />
          </div>
        </div>
        <div className="flex items-center justify-center col-span-1 dashboard-chart md:col-span-2 lg:col-span-2">
          <div className="chart-container">
            <Bar data={barGraphData} className="barGraph" />
          </div>
        </div>
      </div>
      <CustomerTickets tickets={userTickets}></CustomerTickets>
    </>
  );
};

export default CustomerDashBoard;
