import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import Receipt from './Components/Receipt';
import Inventory from './Components/Inventory';
import Auth from './Components/Auth/Auth';
import PrivateRoute from './Components/Shared/PrivateRoute';
import HomePage from './Components/HomePage';
import ParticlesBackground from './Components/ParticlesBackground';

// POS Page with wave effect and localStorage logic
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
      <ParticlesBackground />
      {/* Wave animated background */}
      <div className="wave-background">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#0077b6"
            fillOpacity="1"
            d="M0,160L40,154.7C80,149,160,139,240,154.7C320,171,400,213,480,213.3C560,213,640,171,720,160C800,149,880,171,960,165.3C1040,160,1120,128,1200,106.7C1280,85,1360,75,1400,69.3L1440,64L1440,0L0,0Z"
          />
        </svg>
      </div>

      <Navbar />

      <main className="container">
        <h1>POS System</h1>
        <ProductList products={products} setProducts={setProducts} addToCart={addToCart} />
        <Cart cart={cart} completeSale={completeSale} />
        {receipt && <Receipt items={receipt} />}
        <Inventory products={products} />
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2023 DukaTech. All rights reserved.</p>
          <ul className="social-links">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
        </footer>
        <div className="wave-footer">
  <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
    <path
      fill="url(#gradientFooter)"
      fillOpacity="1"
      d="M0,224L60,213.3C120,203,240,181,360,176C480,171,600,181,720,197.3C840,213,960,235,1080,240C1200,245,1320,235,1380,229.3L1440,224L1440,320L0,320Z"
    />
    <defs>
      <linearGradient id="gradientFooter" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0077b6" />
        <stop offset="100%" stopColor="#00b4d8" />
      </linearGradient>
    </defs>
  </svg>
</div>
    </>
  );
};

// Main App with routes
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
