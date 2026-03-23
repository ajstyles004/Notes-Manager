import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import api from '../api';

const NoteEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#fde882');
  const navigate = useNavigate();

  const colors = ['#fde882', '#ffb499', '#d1f3b3', '#cbb2ff', '#70dfff', '#ff9e9e'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/notes', { title, content, color, isPinned: false });
      navigate('/');
    } catch (err) {
      alert('Failed to save note');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <div className="glass shadow-hover" style={{ backgroundColor: color, borderRadius: '1.5rem', padding: '3rem', position: 'relative' }}>
        <button onClick={() => navigate('/')} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(0,0,0,0.1)', borderRadius: '50%', padding: '0.5rem', display: 'flex', alignItems: 'center' }}>
          <X size={20} />
        </button>
        
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem', letterSpacing: '-0.5px' }}>New Note</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <input 
            type="text" 
            placeholder="Note Title..." 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            style={{ fontSize: '1.5rem', fontWeight: '600', padding: '0.5rem 0', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(0,0,0,0.1)' }}
            required
          />
          <textarea 
            placeholder="Write your thoughts here..." 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            style={{ fontSize: '1.1rem', minHeight: '300px', padding: '1rem 0', background: 'transparent', border: 'none', resize: 'vertical', lineHeight: '1.6' }}
            required
          />
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {colors.map(c => (
                <div 
                  key={c} 
                  onClick={() => setColor(c)}
                  style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: c, border: color === c ? '3px solid #111827' : '2px solid rgba(0,0,0,0.05)', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: 'transform 0.1s' }}
                />
              ))}
            </div>
            <button type="submit" style={{ background: '#111827', color: 'white', padding: '0.875rem 2rem', borderRadius: '2rem', fontWeight: '600', fontSize: '1rem', letterSpacing: '0.5px' }}>
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteEditor;
