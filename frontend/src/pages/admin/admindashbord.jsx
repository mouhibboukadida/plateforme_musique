import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, Calendar, Music2 } from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    invited: 0,
    joined: 0,
    today: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentEntries, setRecentEntries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/waitlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = response.data.data;
      
      // Statistiques
      const today = new Date().toISOString().split('T')[0];
      const todayEntries = data.filter(entry => 
        entry.created_at?.split('T')[0] === today
      );

      setStats({
        total: data.length,
        pending: data.filter(i => i.status === 'pending').length,
        invited: data.filter(i => i.status === 'invited').length,
        joined: data.filter(i => i.status === 'joined').length,
        today: todayEntries.length
      });

      // Derniers inscrits
      setRecentEntries(data.slice(0, 5));

    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      label: 'Total Subscribers', 
      value: stats.total, 
      icon: Users, 
      color: 'primary',
      bg: 'bg-primary/10',
      textColor: 'text-primary'
    },
    { 
      label: 'Pending', 
      value: stats.pending, 
      icon: UserX, 
      color: 'yellow',
      bg: 'bg-yellow-500/10',
      textColor: 'text-yellow-400'
    },
    { 
      label: 'Invited', 
      value: stats.invited, 
      icon: UserCheck, 
      color: 'secondary',
      bg: 'bg-secondary/10',
      textColor: 'text-secondary'
    },
    { 
      label: 'Joined', 
      value: stats.joined, 
      icon: UserCheck, 
      color: 'accent',
      bg: 'bg-accent/10',
      textColor: 'text-accent'
    },
    { 
      label: 'Today\'s Signups', 
      value: stats.today, 
      icon: Calendar, 
      color: 'blue',
      bg: 'bg-blue-500/10',
      textColor: 'text-blue-400'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-400">
          Welcome back! Here's what's happening with your waitlist.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-panel p-4 md:p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.textColor}`} />
              </div>
              <div className="min-w-0">
                <p className="text-gray-400 text-xs md:text-sm truncate">{stat.label}</p>
                <p className="text-xl md:text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Entries */}
      <div className="glass-panel rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          Recent Subscribers
        </h2>
        
        {recentEntries.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Music2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No subscribers yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr className="text-left text-gray-400 text-sm">
                  <th className="pb-3 px-2">Name</th>
                  <th className="pb-3 px-2 hidden sm:table-cell">Email</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2 hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentEntries.map((entry, index) => (
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-all"
                  >
                    <td className="py-3 px-2 text-white font-medium">{entry.name}</td>
                    <td className="py-3 px-2 text-gray-300 hidden sm:table-cell">{entry.email}</td>
                    <td className="py-3 px-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        entry.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        entry.status === 'invited' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-gray-400 hidden md:table-cell">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {recentEntries.length > 0 && (
          <div className="mt-4 text-center">
            <a
              href="/admin/waitlist"
              className="text-primary hover:text-primary/80 text-sm font-medium transition-all"
            >
              View All →
            </a>
          </div>
        )}
      </div>
    </div>
  );
};