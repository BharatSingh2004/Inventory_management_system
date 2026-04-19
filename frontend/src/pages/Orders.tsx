import { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../contexts/AuthContext';
import { Plus } from 'lucide-react';

const Orders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState('1');
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, [token]);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data);
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      if(products.length > 0) setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
      setProducts(res.data);
      if(res.data.length > 0) setSelectedProduct(res.data[0].id.toString());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!selectedProduct) return alert("Select a product");
    try {
      await api.post('/orders', {
        items: [{
          productId: parseInt(selectedProduct),
          quantity: parseInt(orderQuantity)
        }]
      });
      setIsModalOpen(false);
      setOrderQuantity('1');
      fetchOrders();
    } catch (error: any) {
      console.error("Failed to create order", error);
      alert(error.response?.data?.error || "Failed to create order. Check stock levels.");
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '1rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, margin: 0 }}>Orders</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage customer and purchase orders</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          Create Order
        </button>
      </header>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', zIndex: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="glass-panel" style={{ width: '400px', padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>Create New Order</h2>
            {products.length === 0 ? (
              <p style={{ color: 'var(--warning)' }}>No products available. Add products first.</p>
            ) : (
             <form onSubmit={handleCreateOrder}>
               <div className="input-group">
                 <label className="input-label">Select Product</label>
                 <select className="input-field" value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} required>
                   {products.map(p => (
                     <option key={p.id} value={p.id}>{p.name} (₹{p.price} - Stock: {p.stockQuantity})</option>
                   ))}
                 </select>
               </div>
               <div className="input-group">
                 <label className="input-label">Quantity</label>
                 <input className="input-field" type="number" min="1" value={orderQuantity} onChange={e => setOrderQuantity(e.target.value)} required />
               </div>
               <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                 <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                 <button type="submit" className="btn btn-primary">Place Order</button>
               </div>
             </form>
            )}
            {products.length === 0 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        {loading ? (
          <div>Loading orders...</div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>No orders found</td>
                  </tr>
                ) : (
                  orders.map(o => (
                    <tr key={o.id}>
                      <td>#{o.id}</td>
                      <td>{new Date(o.orderDate).toLocaleDateString()}</td>
                      <td style={{ fontWeight: 500 }}>₹{o.totalAmount.toFixed(2)}</td>
                      <td>
                        <span className={`badge ${o.status === 'DELIVERED' ? 'badge-success' : 'badge-info'}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
