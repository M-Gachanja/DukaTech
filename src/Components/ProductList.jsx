import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductList.css'; 

const ProductList = ({ products, setProducts, addToCart }) => {
  const [form, setForm] = useState({ name: '', price: '', quantity: '' });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleAdd = () => {
    if (!form.name || !form.price || !form.quantity) {
      toast.warn("Please fill in all fields");
      return;
    }

    const newProduct = {
      id: Date.now(),
      ...form,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity)
    };
    setProducts([...products, newProduct]);
    toast.success(`${form.name} added successfully`);
    setForm({ name: '', price: '', quantity: '' });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      toast.error("Product deleted");
    }
  };

  const increaseQuantity = (id) => {
    const updated = products.map(p =>
      p.id === id ? { ...p, quantity: p.quantity + 1 } : p
    );
    setProducts(updated);
  };

  const decreaseQuantity = (id) => {
    const updated = products.map(p => {
      if (p.id === id) {
        if (p.quantity === 0) {
          toast.warn(`${p.name} is already at 0.`);
          return p;
        }
        return { ...p, quantity: p.quantity - 1 };
      }
      return p;
    });
    setProducts(updated);
  };

  return (
    <div className="product-list">
      <h2>Product Management</h2>
      <div className="form-row">
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
        <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Price" />
        <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="Quantity" />
        <button onClick={handleAdd}>Add Product</button>
      </div>

      <ul>
        {products.map(p => (
          <li key={p.id}>
            <strong>{p.name}</strong> - ${p.price.toFixed(2)} ({p.quantity} in stock)
            <div className="actions">
              <button onClick={() => decreaseQuantity(p.id)} disabled={p.quantity === 0}>−</button>
              <button onClick={() => increaseQuantity(p.id)}>+</button>
              <button onClick={() => addToCart(p)} disabled={p.quantity <= 0}>Add to Cart</button>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default ProductList;
