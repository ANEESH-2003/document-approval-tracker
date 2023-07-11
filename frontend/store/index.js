import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(persist(
  (set, get) => ({
    token: "",
    setToken: (token) => set((state) => ({ token })),
  }), {
    name: "document_verify",
    storage: createJSONStorage(() => localStorage),
  }
));