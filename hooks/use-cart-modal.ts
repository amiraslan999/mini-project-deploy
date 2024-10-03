import { create } from "zustand";

type CartModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const UseCartModal = create<CartModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
