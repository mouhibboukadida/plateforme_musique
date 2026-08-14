
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2, Music2 } from 'lucide-react';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    if (!result.success) {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-panel p-8 rounded-3xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                <Music2 className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400">
              Sign in to manage your FAZA platform
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gray-300 text-sm font-medium mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="admin@faza.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-gray-300 text-sm font-medium mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-medium transition-all hover:bg-opacity-90 hover:shadow-[0_0_20px_rgba(108,99,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Demo credentials: admin@prod.com / admin123</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};