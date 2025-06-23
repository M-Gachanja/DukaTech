import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import Navbar from './Components/Navbar';'./Components/Navbar.jsx';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import Receipt from './Components/Receipt';
import Inventory from './Components/Inventory';
import Auth from './Components/Auth/Auth';
import PrivateRoute from './Components/Shared/PrivateRoute';
import HomePage from './Components/HomePage';

// POS Page encapsulated with localStorage logic
const POSPage = () => {
  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem('products')) || [];
  });

  const [cart, setCart] = useState([]);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const completeSale = () => {
    const updatedProducts = products.map(p => {
      const sold = cart.filter(item => item.id === p.id).length;
      return { ...p, quantity: p.quantity - sold };
    });
    setProducts(updatedProducts);
    setReceipt(cart);
    setCart([]);
  };

  return (
    <>
    <Navbar />
    <main className="container">
      <h1>POS System</h1>
      <ProductList products={products} setProducts={setProducts} addToCart={addToCart} />
      <Cart cart={cart} completeSale={completeSale} />
      {receipt && <Receipt items={receipt} />}
      <Inventory products={products} />
    </main>
  </>
  );
};

// Main App with routing
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Auth />} />
          <Route
            path="/pos"
            element={
              <PrivateRoute>
                <POSPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
