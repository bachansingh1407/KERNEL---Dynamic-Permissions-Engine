import * as authService from "./auth.service.js";

import pool from "../config/db.js";

export async function login(req, res) {
  try {
    const token = await authService.login(req.body);
    res.json(token);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}

export async function createUser(req, res) {
  try {
    const user = await authService.createUser(req.body, req.user);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function getMe(req, res) {
  const result = await pool.query(
    `
    SELECT 
      u.id,
      u.email,
      r.name AS role,
      r.access
    FROM users u
    JOIN roles r ON r.id = u.role_id
    WHERE u.id = $1
      AND u.is_active = true
      AND u.is_deleted = false
    `,
    [req.user.id]
  );

  if (!result.rows.length) {
    return res.status(404).json({ message: "User not found" });
  }

  const user = result.rows[0];

  res.json({
    id: user.id,
    email: user.email,
    role: user.role,
    access: user.access, // 🔥 permission matrix
  });
}

