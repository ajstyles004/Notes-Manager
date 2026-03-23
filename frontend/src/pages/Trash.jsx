import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import NoteCard from '../components/NoteCard';
import api from '../api';

const Trash = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => { fetchNotes(); }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await api.get('/notes?isTrashed=true');
      setNotes(data);
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>Trash</h2>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Deleted notes appear here.</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', paddingBottom: '2rem' }}>
        {notes.length === 0 ? (
          <div style={{ color: 'var(--text-muted)' }}>Trash is empty.</div>
        ) : (
          notes.map(note => <NoteCard key={note._id} note={note} onUpdate={fetchNotes} />)
        )}
      </div>
    </div>
  );
};
export default Trash;
