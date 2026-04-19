import { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../contexts/AuthContext';
import { Package, AlertTriangle, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, icon, trend }: { title: string, value: string | number, icon: React.ReactNode, trend?: string }) => (
  <div className="glass-panel" style={{ padding: '1.5rem', flex: 1, display: 'flex', alignItems: 'center', gap: '1.5rem', minWidth: '250px' }}>
    <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent)', padding: '1rem', borderRadius: '12px' }}>
      {icon}
    </div>
    <div>
      <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500, margin: '0 0 0.5rem 0' }}>{title}</h3>
      <div style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-main)' }}>{value}</div>
      {trend && <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.25rem' }}>{trend}</div>}
    </div>
  </div>
);

const Dashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState({ products: 0, lowStock: 0, value: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          api.get('/products'),
          api.get('/orders')
        ]);
        
        const products = productsRes.data;
        const orders = ordersRes.data;
        
        const activeProducts = products.filter((p: any) => p.status === 'ACTIVE' || !p.status);
        const stockAlerts = products.filter((p: any) => p.stockQuantity < 10);
        const totalValue = products.reduce((acc: number, p: any) => acc + (p.price * p.stockQuantity), 0);

        setStats({
          products: activeProducts.length || products.length,
          lowStock: stockAlerts.length,
          value: totalValue
        });

        const sortedOrders = orders.sort((a: any, b: any) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()).slice(0, 5);
        setRecentOrders(sortedOrders);

      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  return (
    <div className="animate-fade-in" style={{ padding: '1rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600, margin: 0 }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--text-muted)' }}>Welcome back. Here's what's happening with your inventory today.</p>
      </header>

      {loading ? (
        <div style={{ color: 'var(--text-muted)' }}>Loading dashboard data...</div>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <StatCard title="Total Products" value={stats.products} icon={<Package size={28} />} />
            <StatCard title="Low Stock Alerts" value={stats.lowStock} icon={<AlertTriangle size={28} />} />
            <StatCard title="Total Inventory Value" value={`₹${stats.value.toFixed(2)}`} icon={<DollarSign size={28} />} />
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1.5rem' }}>Recent Activity (Latest Orders)</h2>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            {recentOrders.length === 0 ? (
               <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>No recent activity to show.</div>
            ) : (
               <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge ${order.status === 'DELIVERED' ? 'badge-success' : 'badge-info'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ fontWeight: 500 }}>₹{order.totalAmount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
