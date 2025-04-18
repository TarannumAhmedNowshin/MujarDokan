import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';  // Import useCart hook
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

const CartPage = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [quantities, setQuantities] = useState(
    cart.reduce((acc, product) => {
      acc[product.id] = 1; // Default quantity is 1 for each item
      return acc;
    }, {})
  );

  const navigate = useNavigate();  // Initialize useNavigate hook

  // Function to navigate to the checkout page
  const handleProceedToCheckout = () => {
    navigate('/checkout');  // Navigate to the Checkout Page
  };

  // Update the quantity in the cart
  const handleQuantityChange = (productId, value) => {
    const newQuantity = Math.max(1, parseInt(value)); // If the value is less than 1, set it to 1
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  // Function to calculate the total price
  const getTotalPrice = () => {
    return cart.reduce((total, product) => {
      const productQuantity = quantities[product.id] || 1;  // Default quantity to 1
      return total + (product.amount * productQuantity);  // Price * quantity, use 'amount' to ensure consistency
    }, 0);
  };

  useEffect(() => {
    setQuantities(cart.reduce((acc, product) => {
      acc[product.id] = quantities[product.id] || 1;
      return acc;
    }, {}));
  }, [cart, quantities]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty!</p>
      ) : (
        <div>
          <div className="space-y-4">
            {cart.map((product) => (
              <div key={product.id} className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center">
                  {/* Display Product Image */}
                  <img 
                    src={`http://127.0.0.1:8000/api${product.image}`}  // Same image URL as in ProductList
                    alt={product.name} 
                    className="w-16 h-16 mr-4"
                  />
                  <div>
                    <h2 className="font-semibold">{product.name}</h2>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={quantities[product.id] || 1}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(product.id, e.target.value)
                    }
                    className="w-12 p-2 text-center border"
                  />
                  <span className="ml-4 font-bold text-xl">${(product.amount * (quantities[product.id] || 1)).toFixed(2)}</span>
                  <button
                    className="ml-4 text-red-500"
                    onClick={() => removeFromCart(product.id)}  // Remove product from the cart
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <h2 className="font-bold text-xl">Total: ${getTotalPrice().toFixed(2)}</h2>
            <button 
              className="mt-4 bg-blue-500 text-white py-2 px-6 rounded"
              onClick={handleProceedToCheckout}  // Button to proceed to checkout
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;





