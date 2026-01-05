import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage (works everywhere)
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
      fetchStats(token);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      }
    } catch (err) {}
  };

  const fetchStats = async (token) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setStats(await res.json());
    } catch (err) {
      console.log('Stats unavailable');
    }
  };

  if (!user?.is_staff) return null;

  return (
    <div className="mb-12 p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl text-white shadow-2xl">
      <div className="flex flex-wrap gap-6 mb-6">
        <div className="bg-white/20 backdrop-blur p-6 rounded-2xl min-w-[140px]">
          <h3 className="text-lg font-semibold opacity-90">Users</h3>
          <p className="text-3xl font-bold">{stats.total_users || '—'}</p>
        </div>
        <div className="bg-white/20 backdrop-blur p-6 rounded-2xl min-w-[140px]">
          <h3 className="text-lg font-semibold opacity-90">Sellers</h3>
          <p className="text-3xl font-bold text-green-300">{stats.sellers || '—'}</p>
        </div>
        <div className="bg-white/20 backdrop-blur p-6 rounded-2xl min-w-[140px]">
          <h3 className="text-lg font-semibold opacity-90">Listings</h3>
          <p className="text-3xl font-bold text-yellow-300">{stats.listings || '—'}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="https://rentbackend-mfqg.onrender.com/admin/api/user/" target="_blank" rel="noopener noreferrer"
           className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-bold text-center transition-all">
          👥 Manage Users
        </a>
        <a href="https://rentbackend-mfqg.onrender.com/admin/api/rentspace/" target="_blank" rel="noopener noreferrer"
           className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-bold text-center transition-all">
          🏠 Manage Listings
        </a>
      </div>
    </div>
  );
};

export default AdminDashboard;
