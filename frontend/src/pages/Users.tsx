import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Shield, UserPlus } from 'lucide-react';

const Users = () => {
  const { token, user: activeUser } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', role: 'STAFF' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/register', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsModalOpen(false);
      setFormData({ username: '', password: '', role: 'STAFF' });
      setError('');
      fetchUsers();
    } catch (err: any) {
      console.error("Failed to create user", err);
      setError(err.response?.data?.error || "Failed to create user");
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '1rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, margin: 0 }}>System Users</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage staff and administrator accounts</p>
        </div>
        {activeUser?.role === 'ADMIN' && (
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <UserPlus size={20} />
            Add User
          </button>
        )}
      </header>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', zIndex: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="glass-panel" style={{ width: '400px', padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>Create New User</h2>
            
            {error && (
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleCreate}>
              <div className="input-group">
                <label className="input-label">Username</label>
                <input required className="input-field" type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Password</label>
                <input required className="input-field" type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Role</label>
                <select className="input-field" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required>
                  <option value="STAFF">Staff</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => { setIsModalOpen(false); setError(''); }}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save User</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        {loading ? (
          <div>Loading users...</div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '2rem' }}>No users found</td>
                  </tr>
                ) : (
                  users.map(u => (
                    <tr key={u.id}>
                      <td>#{u.id}</td>
                      <td style={{ fontWeight: 500 }}>{u.username}</td>
                      <td>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {u.role === 'ADMIN' && <Shield size={16} className="text-gradient" />}
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-success">ACTIVE</span>
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

export default Users;
