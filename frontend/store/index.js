import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      token: "",
      position: "",
      email: "",
      name: "",
      docs: [],
      setToken: (token, position, email, name) =>
        set((state) => ({ ...state, token, position, email, name })),
      logout: () =>
        set((state) => ({ ...state, token: "", position: "", email: "", name: "", docs: [] })),
      setDocs: (docs) => set((state) => ({ ...state, docs })),
      removeDocs: () => set((state) => ({ ...state, docs: [] })),
    }),
    {
      name: "document_verify",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
