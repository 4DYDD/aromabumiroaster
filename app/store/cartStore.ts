import { create } from "zustand";
import { Product } from "../types";

interface CartState {
  items: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (item) => set((state) => ({ items: [...state.items, item] })),
  removeFromCart: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    })),
  clearCart: () => set({ items: [] }),
}));
