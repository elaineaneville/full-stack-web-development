import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import dotenv from "dotenv";
import creatureRoutes from "./routes/creatures.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(Cors());

// Routes
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.use("/api/creatures", creatureRoutes);


app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Internal server error" });
});



