import React, { useState } from 'react';

const ProductList = ({ products, setProducts, addToCart }) => {
  const [form, setForm] = useState({ name: '', price: '', quantity: '' });

  const handleAdd = () => {
    const newProduct = {
      id: Date.now(),
      ...form,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity)
    };
    setProducts([...products, newProduct]);
    setForm({ name: '', price: '', quantity: '' });
  };

  return (
    <div>
      <h2>Product Management</h2>
      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
      <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Price" />
      <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="Quantity" />
      <button onClick={handleAdd}>Add Product</button>

      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - ${p.price} ({p.quantity} in stock)
            <button disabled={p.quantity <= 0} onClick={() => addToCart(p)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
