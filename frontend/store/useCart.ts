import { create } from "zustand";
import { Product } from "@/types/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  addMany: (newItems: CartItem[]) => void;
  getTotalPrice: () => number;
}

// ВИДАЛЯЄМО persist ТУТ:
export const useCart = create<CartState>((set, get) => ({
  items: [],

  addItem: (product) => {
    const currentItems = get().items;
    const existingItem = currentItems.find((item) => item.id === product.id);

    if (existingItem) {
      set({
        items: currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      });
    } else {
      set({ items: [...currentItems, { ...product, quantity: 1 }] });
    }
  },

  removeItem: (id) =>
    set({
      items: get().items.filter((item) => item.id !== id),
    }),

  updateQuantity: (id, quantity) =>
    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    }),

  clearCart: () => set({ items: [] }),

  addMany: (newItems) => {
    set((state) => {
      const merged: CartItem[] = [...state.items];
      for (const newItem of newItems) {
        const idx = merged.findIndex((x) => x.id === newItem.id);
        if (idx >= 0) {
          merged[idx] = {
            ...merged[idx],
            quantity: merged[idx].quantity + newItem.quantity,
          };
        } else {
          merged.push(newItem);
        }
      }
      return { items: merged };
    });
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  },
}));
