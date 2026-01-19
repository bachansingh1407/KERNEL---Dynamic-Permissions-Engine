import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isHydrated: false, // 👈 NEW

  login: ({ token, user }) => {
    sessionStorage.setItem("kernel_token", token);

    set({
      token,
      user,
      isAuthenticated: true,
      isHydrated: true,
    });
  },


  logout: () => {
    sessionStorage.removeItem("kernel_token");
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      isHydrated: true,
    });
  },

  hydrate: async () => {
    const token = sessionStorage.getItem("kernel_token");

    if (!token) {
      set({ isHydrated: true });
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error();

      const user = await res.json();

      set({
        token,
        user,
        isAuthenticated: true,
        isHydrated: true,
      });
    } catch {
      sessionStorage.removeItem("kernel_token");
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isHydrated: true,
      });
    }
  },
}));
