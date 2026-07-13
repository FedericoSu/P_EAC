import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'galeria-arte-cart';

const readInitialCart = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(readInitialCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (artwork, quantity) => {
    setItems((current) => {
      const existing = current.find((item) => item.artworkId === artwork.id);
      if (existing) {
        return current.map((item) =>
          item.artworkId === artwork.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...current,
        {
          artworkId: artwork.id,
          title: artwork.title,
          artist: artwork.artist,
          imageUrl: artwork.imageUrl,
          unitPrice: artwork.price,
          stock: artwork.stock,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (artworkId, quantity) => {
    setItems((current) =>
      current.map((item) => (item.artworkId === artworkId ? { ...item, quantity } : item))
    );
  };

  const removeItem = (artworkId) => {
    setItems((current) => current.filter((item) => item.artworkId !== artworkId));
  };

  const clearCart = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items]
  );

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const value = { items, addItem, updateQuantity, removeItem, clearCart, total, itemCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};
