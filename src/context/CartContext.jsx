import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

    const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);


  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(prevItem =>
        prevItem.id === item.id && prevItem.size === item.size
      );

      if (existingItem) {
        return prevItems.map(prevItem =>
          prevItem.id === item.id && prevItem.size === item.size
            ? { ...prevItem, quantity: prevItem.quantity + item.quantity }
            : prevItem
        );
      }
      return [...prevItems, item];
    });
  };

  const toggleFavorite = (product) => {
    setFavorites(prev =>
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const removeFromCart = (itemId, size) => {
    setCartItems(prevItems =>
      prevItems.filter(item =>
        !(item.id === itemId && item.size === size)
      )
    );
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      favorites,
      addToCart,
      toggleFavorite,
      clearCart,
      removeFromCart
    }}>
      {children}
    </CartContext.Provider>
  );
}
