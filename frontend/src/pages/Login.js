import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(email, password);
    if (result.success) navigate('/feed');
    else setError(result.message);
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', boxShadow: '0 2px 12px var(--shadow)', borderRadius: '12px', backgroundColor: 'var(--surface)' }}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12
        }}
      >
        <img 
          src="/logo192.png" 
          alt="LINKOVA Logo"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(10, 102, 194, 0.2)'
          }}
        />
        <h2 
          style={{ 
            color: 'var(--primary-color)', 
            fontSize: '32px', 
            fontWeight: 700,
            margin: 0
          }}
        >
          LINKOVA
        </h2>
      </motion.div>
      {error && <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ color: 'var(--danger-color)', marginBottom: '20px', textAlign: 'center', padding: '12px', backgroundColor: '#ffe6e6', borderRadius: '6px', fontWeight: 500 }}
      >{error}</motion.div>}
      <form onSubmit={handleSubmit}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={{ marginBottom: '20px' }}
        >
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-primary)' }}>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1.5px solid var(--border-color)', borderRadius: '6px', fontSize: '15px' }} />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          style={{ marginBottom: '24px' }}
        >
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-primary)' }}>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1.5px solid var(--border-color)', borderRadius: '6px', fontSize: '15px' }} />
        </motion.div>
        <motion.button 
          type="submit" 
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ width: '100%', padding: '14px', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '16px', transition: 'all 0.2s' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </motion.button>
      </form>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-secondary)' }}
      >
        Don't have an account? <Link to="/signup" style={{ color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
      </motion.p>
    </motion.div>
  );
};

export default Login;
