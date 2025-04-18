import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // Import Link from react-router-dom
import LoginPage from './components/LoginPage';  // Import LoginPage component
import ProductList from './components/ProductList';  // Import ProductList component
import CartPage from './components/CartPage';  // Import CartPage component
import CheckoutPage from './components/CheckoutPage';  // Import CheckoutPage component
import LandingPage from './components/LandingPage';  // Import the LandingPage

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Header - Navigation Bar */}
        <header className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 fixed top-0 left-0 w-full p-4 z-50 shadow-md">
          <div className="flex justify-between items-center text-white">
            {/* Mujar Dokan - Link to Homepage */}
            <Link to="/" className="text-2xl font-semibold">Mujar Dokan</Link>

            {/* Navigation Links */}
            <div className="space-x-8">
              <a href="/why" className="text-white hover:text-yellow-400">WHY AYO</a>
              <a href="/shop" className="text-white hover:text-yellow-400">OUR SCIENCE</a>
              <a href="/success-stories" className="text-white hover:text-yellow-400">SUCCESS STORIES</a>
              <a href="/faq" className="text-white hover:text-yellow-400">FAQ</a>
            </div>

            {/* Cart & Shop Links */}
            <div className="flex items-center space-x-4">
              <a href="/shop" className="text-white hover:text-yellow-400">SHOP</a>
              <a href="/cart" className="bg-black text-yellow-400 py-2 px-6 rounded-full hover:bg-yellow-400 hover:text-black transition">CART</a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mt-24"> {/* Added margin-top to avoid overlap with fixed header */}
          <Routes>
            <Route path="/" element={<LandingPage />} />  {/* Landing Page as the homepage */}
            <Route path="/shop" element={<ProductList />} />  {/* Shop page showing the product list */}
            <Route path="/cart" element={<CartPage />} />  {/* Cart page */}
            <Route path="/checkout" element={<CheckoutPage />} />  {/* Checkout page */}
            <Route path="/login" element={<LoginPage />} />  {/* Login page */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
