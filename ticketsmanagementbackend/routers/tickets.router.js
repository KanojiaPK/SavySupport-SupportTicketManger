import express from "express";
import {
  addTickets,
  getTicket,
  getTickets,
  getTicketsWithUserDetails,
  updateTicket,
  uploadImage,
} from "../controllers/tickets.controller";

const router = express.Router();

router.post("/add-tickets", addTickets);
router.get("/get-tickets", getTickets);
router.get("/get-ticketsWithusers", getTicketsWithUserDetails);
router.get("/get-ticket/:ticketid", getTicket);
router.put("/update-ticket/:ticketid", updateTicket);

// router.put("/update-t/:ticketid", uploadImage);

getTicket;
export default router;
