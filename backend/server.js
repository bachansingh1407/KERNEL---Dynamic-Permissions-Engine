import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js";
import cors from 'cors'
import authRoutes from './auth/auth.routes.js'
dotenv.config();

const app = express();

/* MIDDLEWARE */
app.use(express.json());
/* CORS CONFIG */
app.use(
  cors({
    origin: "http://localhost:3000", // allow frontend
    credentials: true,              // allow cookies / auth headers
  })
);

app.use("/auth", authRoutes);

/* HEALTH CHECK */
app.get("/health", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json({
    status: "OK",
    dbTime: result.rows[0].now,
  });
});

/* SERVER START */
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 KERNEL backend running on port ${PORT}`);
});
