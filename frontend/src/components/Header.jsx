import React from 'react';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-1px' }}>MY NOTES</h1>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search" 
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '2rem', border: 'none', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', outline: 'none' }}
          />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{localStorage.getItem('userName') || 'User'}</span>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ffb499', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            {(localStorage.getItem('userName') || 'U')[0].toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
