import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from './context/CartContext';
import './styles/tailwind.css';

ReactDOM.render(
  <CartProvider>
    <App />
  </CartProvider>,
  document.getElementById("root")
);

