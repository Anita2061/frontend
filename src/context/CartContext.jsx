import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { api } from '../lib/api';

const CartContext = createContext(null);

function mergeAdd(items, product) {
  const idx = items.findIndex((i) => i.productId === product.productId);
  if (idx === -1) return [...items, { ...product, qty: product.qty || 1 }];
  return items.map((i, n) => (n === idx ? { ...i, qty: (i.qty || 1) + (product.qty || 1) } : i));
}

function getStorageKey(user) {
  return user ? `cart_${user.id}` : 'cart_guest';
}

function loadCart(user) {
  try {
    const raw = localStorage.getItem(getStorageKey(user));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(user, items) {
  localStorage.setItem(getStorageKey(user), JSON.stringify(items));
}

export function CartProvider({ children }) {
  const { user, ready: authReady } = useAuth();
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const cartCount = items.reduce((sum, i) => sum + (Number(i.qty) || 0), 0);

  // Load cart whenever the user changes
  useEffect(() => {
    if (!authReady) return;

    const syncCart = async () => {
      if (user) {
        try {
          const res = await api.get('/accounts/cart/');
          setItems(res.data.items || []);
        } catch (error) {
          
          setItems(loadCart(user));
        }
      } else {
        setItems(loadCart(user));
      }
      setLoaded(true);
    };

    syncCart();
  }, [user, authReady]);

  // Save cart whenever items change
  useEffect(() => {
    if (!loaded) return;

    const persistCart = async () => {
      // Always save to localStorage for fallback/guest
      saveCart(user, items);

      if (user) {
        try {
          await api.post('/accounts/cart/update/', { items });
        } catch (error) {
          console.error("Failed to sync cart with backend:", error);
        }
      }
    };

    persistCart();
  }, [items, loaded, user]);

  const addToCart = (product) => {
    setItems((prev) => mergeAdd(prev, product));
  };

  const clearCart = () => {
    setItems([]);
  };

  const updateItems = (nextItems) => {
    setItems(nextItems);
  };

  const value = useMemo(
    () => ({ items, cartCount, loaded, addToCart, clearCart, setItems: updateItems }),
    [items, cartCount, loaded]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
