import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, Settings } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const links = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/products', icon: <Package size={20} />, label: 'Products' },
    { to: '/orders', icon: <ShoppingCart size={20} />, label: 'Orders' },
    ...(user?.role === 'ADMIN' ? [{ to: '/users', icon: <Users size={20} />, label: 'Users' }] : [])
  ];

  return (
    <aside className="glass-panel" style={{ width: '260px', margin: '1rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--glass-border)' }}>
        <h2 className="text-gradient" style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Package size={24} />
          Bahi Khata
        </h2>
      </div>

      <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.2s',
                fontWeight: isActive ? 500 : 400
              }}
            >
              <div style={{ color: isActive ? 'var(--accent)' : 'inherit' }}>
                {link.icon}
              </div>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ marginBottom: '1rem', padding: '0 1rem' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{user?.username}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'inline-block', padding: '0.125rem 0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginTop: '0.25rem' }}>
            {user?.role}
          </div>
        </div>
        <button
          onClick={logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            width: '100%',
            background: 'transparent',
            border: 'none',
            color: 'var(--danger)',
            cursor: 'pointer',
            textAlign: 'left',
            borderRadius: '8px',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
