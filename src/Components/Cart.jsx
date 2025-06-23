import React from 'react';

const Cart = ({ cart, completeSale }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      )}
      <p><strong>Total: ${total.toFixed(2)}</strong></p>
      <button onClick={completeSale} disabled={cart.length === 0}>Complete Sale</button>
    </div>
  );
};

export default Cart;
