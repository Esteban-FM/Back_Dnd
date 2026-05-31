import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/routes/auth.js";
import sessionRoutes from "./src/routes/sessions.js";
import characterRoutes from "./src/routes/characters.js";
import diceRoutes from "./src/routes/dice.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/characters", characterRoutes);
app.use("/api/dice", diceRoutes);
// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "DnD Session API corriendo" });
});

app.listen(PORT, () => {
  console.log(`🎲 Servidor corriendo en http://localhost:${PORT}`);
});