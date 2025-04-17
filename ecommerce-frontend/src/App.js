import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import Routes from react-router-dom
import './styles/tailwind.css';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';  // Import CheckoutPage component

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-3xl">Welcome to Our E-Commerce Store</h1>
        </header>

        <main className="container mx-auto p-4">
          <Routes>  {/* Use Routes to handle routing */}
            <Route path="/" element={<ProductList />} /> {/* Home page displaying the products */}
            <Route path="/cart" element={<CartPage />} />  {/* Cart page displaying the products in the cart */}
            <Route path="/checkout" element={<CheckoutPage />} />  {/* Checkout page */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
