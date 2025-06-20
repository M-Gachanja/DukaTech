import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import './POSPage.css';

const SalesReports = () => {
  const [salesHistory, setSalesHistory] = useState([]);
  const [timeRange, setTimeRange] = useState('today');
  
  useEffect(() => {
    const fetchSales = async () => {
      let q;
      const now = new Date();
      
      switch(timeRange) {
        case 'today':
          const today = new Date(now.setHours(0, 0, 0, 0));
          q = query(collection(db, 'sales'), where('date', '>=', today.toISOString()));
          break;
        case 'week':
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          q = query(collection(db, 'sales'), where('date', '>=', weekAgo.toISOString()));
          break;
        case 'month':
          const monthAgo = new Date();
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          q = query(collection(db, 'sales'), where('date', '>=', monthAgo.toISOString()));
          break;
        default:
          q = collection(db, 'sales');
      }
      
      const querySnapshot = await getDocs(q);
      const salesData = [];
      querySnapshot.forEach((doc) => {
        salesData.push({ id: doc.id, ...doc.data() });
      });
      setSalesHistory(salesData);
    };
    
    fetchSales();
  }, [timeRange]);
  
  const calculateReportTotals = (sales) => {
    return {
      totalSales: sales.length,
      totalRevenue: sales.reduce((sum, sale) => sum + parseFloat(sale.total), 0).toFixed(2),
      averageSale: sales.length > 0 
        ? (sales.reduce((sum, sale) => sum + parseFloat(sale.total), 0) / sales.length).toFixed(2)
        : '0.00'
    };
  };
  
  const filteredSales = salesHistory;
  const totals = calculateReportTotals(filteredSales);
  
  return (
    <div className="sales-reports">
      <h3>Sales Reports</h3>
      
      <div className="report-controls">
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="all">All Time</option>
        </select>
      </div>
      
      <div className="report-summary">
        <div className="summary-card">
          <h4>Total Sales</h4>
          <div>{totals.totalSales}</div>
        </div>
        <div className="summary-card">
          <h4>Total Revenue</h4>
          <div>${totals.totalRevenue}</div>
        </div>
        <div className="summary-card">
          <h4>Average Sale</h4>
          <div>${totals.averageSale}</div>
        </div>
      </div>
      
      <div className="sales-list">
        <h4>Recent Transactions</h4>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Receipt #</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.slice(0, 10).map(sale => (
              <tr key={sale.id}>
                <td>{new Date(sale.date).toLocaleDateString()}</td>
                <td>{sale.id}</td>
                <td>{sale.customer || 'Walk-in'}</td>
                <td>{sale.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                <td>${sale.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesReports;