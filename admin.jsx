import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:5502'; 

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState('users');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token'); 

  useEffect(() => {
    if (tab === 'users') fetchUsers();
    else fetchProducts();

  }, [tab]);

  const fetchUsers = async () => {
    setError('');
    try {
      const res = await fetch(`${API_BASE}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchProducts = async () => {
    setError('');
    try {
      const res = await fetch(`${API_BASE}/admin/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(await res.text());
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(await res.text());
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>Admin Panel</h1>
      <div>
        <button onClick={() => setTab('users')}>Users</button>
        <button onClick={() => setTab('products')}>Products</button>
      </div>
      {error && <div style={{ color: 'red', margin: 16 }}>{error}</div>}
      {tab === 'users' ? (
        <table border="1" cellPadding="8" style={{ marginTop: 16 }}>
          <thead>
            <tr>
              <th>ID</th><th>Email</th><th>Name</th><th>Role</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>{u.name}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => deleteUser(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: 16 }}>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Price</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>
                  <button onClick={() => deleteProduct(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPanel;
