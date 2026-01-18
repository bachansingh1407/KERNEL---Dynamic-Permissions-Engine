import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

/* ==============================
   AUTH GUARD
================================ */
export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

/* ==============================
   ADMIN GUARD
================================ */
export function requireAdmin(req, res, next) {
  const access = req.user.roleAccess;

  if (access?.["*"]?.create === true) return next();

  return res.status(403).json({ message: "Admin only" });
}
