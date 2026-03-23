import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import NoteCard from '../components/NoteCard';
import api from '../api';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [noteTimeFilter, setNoteTimeFilter] = useState('All');
  const [folderTimeFilter, setFolderTimeFilter] = useState('All');

  useEffect(() => {
    fetchNotes();
    fetchFolders();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await api.get('/notes?isArchived=false&isTrashed=false');
      setNotes(data);
    } catch (err) {
      console.error('Failed to fetch notes', err);
    }
  };

  const fetchFolders = async () => {
    try {
      const { data } = await api.get('/folders');
      setFolders(data);
    } catch (err) {}
  };

  const handleAddFolder = async () => {
    const name = window.prompt('Enter new folder name:');
    if (!name) return;
    const colors = ['#fde882', '#ffb499', '#d1f3b3', '#cbb2ff', '#70dfff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    try {
      await api.post('/folders', { name, color });
      fetchFolders();
    } catch (err) {}
  };

  const filterData = (items, filter) => {
    if (filter === 'All') return items;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    
    return items.filter(i => {
      const t = new Date(i.createdAt).getTime();
      if (filter === 'Today') return t >= today;
      if (filter === 'This Week') return t >= today - (7 * 86400000);
      if (filter === 'This Month') return t >= new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).getTime();
      return true;
    });
  };

  const filteredNotes = filterData(notes, noteTimeFilter);
  const filteredFolders = filterData(folders, folderTimeFilter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header />
      
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Recent Folders</h2>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: '1rem' }}>
            <span onClick={() => setFolderTimeFilter('All')} style={{ color: folderTimeFilter === 'All' ? 'var(--text-main)' : 'inherit', borderBottom: folderTimeFilter === 'All' ? '2px solid var(--text-main)' : 'none', paddingBottom: '2px', cursor: 'pointer', fontWeight: '500' }}>All</span>
            <span onClick={() => setFolderTimeFilter('Today')} style={{ color: folderTimeFilter === 'Today' ? 'var(--text-main)' : 'inherit', borderBottom: folderTimeFilter === 'Today' ? '2px solid var(--text-main)' : 'none', paddingBottom: '2px', cursor: 'pointer', fontWeight: '500' }}>Todays</span>
            <span onClick={() => setFolderTimeFilter('This Week')} style={{ color: folderTimeFilter === 'This Week' ? 'var(--text-main)' : 'inherit', borderBottom: folderTimeFilter === 'This Week' ? '2px solid var(--text-main)' : 'none', paddingBottom: '2px', cursor: 'pointer', fontWeight: '500' }}>This Week</span>
            <span onClick={() => setFolderTimeFilter('This Month')} style={{ color: folderTimeFilter === 'This Month' ? 'var(--text-main)' : 'inherit', borderBottom: folderTimeFilter === 'This Month' ? '2px solid var(--text-main)' : 'none', paddingBottom: '2px', cursor: 'pointer', fontWeight: '500' }}>This Month</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {filteredFolders.map(folder => (
            <div key={folder._id} className="shadow-hover" style={{ minWidth: '220px', background: folder.color, padding: '1.5rem', borderRadius: '1rem', cursor: 'pointer' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{folder.name}</h3>
              <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>{new Date(folder.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
          <div className="shadow-hover" onClick={handleAddFolder} style={{ minWidth: '220px', background: 'transparent', border: '2px dashed var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', borderRadius: '1rem', cursor: 'pointer' }}>
             <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>+ New Folder</span>
          </div>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>My Notes</h2>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <span onClick={() => setNoteTimeFilter('All')} style={{ color: noteTimeFilter === 'All' ? 'var(--text-main)' : 'inherit', borderBottom: noteTimeFilter === 'All' ? '2px solid var(--text-main)' : 'none', paddingBottom: '2px', cursor: 'pointer', fontWeight: '500' }}>All</span>
            <span onClick={() => setNoteTimeFilter('Today')} style={{ color: noteTimeFilter === 'Today' ? 'var(--text-main)' : 'inherit', borderBottom: noteTimeFilter === 'Today' ? '2px solid var(--text-main)' : 'none', paddingBottom: '2px', cursor: 'pointer', fontWeight: '500' }}>Todays</span>
            <span onClick={() => setNoteTimeFilter('This Week')} style={{ color: noteTimeFilter === 'This Week' ? 'var(--text-main)' : 'inherit', borderBottom: noteTimeFilter === 'This Week' ? '2px solid var(--text-main)' : 'none', paddingBottom: '2px', cursor: 'pointer', fontWeight: '500' }}>This Week</span>
            <span onClick={() => setNoteTimeFilter('This Month')} style={{ color: noteTimeFilter === 'This Month' ? 'var(--text-main)' : 'inherit', borderBottom: noteTimeFilter === 'This Month' ? '2px solid var(--text-main)' : 'none', paddingBottom: '2px', cursor: 'pointer', fontWeight: '500' }}>This Month</span>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', paddingBottom: '2rem' }}>
          {filteredNotes.length === 0 ? (
            <div style={{ color: 'var(--text-muted)' }}>No notes found for this time period.</div>
          ) : (
            filteredNotes.map(note => (
              <NoteCard key={note._id} note={note} onUpdate={fetchNotes} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
