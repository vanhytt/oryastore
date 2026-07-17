"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
  brand?: string;
  slug?: string;
}

export const DEFAULT_CART_IMAGE = "https://placehold.co/600x600/efffe9/5d8d4a?text=Orya+Natural";

export function resolveCartImage(image?: string | null): string {
  return image && image.trim() ? image : DEFAULT_CART_IMAGE;
}

export function normalizeCartPrice(value: number | string | undefined): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const digits = value.replace(/\D/g, "");
    return Number(digits || 0);
  }
  return 0;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: {
      id: string;
      name: string;
      price: number | string;
      image?: string;
      category?: string;
      brand?: string;
      slug?: string;
    },
    quantity?: number
  ) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("orya_cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart) as Array<Partial<CartItem> & { priceValue?: number; price?: number | string }>;
        const normalizedCart = parsedCart.map((item) => ({
          id: String(item.id || ""),
          name: item.name || "Sản phẩm Orya",
          price: typeof item.price === "number" ? item.price : normalizeCartPrice((item as any).priceValue ?? item.price),
          image: resolveCartImage(item.image),
          quantity: Number(item.quantity) || 1,
          category: item.category,
          brand: item.brand,
          slug: item.slug,
        }));
        setCart(normalizedCart);
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("orya_cart", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addToCart = (
    product: {
      id: string;
      name: string;
      price: number | string;
      image?: string;
      category?: string;
      brand?: string;
      slug?: string;
    },
    quantity = 1
  ) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }

      return [
        ...prevCart,
        {
          id: String(product.id),
          name: product.name || "Sản phẩm Orya",
          price: normalizeCartPrice(product.price),
          image: resolveCartImage(product.image),
          quantity,
          category: product.category,
          brand: product.brand,
          slug: product.slug,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}