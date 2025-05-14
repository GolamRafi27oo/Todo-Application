import { create } from "zustand";

interface StoreState {
  bears: number;
  getValue: number;
}

interface StoreActions {
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
  getUpdate: (value: number) => void;
}

type StoreType = StoreState & StoreActions;

export const useStore = create<StoreType>((set) => ({
  bears: 0,
  getValue: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears: number) => set({ bears: newBears }),
  getUpdate: (value: number) => set({ getValue: value }),
}));
