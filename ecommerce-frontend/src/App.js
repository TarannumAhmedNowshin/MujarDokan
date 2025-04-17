import React from 'react';
import './styles/tailwind.css';
import ProductList from './components/ProductList';
import { useCart } from './context/CartContext'; // Import useCart hook

const App = () => {
  const { cart, getTotalPrice } = useCart();  // Get cart items and total price from context

  return (
    <div className="App">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-3xl">Welcome to Our E-Commerce Store</h1>
        <div className="flex justify-between mt-4">
          <span className="text-lg">Cart: {cart.length} items</span>
          <span className="text-lg">Total: ${getTotalPrice().toFixed(2)}</span>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <ProductList />
      </main>
    </div>
  );
};

export default App;

