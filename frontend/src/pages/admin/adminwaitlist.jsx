import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Search, 
  Download, 
  Copy, 
  CheckCircle, 
  Trash2,
  RefreshCw,
  Users as UsersIcon
} from 'lucide-react';

export const AdminWaitlist = () => {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [copied, setCopied] = useState(false);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    let filtered = entries;
    if (search) {
      filtered = filtered.filter(
        entry =>
          entry.name.toLowerCase().includes(search.toLowerCase()) ||
          entry.email.toLowerCase().includes(search.toLowerCase()) ||
          entry.phone.includes(search)
      );
    }
    if (filterStatus !== 'all') {
      filtered = filtered.filter(entry => entry.status === filterStatus);
    }
    setFilteredEntries(filtered);
  }, [entries, search, filterStatus]);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/waitlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntries(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/waitlist/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchEntries();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdating(null);
    }
  };

  const deleteEntry = async (id) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/waitlist/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchEntries();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const copyEmails = () => {
    const emails = entries.map(entry => entry.email).join(', ');
    navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Status', 'Date'];
    const rows = entries.map(entry => [
      entry.name,
      entry.email,
      entry.phone,
      entry.status,
      new Date(entry.created_at).toLocaleDateString()
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
      invited: 'bg-blue-500/20 text-blue-400 border-blue-500/20',
      joined: 'bg-green-500/20 text-green-400 border-green-500/20'
    };
    return colors[status] || colors.pending;
  };

  const getStatusOptions = () => {
    return ['pending', 'invited', 'joined'];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Waitlist Management
          </h1>
          <p className="text-gray-400">
            {entries.length} total subscribers
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={copyEmails}
            className="flex items-center gap-2 px-4 py-2.5 glass-panel rounded-xl text-white hover:bg-white/10 transition-all text-sm"
          >
            {copied ? (
              <CheckCircle className="w-4 h-4 text-accent" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? 'Copied!' : 'Copy Emails'}
          </button>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2.5 glass-panel rounded-xl text-white hover:bg-white/10 transition-all text-sm"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>

          <button
            onClick={fetchEntries}
            className="flex items-center gap-2 px-4 py-2.5 glass-panel rounded-xl text-white hover:bg-white/10 transition-all text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-4 md:p-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search by name, email or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pl-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
              />
            </div>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm min-w-[150px]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="invited">Invited</option>
            <option value="joined">Joined</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <UsersIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg">No entries found</p>
              {search && <p className="text-sm">Try adjusting your search</p>}
            </div>
          ) : (
            <table className="w-full min-w-[700px]">
              <thead className="border-b border-white/10">
                <tr className="text-left text-gray-400 text-sm">
                  <th className="pb-3 px-3">Name</th>
                  <th className="pb-3 px-3 hidden sm:table-cell">Email</th>
                  <th className="pb-3 px-3 hidden md:table-cell">Phone</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3 hidden lg:table-cell">Date</th>
                  <th className="pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry, index) => (
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.02, 0.3) }}
                    className="border-b border-white/5 hover:bg-white/5 transition-all"
                  >
                    <td className="py-3 px-3 text-white font-medium">
                      {entry.name}
                    </td>
                    <td className="py-3 px-3 text-gray-300 hidden sm:table-cell text-sm">
                      {entry.email}
                    </td>
                    <td className="py-3 px-3 text-gray-400 hidden md:table-cell text-sm">
                      {entry.phone}
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={entry.status}
                        onChange={(e) => updateStatus(entry.id, e.target.value)}
                        disabled={updating === entry.id}
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(entry.status)} bg-transparent cursor-pointer focus:outline-none transition-all disabled:opacity-50`}
                      >
                        {getStatusOptions().map(status => (
                          <option key={status} value={status} className="bg-[#0a0d20] text-white">
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-3 text-gray-400 hidden lg:table-cell text-sm">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="text-red-400 hover:text-red-300 transition-all p-1.5 hover:bg-red-500/10 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {filteredEntries.length > 0 && (
          <div className="mt-4 text-sm text-gray-500 border-t border-white/5 pt-4">
            Showing {filteredEntries.length} of {entries.length} entries
          </div>
        )}
      </div>
    </div>
  );
};