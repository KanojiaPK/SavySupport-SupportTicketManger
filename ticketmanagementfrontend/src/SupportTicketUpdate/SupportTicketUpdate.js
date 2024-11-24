
// SupportTicketUpdate.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SupportChat from "./SupportChat";
import apiUrl from "../utils/apiURL";

const SupportTicketUpdate = () => {
  const [ticket, setTicket] = useState(null);
  const { ticketId } = useParams();

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
  }, [ticketId]);

  const isAgentAssigned = ticket?.data?.assignedagent !== null;

  return (
    <div className="h-full">
      {ticket ? (
        <div>
          <SupportChat
            ticket={ticket}
            ticketId={ticketId}
            setTicket={setTicket}
            isAgentAssigned={isAgentAssigned}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SupportTicketUpdate;