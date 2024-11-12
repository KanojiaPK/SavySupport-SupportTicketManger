import mongoose from "mongoose";
import userModel from "./user.model.js";
const Schema = mongoose.Schema;

const TicketsSchema = new Schema({
  title: {
    type: String,
    default: null,
  },
  explainproblem: {
    type: String,
    default: null,
  },
  typeoffeature: {
    type: [String],
    default: [],
  },
  typeofproblem: {
    type: [String],
    default: [],
  },

  images: {
    type: [String], // Define as an array of strings
    default: [],
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: null,
  },
  updatedby: {
    type: [String],
    default: [],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: userModel,
  },

  assignedagent: {
    type: mongoose.Schema.Types.ObjectId,
    default: null, // Change the default value to null
    ref: userModel,
  },

  replies: {
    type: Number,
    default: 0,
  },
  ageInDays: {
    type: Number,
    default: 0,
  },
  usermsgs: [
    {
      text: {
        type: String,
        required: false,
      },

      type: {
        type: String,
        required: false,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  supportmsgs: [
    {
      text: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        required: false,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  status: {
    type: String,
    default: "open",
  },

  priority: {
    type: String,
    default: "NA",
  },

  ticketCode: {
    type: Number,
    unique: true,
    default: 0,
  },

  updatedby: {
    type: String,
    default: "NA",
  },
});

export default mongoose.model("Ticket", TicketsSchema);
