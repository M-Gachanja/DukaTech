import React from 'react';

const Inventory = ({ products }) => {
  return (
    <div>
      <h2>Inventory Status</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name}: {p.quantity} left {p.quantity <= 5 && <span style={{ color: 'red' }}> - Low Stock</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
