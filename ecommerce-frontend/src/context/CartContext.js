import React, { createContext, useContext, useState, useEffect } from 'react';

// Cart Context to manage cart state
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Retrieve cart data from local storage if available
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];  // Initialize cart with saved data or empty array
  });

  // Effect to update local storage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));  // Store cart in local storage
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);  // Add product to the cart
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));  // Remove product from cart
  };

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0);  // Calculate total price
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
