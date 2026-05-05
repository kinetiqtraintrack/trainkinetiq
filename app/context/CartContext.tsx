"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  color: string;
  size: string;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  addItem: (item: CartItem) => void;
}

const CartContext = createContext<CartContextValue>({
  items: [],
  count: 0,
  addItem: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("kinetiq-cart");
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore malformed localStorage
    }
  }, []);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const next = [...prev, item];
      try {
        localStorage.setItem("kinetiq-cart", JSON.stringify(next));
      } catch {
        // ignore quota errors
      }
      return next;
    });
  }, []);

  return (
    <CartContext.Provider value={{ items, count: items.length, addItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
