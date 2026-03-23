import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.user.name);
      navigate('/');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <div style={{ display: 'flex', flex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-primary)', overflow: 'hidden' }}>
      <div className="glass shadow-soft" style={{ padding: '3rem', borderRadius: '1rem', width: '400px' }}>
        <h2 style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '1.75rem', fontWeight: '700' }}>Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <input 
            type="email" 
            placeholder="Email" 
            className="form-control"
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="form-control"
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" style={{ padding: '0.875rem', borderRadius: '0.5rem', background: 'var(--primary-btn)', color: 'white', fontWeight: '600', fontSize: '1rem' }}>
            Sign In
          </button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
