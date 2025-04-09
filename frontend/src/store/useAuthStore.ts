// store/useAuthStore.ts

import { create } from "zustand";
import { AuthStore, User } from "../utils/types";

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,

  login: (token: string, user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ isAuthenticated: true, token, user });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ isAuthenticated: false, token: null, user: null });
  },

  setUser: (user: User | null) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    set({ user });
  }
}));
