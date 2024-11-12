import Ticket from "../models/tickets.model.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import util from "util";
import mongoose from "mongoose";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./uploads";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    const fullname = `${name}-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${ext}`;
    cb(null, fullname);
  },
});

const upload = multer({ storage: storage });

const uploadFiles = util.promisify(
  upload.fields([{ name: "images", maxCount: 10 }])
);

// Utility function to delete file
const deleteFile = (filepath) => {
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }
};

// Function to calculate age in days
const calculateAgeInDays = (createdAt) => {
  const now = new Date();
  const createdAtDate = new Date(createdAt);
  const diffTime = Math.abs(now - createdAtDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
};

const getNextTicketCode = async () => {
  const lastTicket = await Ticket.findOne().sort({ ticketCode: -1 });
  return lastTicket ? lastTicket.ticketCode + 1 : 1000;
};

// Add ticket function
export const addTickets = async (req, res) => {
  try {
    await uploadFiles(req, res);

    const {
      title,
      explainproblem,
      typeoffeature,
      typeofproblem,
      priority,
      owner,
      status,
      assignedagent,
      updated,
      updatedby,
      usermsgs,
      supportmsgs,
    } = req.body;

    let images = [];

    if (req.files && req.files["images"]) {
      images = req.files["images"].map((file) => file.filename);
    }

    const ticketCode = await getNextTicketCode();

    const newTicket = new Ticket({
      title,
      explainproblem,
      typeoffeature,
      typeofproblem,
      priority,
      images,
      owner,
      assignedagent,
      status,
      updated,
      updatedby,
      ticketCode,
      usermsgs,
      supportmsgs,
    });

    const savedTicket = await newTicket.save();

    // Calculate age in days based on the saved ticket's creation date
    const ageInDays = calculateAgeInDays(savedTicket.created_at);

    // Update the ticket with the calculated age
    savedTicket.ageInDays = ageInDays;
    await savedTicket.save();

    return res.status(201).json({
      data: savedTicket,
      message: "New record added",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

// Get tickets function
export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    if (tickets) {
      return res.status(200).json({
        count: tickets.length,
        data: tickets,
        message: "Fetched all tickets successfully!",
        success: true,
      });
    }
    return res.status(404).json({
      message: "No tickets found",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

// Get tickets with user details function
export const getTicketsWithUserDetails = async (req, res) => {
  try {
    const tickets = await Ticket.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "ownerDetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "assignedagent",
          foreignField: "_id",
          as: "assignedagentDetails",
        },
      },
      {
        $unwind: {
          path: "$ownerDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$assignedagentDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    if (tickets.length > 0) {
      return res.status(200).json({
        count: tickets.length,
        data: tickets,
        message: "Fetched all tickets successfully with user details!",
        success: true,
      });
    }

    return res.status(404).json({
      message: "No tickets found",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

// Get ticket function
export const getTicket = async (req, res) => {
  try {
    const ticketId = req.params.ticketid; // Changed from ticketCode to ticketid
    console.log(ticketId);
    const ticket = await Ticket.findById(ticketId)
      .populate("owner")
      .populate("assignedagent");

    if (ticket) {
      return res.status(200).json({
        data: ticket,
        message: "Fetched!",
        success: true,
      });
    }

    return res.status(404).json({
      // Changed status to 404 for "Not Found"
      message: "Ticket not found",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

// Update ticket function

export const updateTicket = async (req, res) => {
  try {
    const ticketId = req.params.ticketid;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      return res.status(400).json({
        message: "Invalid ticket ID",
        success: false,
      });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
        success: false,
      });
    }

    // Check if updates contain images
    if (updates.images && updates.images.length > 0) {
      // Append new images to existing ones
      ticket.images = [...ticket.images, ...updates.images];
    }

    // Update other fields
    Object.keys(updates).forEach((key) => {
      if (key !== "images") {
        ticket[key] = updates[key];
      }
    });

    const updatedTicket = await ticket.save();

    // // Populate the 'assignedagent' field with user data
    // await updatedTicket.populate("assignedagent").execPopulate();

    return res.status(200).json({
      data: updatedTicket,
      message: "Ticket updated successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
