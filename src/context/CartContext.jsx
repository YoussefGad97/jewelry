import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

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
};

export const useCart = () => useContext(CartContext); 