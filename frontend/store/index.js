import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(persist(
  (set, get) => ({
    token: "",
    position: "",
    docs: [],
    setToken: (token, position) => set((state) => ({ ...state, token, position })),
    logout: () => set((state) => ({ ... state, token: '', position: '', docs: [] })),
    setDocs: (docs) => set((state) => ({ ...state, docs})),
    removeDocs: () => set((state) => ({ ...state, docs: [] })),
  }), {
    name: "document_verify",
    storage: createJSONStorage(() => localStorage),
  }
));