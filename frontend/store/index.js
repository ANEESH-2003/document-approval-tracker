import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(persist(
  (set, get) => ({
    token: "",
    position: "",
    setToken: (token, position) => set((state) => ({ token, position })),
  }), {
    name: "document_verify",
    storage: createJSONStorage(() => localStorage),
  }
));