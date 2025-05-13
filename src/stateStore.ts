import { create } from "zustand";

type Action = {
  inc: () => void;
  dec: () => void;
};

type Store = {
  count: number;
  action: Action;
};

export const useStore = create<Store>((set) => ({
  count: 0,
  action: {
    inc: () => set((state) => ({ count: state.count + 1 })),
    dec: () => set((state) => ({ count: state.count - 1 })),
  },
}));
