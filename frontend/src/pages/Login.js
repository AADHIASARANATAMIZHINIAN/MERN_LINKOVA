import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

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
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', boxShadow: '0 2px 12px var(--shadow)', borderRadius: '12px', backgroundColor: 'var(--surface)' }}>
      <h2 style={{ textAlign: 'center', color: 'var(--primary-color)', marginBottom: '30px', fontSize: '32px', fontWeight: 700 }}>LINKOVA</h2>
      {error && <div style={{ color: 'var(--danger-color)', marginBottom: '20px', textAlign: 'center', padding: '12px', backgroundColor: '#ffe6e6', borderRadius: '6px', fontWeight: 500 }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-primary)' }}>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1.5px solid var(--border-color)', borderRadius: '6px', fontSize: '15px' }} />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-primary)' }}>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1.5px solid var(--border-color)', borderRadius: '6px', fontSize: '15px' }} />
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '16px', transition: 'all 0.2s' }}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-secondary)' }}>Don't have an account? <Link to="/signup" style={{ color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link></p>
    </div>
  );
};

export default Login;
