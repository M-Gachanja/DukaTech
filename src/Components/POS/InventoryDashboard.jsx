import React from 'react';
import './POSPage.css';

const InventoryDashboard = ({ products }) => {
  const lowStockThreshold = 5;
  
  const lowStockItems = products.filter(p => p.quantity <= lowStockThreshold);
  
  return (
    <div className="inventory-dashboard">
      <h3>Inventory Status</h3>
      <div className="inventory-summary">
        <div>Total Products: {products.length}</div>
        <div>Low Stock Items: {lowStockItems.length}</div>
      </div>
      
      {lowStockItems.length > 0 && (
        <div className="low-stock-alert">
          <h4>Low Stock Warning</h4>
          <ul>
            {lowStockItems.map(item => (
              <li key={item.id}>
                {item.name} - Only {item.quantity} left!
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InventoryDashboard;