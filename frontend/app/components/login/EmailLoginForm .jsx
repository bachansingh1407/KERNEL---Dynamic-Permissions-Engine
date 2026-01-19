"use client";

import { useState } from "react";
import { apiFetch } from "@/app/core/api/client";
import { useAuthStore } from "@/app/core/store/useAuthStore";

export default function EmailLoginForm() {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // Fetch user profile
      const user = await apiFetch("/auth/me", {
        headers: {
          Authorization: `Bearer ${res.token}`,
        },
      });
      
      login(res.token, user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-600">
          Email Address
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="mt-1 w-full rounded-md border border-slate-300 focus:border-2 focus:border-sky-400 px-3 py-2 text-sm outline-0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600">
          Auth Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="mt-1 w-full rounded-md border border-slate-300 focus:border-2 focus:border-sky-400 px-3 py-2 text-sm outline-0"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </p>
      )}

      <button
        disabled={loading}
        className="w-full bg-sky-700 text-white py-2 rounded"
      >
        {loading ? "Authenticating..." : "Login"}
      </button>
    </form>
  );
}
