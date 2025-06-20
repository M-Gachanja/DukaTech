import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import './POSPage.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    quantity: 0,
    category: '',
    barcode: '',
    lowStockThreshold: 5
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        quantity: parseInt(newProduct.quantity),
        lastUpdated: serverTimestamp()
      };

      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), productData);
        setProducts(products.map(p => 
          p.id === editingId ? { ...productData, id: editingId } : p
        ));
      } else {
        const docRef = await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: serverTimestamp()
        });
        setProducts([...products, { ...productData, id: docRef.id }]);
      }
      
      resetForm();
    } catch (error) {
      console.error("Error saving product: ", error);
    }
  };

  // Reset form
  const resetForm = () => {
    setNewProduct({
      name: '',
      price: 0,
      quantity: 0,
      category: '',
      barcode: '',
      lowStockThreshold: 5
    });
    setEditingId(null);
  };

  // Handle inventory adjustments
  const adjustInventory = async (productId, adjustment) => {
    try {
      const product = products.find(p => p.id === productId);
      const newQuantity = product.quantity + adjustment;
      
      await updateDoc(doc(db, 'products', productId), {
        quantity: newQuantity,
        lastUpdated: serverTimestamp()
      });
      
      setProducts(products.map(p => 
        p.id === productId ? { ...p, quantity: newQuantity } : p
      ));
    } catch (error) {
      console.error("Error adjusting inventory: ", error);
    }
  };

  return (
    <div className="product-management">
      <h3>Inventory Management</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Product Name*</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Price*</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Current Stock*</label>
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Low Stock Threshold</label>
            <input
              type="number"
              name="lowStockThreshold"
              value={newProduct.lowStockThreshold}
              onChange={(e) => setNewProduct({...newProduct, lowStockThreshold: e.target.value})}
              min="1"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Barcode</label>
            <input
              type="text"
              name="barcode"
              value={newProduct.barcode}
              onChange={(e) => setNewProduct({...newProduct, barcode: e.target.value})}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
          {editingId && (
            <button 
              type="button" 
              onClick={resetForm}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="inventory-actions">
        <h4>Quick Inventory Adjustments</h4>
        <div className="inventory-grid">
          {products.map(product => (
            <div key={product.id} className="inventory-item">
              <div className="product-info">
                <span className="product-name">{product.name}</span>
                <span className="product-stock">
                  Stock: {product.quantity} {product.quantity <= product.lowStockThreshold && 
                    <span className="low-stock">(Low Stock!)</span>}
                </span>
              </div>
              <div className="adjustment-buttons">
                <button 
                  onClick={() => adjustInventory(product.id, 1)}
                  className="btn-increment"
                >
                  +
                </button>
                <button 
                  onClick={() => adjustInventory(product.id, -1)}
                  disabled={product.quantity <= 0}
                  className="btn-decrement"
                >
                  -
                </button>
                <button 
                  onClick={() => {
                    setNewProduct({
                      name: product.name,
                      price: product.price,
                      quantity: product.quantity,
                      category: product.category || '',
                      barcode: product.barcode || '',
                      lowStockThreshold: product.lowStockThreshold || 5
                    });
                    setEditingId(product.id);
                  }}
                  className="btn-edit"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;