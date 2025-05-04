const API_BASE = 'http://localhost:5502'; // Change to your backend URL
const token = localStorage.getItem('token'); // Assumes JWT is stored here

const usersTab = document.getElementById('usersTab');
const productsTab = document.getElementById('productsTab');
const errorDiv = document.getElementById('error');
const tableContainer = document.getElementById('tableContainer');

let currentTab = 'users';

usersTab.onclick = () => { currentTab = 'users'; loadTab(); };
productsTab.onclick = () => { currentTab = 'products'; loadTab(); };

function setError(msg) {
  errorDiv.textContent = msg || '';
}

async function fetchData(endpoint) {
  setError('');
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }
    return await res.json();
  } catch (err) {
    setError(err.message);
    return [];
  }
}

async function deleteItem(endpoint, id, reloadFn) {
  if (!confirm('Are you sure you want to delete this item?')) return;
  try {
    const res = await fetch(`${API_BASE}${endpoint}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }
    reloadFn();
  } catch (err) {
    setError(err.message);
  }
}

async function loadUsers() {
  const users = await fetchData('/admin/users');
  let html = `
    <table>
      <thead>
        <tr>
          <th>ID</th><th>Email</th><th>Name</th><th>Role</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${users.map(u => `
          <tr>
            <td>${u.id}</td>
            <td>${u.email}</td>
            <td>${u.name}</td>
            <td>${u.role}</td>
            <td>
              <button data-user-id="${u.id}" class="delete-user-btn">Delete</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  tableContainer.innerHTML = html;
  document.querySelectorAll('.delete-user-btn').forEach(btn => {
    btn.onclick = () => deleteItem('/admin/users', btn.getAttribute('data-user-id'), loadUsers);
  });
}

async function loadProducts() {
  const products = await fetchData('/admin/products');
  let html = `
    <table>
      <thead>
        <tr>
          <th>ID</th><th>Name</th><th>Price</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${products.map(p => `
          <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>
              <button data-product-id="${p.id}" class="delete-product-btn">Delete</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  tableContainer.innerHTML = html;
  document.querySelectorAll('.delete-product-btn').forEach(btn => {
    btn.onclick = () => deleteItem('/admin/products', btn.getAttribute('data-product-id'), loadProducts);
  });
}

function loadTab() {
  if (currentTab === 'users') loadUsers();
  else loadProducts();
}

// Initial load
loadTab();
