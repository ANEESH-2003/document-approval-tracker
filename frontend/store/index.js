import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      token: "",
      position: "",
      email: "",
      name: "",
      id: "",
      docs: [],
      setToken: (token, position, email, name, id) =>
        set((state) => ({ ...state, token, position, email, name, id })),
      logout: () =>
        set((state) => ({ ...state, token: "", position: "", email: "", name: "", id: "", docs: [] })),
      setDocs: (docs) => set((state) => ({ ...state, docs })),
      removeDocs: () => set((state) => ({ ...state, docs: [] })),
    }),
    {
      name: "document_verify",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
