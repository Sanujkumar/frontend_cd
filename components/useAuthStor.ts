import { create } from "zustand";

interface AuthState {
  role: string | null;
  token: string | null;
  setAuth: (role: string | null, token: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  token: null,
  setAuth: (role, token) => set({ role, token }),
  clearAuth: () => set({ role: null, token: null }),
}));
