import React from 'react';
import { useCart } from '../context/CartContext';  // Import the useCart hook

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 29.99,
    description: "This is a great product!",
    image: "/images/hearts.jpeg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 49.99,
    description: "Another amazing product.",
    image: "/images/mouth.jpeg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 19.99,
    description: "A fantastic product for your needs.",
    image: "/images/teddy.jpeg",
  },
];

const ProductList = () => {
  const { addToCart } = useCart();  // Access the addToCart function from CartContext

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div key={product.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
          {/* Image with hover zoom effect */}
          <div className="relative">
            <img
              className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-110"
              src={product.image}
              alt={product.name}
            />
          </div>
          
          <div className="px-6 py-4">
            <h2 className="font-bold text-xl">{product.name}</h2>
            <p className="text-gray-700 text-base">{product.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-xl">${product.price}</span>
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
