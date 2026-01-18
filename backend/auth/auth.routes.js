import express from "express";
import {
  login,
  createUser,
  getMe,
} from "./auth.controller.js";
import { requireAuth, requireAdmin } from "./auth.middleware.js";

const router = express.Router();

/* ==============================
   AUTH COMMANDS
================================ */
router.post("/login", login);
router.post("/create-user", createUser);

/* ==============================
   AUTH QUERIES
================================ */
router.get("/me", requireAuth, getMe);

export default router;
