"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

const CartContext = createContext<{
  state: CartState;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        const totalItems = updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        return { items: updatedItems, totalItems, totalPrice };
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        const updatedItems = [...state.items, newItem];
        const totalItems = updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        return { items: updatedItems, totalItems, totalPrice };
      }
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      const totalItems = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const totalPrice = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return { items: updatedItems, totalItems, totalPrice };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        const updatedItems = state.items.filter((item) => item.id !== id);
        const totalItems = updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        return { items: updatedItems, totalItems, totalPrice };
      } else {
        const updatedItems = state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
        const totalItems = updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        return { items: updatedItems, totalItems, totalPrice };
      }
    }

    case "CLEAR_CART":
      return { items: [], totalItems: 0, totalPrice: 0 };

    case "LOAD_CART": {
      const items = action.payload;
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return { items, totalItems, totalPrice };
    }

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem("fizzify-cart");
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: cartItems });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fizzify-cart", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: 1 } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
