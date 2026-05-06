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
  removeItem: (index: number) => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue>({
  items: [],
  count: 0,
  addItem: () => {},
  removeItem: () => {},
  isCartOpen: false,
  openCart: () => {},
  closeCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  const removeItem = useCallback((index: number) => {
    setItems((prev) => {
      const next = prev.filter((_, i) => i !== index);
      try {
        localStorage.setItem("kinetiq-cart", JSON.stringify(next));
      } catch {
        // ignore quota errors
      }
      return next;
    });
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        count: items.length,
        addItem,
        removeItem,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
