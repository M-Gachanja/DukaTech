import React, { useState } from 'react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import './POSPage.css';

const SalesProcessing = ({ products, setProducts }) => {
  const [cart, setCart] = useState([]);
  const [currentSale, setCurrentSale] = useState({
    customer: '',
    paymentMethod: 'cash'
  });
  const [receipt, setReceipt] = useState(null);

  const addToCart = (product) => {
    if (product.quantity <= 0) return;
    
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    // Update product quantity
    setProducts(products.map(p =>
      p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
    ));
  };

  const removeFromCart = (id) => {
    const itemToRemove = cart.find(item => item.id === id);
    setCart(cart.filter(item => item.id !== id));
    
    // Return quantity to products
    setProducts(products.map(p =>
      p.id === id 
        ? { ...p, quantity: p.quantity + itemToRemove.quantity }
        : p
    ));
  };

  const updateCartItem = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    const originalProduct = products.find(p => p.id === id);
    const cartItem = cart.find(item => item.id === id);
    
    const quantityDifference = quantity - cartItem.quantity;
    
    if (originalProduct.quantity >= quantityDifference) {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
      
      setProducts(products.map(p =>
        p.id === id 
          ? { ...p, quantity: p.quantity - quantityDifference }
          : p
      ));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => 
      total + (item.price * item.quantity), 0).toFixed(2);
  };

  const completeSale = async () => {
    if (cart.length === 0) return;
    
    const saleData = {
      date: new Date().toISOString(),
      customer: currentSale.customer,
      paymentMethod: currentSale.paymentMethod,
      items: [...cart],
      total: calculateTotal()
    };
    
    try {
      // Save sale to Firestore
      await addDoc(collection(db, 'sales'), saleData);
      
      // Update product quantities in Firestore
      await Promise.all(
        cart.map(item => 
          updateDoc(doc(db, 'products', item.id), {
            quantity: products.find(p => p.id === item.id).quantity
          })
        )
      );
      
      setReceipt(saleData);
      setCart([]);
      setCurrentSale({ customer: '', paymentMethod: 'cash' });
    } catch (error) {
      console.error("Error completing sale: ", error);
    }
  };

  return (
    <div className="sales-processing">
      <h3>Sales Processing</h3>
      
      <div className="available-products">
        <h4>Available Products</h4>
        <div className="product-grid">
          {products.filter(p => p.quantity > 0).map(product => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => addToCart(product)}
            >
              <div>{product.name}</div>
              <div>${product.price}</div>
              <div>Qty: {product.quantity}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="current-sale">
        <h4>Current Sale</h4>
        <div className="sale-form">
          <div className="form-group">
            <label>Customer Name:</label>
            <input
              type="text"
              value={currentSale.customer}
              onChange={(e) => setCurrentSale({...currentSale, customer: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Payment Method:</label>
            <select
              value={currentSale.paymentMethod}
              onChange={(e) => setCurrentSale({...currentSale, paymentMethod: e.target.value})}
            >
              <option value="cash">Cash</option>
              <option value="card">Credit Card</option>
              <option value="mobile">Mobile Payment</option>
            </select>
          </div>
        </div>
        
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div>{item.name}</div>
              <div>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateCartItem(item.id, parseInt(e.target.value))}
                  min="1"
                />
              </div>
              <div>${(item.price * item.quantity).toFixed(2)}</div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
        
        <div className="sale-total">
          <h4>Total: ${calculateTotal()}</h4>
          <button 
            onClick={completeSale}
            disabled={cart.length === 0}
          >
            Complete Sale
          </button>
        </div>
      </div>
      
      {receipt && (
        <div className="receipt-modal">
          <div className="receipt-content">
            <h3>Receipt</h3>
            <div className="receipt-header">
              <div>DukaTech POS</div>
              <div>Date: {new Date(receipt.date).toLocaleString()}</div>
              <div>Receipt #: {receipt.id}</div>
            </div>
            <div className="receipt-items">
              {receipt.items.map(item => (
                <div key={item.id} className="receipt-item">
                  <div>{item.name} x {item.quantity}</div>
                  <div>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="receipt-total">
              <div>Total:</div>
              <div>${receipt.total}</div>
            </div>
            <div className="receipt-footer">
              <div>Payment Method: {receipt.paymentMethod}</div>
              <div>Thank you for your business!</div>
            </div>
            <button onClick={() => setReceipt(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesProcessing;