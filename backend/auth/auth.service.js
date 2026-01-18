import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET;

/* ==============================
   LOGIN (COMMAND)
================================ */
export async function login({ email, password }) {
  const result = await pool.query(
    `SELECT u.*, r.access 
     FROM users u
     JOIN roles r ON r.id = u.role_id
     WHERE u.email = $1 AND u.is_active = true AND u.is_deleted = false`,
    [email]
  );

  if (result.rowCount === 0) {
    throw new Error("Invalid credentials");
  }

  const user = result.rows[0];

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      roleAccess: user.access,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
}

/* ==============================
   CREATE USER (ADMIN COMMAND)
================================ */
export async function createUser(data, adminUser) {
  const { email, password, role_id } = data;

  if (!role_id) throw new Error("Role is required");

  const hashed = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (email, password_hash, role_id, created_by)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email`,
    [email, hashed, role_id, adminUser.id]
  );

  return result.rows[0];
}
