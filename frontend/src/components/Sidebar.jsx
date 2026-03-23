import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Plus, Calendar, Archive, Trash, LogOut, CheckSquare, Moon, Sun } from 'lucide-react';

const Sidebar = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navItemStyle = (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    color: active ? 'var(--primary-btn)' : 'var(--text-muted)',
    fontWeight: '500',
    background: active ? 'var(--bg-primary)' : 'transparent',
    transition: 'all 0.2s',
  });

  return (
    <aside style={{ width: '260px', backgroundColor: 'var(--bg-sidebar)', borderRight: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem' }}>
      <div style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.75rem', letterSpacing: '-0.5px' }}>
        <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #111827, #374151)', color: 'white', fontSize: '0.85rem', fontWeight: 'bold', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
          NM
        </div>
        Notes Manager
      </div>

      <button onClick={() => navigate('/new-note')} className="shadow-hover" style={{ background: 'var(--text-main)', color: 'var(--bg-primary)', borderRadius: '2rem', padding: '0.875rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem', justifyContent: 'center', fontWeight: '600', fontSize: '0.95rem' }}>
        <Plus size={20} /> Add new
      </button>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
        <Link to="/" style={navItemStyle(isActive('/'))}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--note-yellow)' }}></div> Notes
        </Link>
        <Link to="/todos" style={navItemStyle(isActive('/todos'))}>
          <CheckSquare size={18} /> Todos
        </Link>
        <Link to="/calendar" style={navItemStyle(isActive('/calendar'))}>
          <Calendar size={18} /> Calendar
        </Link>
        <Link to="/archive" style={navItemStyle(isActive('/archive'))}>
          <Archive size={18} /> Archive
        </Link>
        <Link to="/trash" style={navItemStyle(isActive('/trash'))}>
          <Trash size={18} /> Trash
        </Link>
      </nav>

      <button onClick={toggleTheme} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontWeight: '600', padding: '1rem' }}>
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />} {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>

      <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--note-red)', fontWeight: '600', padding: '1rem', marginTop: '0.5rem' }}>
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
