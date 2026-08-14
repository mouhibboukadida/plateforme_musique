import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  LogOut, 
  Music2,
  Menu,
  X,
  UserCircle
} from 'lucide-react';

export const AdminLayout = () => {
  const { admin, logout, loading } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/waitlist', icon: Users, label: 'Waitlist' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-[#0a0d20] border-r border-white/10 p-6 flex-col">
        <div className="flex items-center gap-3 mb-10">
          <Music2 className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold text-white">
            FAZA<span className="text-accent">.</span>
          </span>
        </div>

        <div className="mb-6 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-xs text-gray-500">Logged in as</p>
          <p className="text-sm font-medium text-white truncate">{admin.name}</p>
          <p className="text-xs text-gray-400 truncate">{admin.email}</p>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive(item.path)
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-4"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#0a0d20] border-b border-white/10 p-4 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Music2 className="w-6 h-6 text-primary" />
          <span className="text-lg font-bold text-white">FAZA<span className="text-accent">.</span></span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white p-2"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[64px] bg-[#0a0d20] z-40 p-6 border-b border-white/10">
          <div className="mb-6 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-gray-500">Logged in as</p>
            <p className="text-sm font-medium text-white">{admin.name}</p>
            <p className="text-xs text-gray-400">{admin.email}</p>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </a>
            ))}
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 w-full"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="md:ml-64 pt-[64px] md:pt-0">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};