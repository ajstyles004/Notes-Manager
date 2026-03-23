import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/signup', { name, email, password });
      if (data.requireOtp) {
        setStep(2);
      }
    } catch (err) {
      alert('Signup failed: ' + (err.response?.data?.msg || err.message));
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/verify-otp', { email, otp });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.user.name);
      navigate('/');
    } catch (err) {
      alert('Verification failed: ' + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <div style={{ display: 'flex', flex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-primary)', overflow: 'hidden' }}>
      <div className="glass shadow-soft" style={{ padding: '3rem', borderRadius: '1rem', width: '400px' }}>
        <h2 style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '1.75rem', fontWeight: '700' }}>
          {step === 1 ? 'Create Account' : 'Enter OTP'}
        </h2>
        
        {step === 1 ? (
          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <input type="text" placeholder="Full Name" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
            <input type="email" placeholder="Email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required minLength="6" />
            <button type="submit" style={{ padding: '0.875rem', borderRadius: '0.5rem', background: 'var(--primary-btn)', color: 'var(--bg-primary)', fontWeight: '600', fontSize: '1rem' }}>
              Create Account
            </button>
            <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Already have an account? <Link to="/login" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>Log in</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '0.5rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
              We sent a 6-digit verification code to <strong>{email}</strong>.
            </p>
            <input 
              type="text" 
              placeholder="000000" 
              className="form-control" 
              value={otp} 
              onChange={e => setOtp(e.target.value)} 
              required 
              style={{ textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.25rem', padding: '1rem' }} 
              maxLength="6" 
            />
            <button type="submit" style={{ padding: '0.875rem', borderRadius: '0.5rem', background: 'var(--primary-btn)', color: 'var(--bg-primary)', fontWeight: '600', fontSize: '1rem' }}>
              Verify OTP
            </button>
            <button type="button" onClick={() => setStep(1)} style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'transparent', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}>
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
