import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const { login, signup } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (isSignup && !form.name) {
      setError('Please enter your name');
      return;
    }

    setLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      if (isSignup) {
        signup(form.email, form.password, form.name);
      } else {
        login(form.email, form.password, form.name);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Animated Background */}
      <div className="login-bg">
        <motion.div 
          className="login-bg-circle login-bg-circle-1" 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="login-bg-circle login-bg-circle-2" 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="login-bg-circle login-bg-circle-3" 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div 
        className="login-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo & Welcome */}
        <div className="login-header">
          <motion.div 
            className="login-logo"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            🏋️‍♂️
          </motion.div>
          <h1 className="login-title">
            Fit<span className="text-gradient">Bharat</span>
          </h1>
          <AnimatePresence mode="wait">
            <motion.p 
              key={isSignup ? 'signup' : 'login'}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="login-subtitle"
            >
              {isSignup ? 'Create your account to start your fitness journey 🚀' : 'Welcome back! Ready to crush your goals? 💪'}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Login/Signup Card */}
        <div className="login-card">
          {/* Tab Toggle */}
          <div className="login-tabs">
            <button
              className={`login-tab ${!isSignup ? 'active' : ''}`}
              onClick={() => { setIsSignup(false); setError(''); }}
            >
              Login
            </button>
            <button
              className={`login-tab ${isSignup ? 'active' : ''}`}
              onClick={() => { setIsSignup(true); setError(''); }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Name (signup only) */}
            <AnimatePresence>
              {isSignup && (
                <motion.div 
                  initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginBottom: 16 }}
                  exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                  style={{ overflow: 'hidden' }}
                  className="login-input-group"
                >
                  <div className="login-input-icon">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="login-input"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div className="login-input-group">
              <div className="login-input-icon">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="login-input"
              />
            </div>

            {/* Password */}
            <div className="login-input-group">
              <div className="login-input-icon">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="login-input"
              />
              <button
                type="button"
                className="login-input-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="login-error"
                >
                  ⚠️ {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn btn-primary btn-full btn-lg login-submit"
              disabled={loading}
            >
              {loading ? (
                <div className="login-spinner" />
              ) : (
                isSignup ? 'Create Account 🚀' : 'Login →'
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="login-divider">
            <span>or continue with</span>
          </div>

          {/* Social Login */}
          <div className="login-social">
            <motion.button
              whileHover={{ y: -2 }}
              className="login-social-btn"
              onClick={() => login('guest@fitbharat.in', 'guest123', 'Guest User')}
            >
              🎯 Guest Mode
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              className="login-social-btn"
              onClick={() => login('demo@fitbharat.in', 'demo123', 'Demo User')}
            >
              👤 Demo Account
            </motion.button>
          </div>
        </div>

        {/* Footer */}
        <p className="login-footer">
          Made with ❤️ in India 🇮🇳
        </p>
      </motion.div>
    </div>
  );
}
