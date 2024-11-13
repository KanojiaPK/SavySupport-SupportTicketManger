import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams
import CustomerChat from "./CustomerChat";
import apiUrl from "../utils/apiURL";

const CustomerTicketUpdate = () => {
  const [ticket, setTicket] = useState(null); // Initialize ticket state to null
  const { ticketId } = useParams(); // Use useParams to get params

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/tickets/get-ticket/${ticketId}`
        );
        setTicket(response.data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    fetchTicket();
  }, [ticketId]); // Fetch ticket when ticketId changes

  return (
    <div className="h-full">
      {ticket ? (
        <div className="mb-4">
          <CustomerChat ticket={ticket} ticketId={ticketId} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CustomerTicketUpdate;
