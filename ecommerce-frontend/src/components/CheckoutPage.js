
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const CheckoutPage = () => {
  const { cart, getTotalPrice } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: 'creditCard',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('access_token'); // Get the JWT token

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/place-order/',
        {
          products: cart.map((product) => ({
            product_id: product.id,
            quantity: 1, // Use the actual quantity if you're saving it in the cart
          })),
          user_data: formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data); // Log the response for debugging
      setIsSubmitted(true); // Set to true after order is placed successfully
    } catch (error) {
      console.error('Error placing the order', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center mb-4">Checkout</h1>

      {isSubmitted ? (
        <div className="text-center">
          <h2 className="text-xl">Thank you for your order!</h2>
          <p>Your order has been successfully placed.</p>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h2 className="text-xl">Order Summary</h2>
            <div>
              {cart.map((product) => (
                <div key={product.id} className="flex justify-between items-center p-4 border-b">
                  <div>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <span>${product.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <h2 className="font-bold text-xl mt-4">Total: ${getTotalPrice().toFixed(2)}</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-semibold">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border"
              />
            </div>

            <div>
              <label htmlFor="address" className="block font-semibold">Shipping Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-2 border"
              ></textarea>
            </div>

            <div>
              <label htmlFor="paymentMethod" className="block font-semibold">Payment Method</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full p-2 border"
              >
                <option value="creditCard">Credit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded mt-4">
              Place Order
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

