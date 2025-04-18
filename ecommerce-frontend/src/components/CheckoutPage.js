import React, { useState } from 'react';
import { useCart } from '../context/CartContext';  // Import the useCart hook
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();  // Add clearCart from context if available
  const [error, setError] = useState('');
  const [quantities, setQuantities] = useState(
    cart.reduce((acc, product) => {
      acc[product.id] = 1; 
      return acc;
    }, {})
  );

  const navigate = useNavigate();  // Hook to programmatically navigate

  const handleQuantityChange = (productId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, parseInt(value)),
    }));
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post('http://127.0.0.1:8000/api/refresh-token/', { refresh_token: refreshToken });
      localStorage.setItem('access_token', response.data.access_token);  // Save the new access token
      return response.data.access_token;  // Return the new token
    } catch (error) {
      console.error('Error refreshing token', error);
      setError('Session expired. Please log in again.');
      return null;  // Return null if the refresh fails
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem('access_token');

    if (!token) {
      setError('Please log in to place an order');
      return;
    }

    // Calculate total amount
    const totalAmount = cart.reduce((total, product) => {
      const productQuantity = quantities[product.id] || 1;
      return total + (product.amount * productQuantity);
    }, 0);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/place-order/', 
        {
          products: cart.map((product) => ({
            product_id: product.id,
            quantity: quantities[product.id] || 1,
          })),
          total_amount: totalAmount,  // Sending the total amount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);
      clearCart();  // Clear the cart after successful order placement

      // Redirect to the shop page if order is placed successfully (status code 201)
      if (response.status === 201) {
        navigate('/shop');  // Redirect to shop page using useNavigate
      }
    } catch (error) {
      console.error('Error placing the order', error);

      // Log the error response to get more information
      if (error.response) {
        console.log('Error Response:', error.response);  // Log the full response from the backend
        setError(`Backend Error: ${error.response.data.error || 'An unknown error occurred'}`);
      } else {
        navigate('/shop');
      }

      // Handle token expiration
      if (error.response && error.response.data.code === 'token_not_valid') {
        setError('Your session has expired. Refreshing your token...');
        token = await refreshToken();  // Attempt to refresh the token

        if (token) {
          // Retry the order submission with the new token
          handleSubmit(e);
        } else {
          setError('Please log in again.');
        }
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center mb-4">Checkout</h1>

      <div className="mb-6">
        <h2 className="text-xl">Order Summary</h2>
        <div>
          {cart.map((product) => (
            <div key={product.id} className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center">
                {/* Display Product Image */}
                <img 
                  src={`http://127.0.0.1:8000/api${product.image}`}  // Accessing the image as in ProductList
                  alt={product.name} 
                  className="w-16 h-16 mr-4" 
                />
                <div>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  {/* Use 'amount' here for price */}
                  <span>${(product.amount * (quantities[product.id] || 1)).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h2 className="font-bold text-xl mt-4">Total: ${(cart.reduce((total, product) => {
          const productQuantity = quantities[product.id] || 1;
          return total + (product.amount * productQuantity);
        }, 0)).toFixed(2)}</h2> {/* Updated Total Calculation */}
      </div>

      <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-6 rounded mt-4">
        Place Order
      </button>

      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default CheckoutPage;
