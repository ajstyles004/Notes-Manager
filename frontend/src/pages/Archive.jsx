import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import NoteCard from '../components/NoteCard';
import api from '../api';

const Archive = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => { fetchNotes(); }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await api.get('/notes?isArchived=true&isTrashed=false');
      setNotes(data);
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header />
      <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem', letterSpacing: '-0.5px' }}>Archived Notes</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', paddingBottom: '2rem' }}>
        {notes.length === 0 ? (
          <div style={{ color: 'var(--text-muted)' }}>No archived notes.</div>
        ) : (
          notes.map(note => <NoteCard key={note._id} note={note} onUpdate={fetchNotes} />)
        )}
      </div>
    </div>
  );
};
export default Archive;
