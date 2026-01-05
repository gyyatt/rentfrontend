import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminRentSpaceList from '../pages/AdminRentSpaceList';  // ✅ Dedicated admin view

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users/`, { headers });
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch users');
    }
  };

  const makeSeller = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/users/make-seller/`, 
      { user_ids: selectedUsers }, { headers });
    fetchUsers();
  };

  if (loading) return <div className="text-center py-20 text-2xl">Loading Admin Panel...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 mb-12 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          👑 Superuser Admin Panel
        </h1>

        {/* 👥 USERS TABLE */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">👥 Users ({users.length})</h2>
            <button onClick={makeSeller} disabled={!selectedUsers.length} 
              className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-green-700">
              Make Seller
            </button>
          </div>
          {/* Simplified users table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead><tr className="bg-gray-50"><th className="p-4">Select</th><th>Username</th><th>Role</th></tr></thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="p-4"><input type="checkbox" /></td>
                    <td className="p-4 font-semibold">{user.username}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        user.is_staff ? 'bg-purple-100 text-purple-800' : 
                        user.is_seller ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.is_staff ? '👑 Admin' : user.is_seller ? '🏪 Seller' : '👤 Consumer'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ✅ SPACES - Full Admin Control */}
        <AdminRentSpaceList />
      </div>
    </div>
  );
};

export default AdminPanel;
