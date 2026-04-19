import { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Trash2 } from 'lucide-react';

const Products = () => {
  const { token, user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', stockQuantity: '' });

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/products', {
        name: formData.name,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity),
        status: 'ACTIVE',
        categoryId: 1, // Seeded default
        supplierId: 1  // Seeded default
      });
      setIsModalOpen(false);
      setFormData({ name: '', price: '', stockQuantity: '' });
      fetchProducts();
    } catch (error) {
      console.error("Failed to create product", error);
      alert("Failed to create product. Make sure you are an admin.");
    }
  };

  const handleDelete = async (id: number) => {
    if(!confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete", error);
      alert("Failed to delete product. Only admins can delete.");
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '1rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, margin: 0 }}>Products</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your inventory items</p>
        </div>
        {user?.role === 'ADMIN' && (
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} />
            Add Product
          </button>
        )}
      </header>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', zIndex: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="glass-panel" style={{ width: '400px', padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>Create New Product</h2>
            <form onSubmit={handleCreate}>
              <div className="input-group">
                <label className="input-label">Product Name</label>
                <input required className="input-field" type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Price (₹)</label>
                <input required className="input-field" type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Initial Stock</label>
                <input required className="input-field" type="number" value={formData.stockQuantity} onChange={e => setFormData({...formData, stockQuantity: e.target.value})} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        {loading ? (
          <div>Loading products...</div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  {user?.role === 'ADMIN' && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={user?.role === 'ADMIN' ? 6 : 5} style={{ textAlign: 'center', padding: '2rem' }}>No products found</td>
                  </tr>
                ) : (
                  products.map(p => (
                    <tr key={p.id}>
                      <td>#{p.id}</td>
                      <td style={{ fontWeight: 500 }}>{p.name}</td>
                      <td>₹{p.price.toFixed(2)}</td>
                      <td>{p.stockQuantity}</td>
                      <td>
                        <span className={`badge ${p.stockQuantity < 10 ? 'badge-danger' : 'badge-success'}`}>
                          {p.stockQuantity < 10 ? 'LOW STOCK' : 'IN STOCK'}
                        </span>
                      </td>
                      {user?.role === 'ADMIN' && (
                        <td>
                          <button onClick={() => handleDelete(p.id)} className="btn btn-secondary" style={{ padding: '0.4rem', color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      )}
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

export default Products;
