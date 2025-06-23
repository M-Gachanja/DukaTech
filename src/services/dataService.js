// Helper functions to work with localStorage
const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  const loadData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };
  
  // Product operations
  export const getProducts = () => loadData('products');
  export const saveProduct = (product) => {
    const products = getProducts();
    if (product.id) {
      // Update existing product
      const index = products.findIndex(p => p.id === product.id);
      products[index] = product;
    } else {
      // Add new product
      product.id = Date.now().toString();
      products.push(product);
    }
    saveData('products', products);
    return product;
  };
  export const deleteProduct = (id) => {
    const products = getProducts().filter(p => p.id !== id);
    saveData('products', products);
  };
  
  // Sales operations
  export const getSales = () => loadData('sales');
  export const saveSale = (sale) => {
    const sales = getSales();
    sale.id = Date.now().toString();
    sale.date = new Date().toISOString();
    sales.push(sale);
    saveData('sales', sales);
    return sale;
  };