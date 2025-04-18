import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';  // Import the useCart hook
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);  // State for storing products
  const { addToCart } = useCart();  // Access the addToCart function from CartContext

  // Fetch product data from the backend when the component mounts
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/products/")
      .then(response => setProducts(response.data)) // Set the product data into state
      .catch(error => console.error("Error fetching products:", error)); // Handle any errors
  }, []);  // The empty dependency array ensures the request happens only once when the component mounts

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div key={product.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
          {/* Image with hover zoom effect */}
          <div className="relative">
            <img
  className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-110"
  src={`http://127.0.0.1:8000/api${product.image}`}  // Make sure this does not include an extra "/media/"
  alt={product.name}
/>



          </div>
          
          <div className="px-6 py-4">
            <h2 className="font-bold text-xl">{product.name}</h2>
            <p className="text-gray-700 text-base">{product.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-xl">${product.amount ? product.amount : "N/A"}</span>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => addToCart(product)}  // Add the product to the cart
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
