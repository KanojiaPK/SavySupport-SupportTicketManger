import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerChat.css";
import apiUrl from "../utils/apiURL";

export default function CustomerChat({ ticket, ticketId, setTicket }) {
  const [inputText, setInputText] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const agent = ticket?.data?.assignedagent;

  useEffect(() => {
    if (!ticket) return;
    const { data } = ticket;
    const supportMsgs = data.supportmsgs || [];
    const userMsgs = data.usermsgs || [];

    const allMessages = [
      ...supportMsgs.map((msg) => ({ ...msg, type: "supportmsg" })),
      ...userMsgs.map((msg) => ({ ...msg, type: "usermsg" })),
    ];
    setChatMessages(allMessages);
  }, [ticket]);

  const handleSend = async () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      text: inputText,
      type: "usermsg", // Message from the user
      timestamp: new Date().toISOString(),
    };

    try {
      // Update the ticket with the new message
      await axios.put(`${apiUrl}/api/v1/tickets/update-ticket/${ticketId}`, {
        usermsgs: [...ticket.data.usermsgs, newMessage], // Append new message to existing usermsgs
      });

      // Update local state with the new message
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleImageUpload = async (event) => {
    // Your image upload logic here
  };

  const renderMessage = (msg, index) => {
    const isUserMsg = msg.type === "usermsg";
    const senderName = isUserMsg
      ? "You"
      : `${agent.firstname} ${agent.lastname}`;

    return (
      <div
        key={index}
        className={`flex flex-col p-3 rounded-lg ${
          isUserMsg
            ? "self-end bg-[#2979ff] text-white"
            : "self-start bg-[#bdbdbd] text-black"
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-semibold">{senderName}</p>
          <p className="ml-2 text-xs">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </p>
        </div>
        <p
          className={`p-2 rounded-lg ${
            isUserMsg ? "text-white" : "text-black"
          }`}
        >
          {msg.text}
        </p>
        {msg.images &&
          msg.images.map((img, imgIndex) => (
            <img
              key={imgIndex}
              src={img}
              alt="Attached"
              className="object-cover rounded-lg max-h-40"
            />
          ))}
      </div>
    );
  };

  const renderChatMessages = () => {
    // Combine support and user messages
    const allMessages = [...chatMessages];

    // Sort messages based on timestamp
    const sortedMessages = allMessages.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    // Initialize variables to keep track of previous date
    let prevDate = null;
    let renderedMessages = [];

    // Iterate through sorted messages to add date separators
    sortedMessages.forEach((msg, index) => {
      const currentDate = new Date(msg.timestamp).toLocaleDateString();

      // Check if the current message is from a different date than the previous one
      if (currentDate !== prevDate) {
        // Add date separator
        renderedMessages.push(
          <p
            key={`date-separator-${index}`}
            className="my-2 mb-4 text-center text-gray-500"
          >
            {currentDate}
          </p>
        );
        prevDate = currentDate; // Update previous date
      }

      // Render message
      renderedMessages.push(renderMessage(msg, index));
    });

    return renderedMessages;
  };

  return (
    <div className="flex flex-col h-screen bg-[#8b7a7a38] rounded-lg">
      <div className="flex items-center justify-between p-4 bg-[#8b7a7a38] rounded-t-lg">
        <div className="flex items-center space-x-2">
          {agent ? (
            <img
              src={`${apiUrl}/uploads/${agent.image}`}
              alt="profilepic"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          )}
          <div className="ml-4">
            {agent ? (
              <>
                <p className="text-lg font-semibold">
                  {agent.firstname} {agent.lastname}
                </p>
                <p className="text-gray-500">{agent.usertype}</p>
              </>
            ) : (
              <p className="text-gray-500">Agent is yet to be assigned</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {agent ? (
            <>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-500">Online</p>
            </>
          ) : (
            <>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <p className="text-sm text-gray-500">Offline</p>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 space-y-4 overflow-y-auto">
        {chatMessages.length === 0 && (
          <div className="text-center text-gray-500">
            {agent
              ? "Agent will be assigned to you shortly."
              : "Waiting for agent assignment..."}
          </div>
        )}
        {renderChatMessages()}
      </div>

      <div className="flex items-center p-2 bg-[#8b7a7a38]">
        {/* /rounded-b-lg maybe missing  */}
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-full focus:outline-none"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="p-2 ml-2 text-gray-700 hover:text-gray-900 focus:outline-none"
          onClick={handleSend}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-send"
          >
            <path d="M22 2L11 13"></path>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="image-upload"
          onChange={handleImageUpload}
        />
        <label
          htmlFor="image-upload"
          className="p-2 ml-2 mr-2 text-gray-700 cursor-pointer hover:text-[#424152] focus:outline-none"
        >
          <lord-icon
            src="https://cdn.lordicon.com/rehjpyyh.json"
            trigger="hover"
            stroke="bold"
            colors="primary:#424152,secondary:#424152"
            style={{ width: "35px", height: "40px" }}
          ></lord-icon>
        </label>
      </div>
    </div>
  );
}
