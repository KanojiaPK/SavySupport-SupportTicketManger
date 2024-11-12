import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/user.router.js";
import ticketsRouter from "./routers/tickets.router.js";

const app = express();
const PORT = process.env.PORT || 8003;
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/supportTicketDB";

// CORS headers (placed at the top)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your frontend URL in production
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Body parser
app.use(express.json());

// Serving static files
app.use("/uploads", express.static("uploads"));

// DB connectivity
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.error("DB Connection Error:", err));

// API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/tickets", ticketsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
