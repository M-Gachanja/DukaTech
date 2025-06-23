import React from 'react';

const Receipt = ({ items }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const date = new Date().toLocaleString();

  return (
    <div className="receipt">
      <h2>Receipt</h2>
      <p>{date}</p>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item.name} - ${item.price}</li>
        ))}
      </ul>
      <p><strong>Total: ${total.toFixed(2)}</strong></p>
    </div>
  );
};

export default Receipt;
