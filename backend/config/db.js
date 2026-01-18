import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

/* ==============================
   DATABASE POOL
================================ */
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "kernel_db",
  port: process.env.DB_PORT || 5432,
});

/* ==============================
   CONNECTION TEST
================================ */
pool
  .query("SELECT 1")
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch((err) => {
    console.error("❌ DB connection failed", err);
    process.exit(1);
  });

export default pool;
