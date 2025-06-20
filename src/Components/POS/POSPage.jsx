import React, { useState, useEffect } from 'react';
import Header from '../Shared/Header';
import ProductManagement from './ProductManagement';
import SalesProcessing from './SalesProcessing';
import InventoryDashboard from './InventoryDashboard';
import SalesReports from './SalesReports';
import './POSPage.css';

const POSPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = [];
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  return (
    <div className="pos-container">
      <Header />
      
      <div className="pos-content">
        <div className="pos-left-panel">
          <ProductManagement products={products} setProducts={setProducts} />
          <InventoryDashboard products={products} />
        </div>
        
        <div className="pos-right-panel">
          <SalesProcessing products={products} setProducts={setProducts} />
          <SalesReports />
        </div>
      </div>
    </div>
  );
};

export default POSPage;