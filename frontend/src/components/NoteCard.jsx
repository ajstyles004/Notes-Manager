import React from 'react';
import { Edit2, Clock, Archive, Trash2, RefreshCcw } from 'lucide-react';
import api from '../api';

const NoteCard = ({ note, onUpdate }) => {
  const handleUpdateStatus = async (updateFields) => {
    try {
      await api.put(`/notes/${note._id}`, updateFields);
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error('Failed to update note status');
    }
  };

  const permaDelete = async () => {
    if(!window.confirm('Delete permanently?')) return;
    try {
      await api.delete(`/notes/${note._id}`);
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error('Failed to delete note');
    }
  };

  return (
    <div className="shadow-hover" style={{ 
      background: note.color || 'var(--note-yellow)', 
      color: '#111827',
      borderRadius: '1.25rem', 
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '260px',
      position: 'relative',
      transition: 'all 0.2s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h3 style={{ fontWeight: '700', fontSize: '1.15rem', lineHeight: '1.4', paddingRight: '4rem' }}>{note.title}</h3>
        <div style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', display: 'flex', gap: '0.4rem' }}>
          {note.isTrashed ? (
            <>
              <button title="Restore" onClick={() => handleUpdateStatus({ isTrashed: false, isArchived: false })} style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <RefreshCcw size={14} color="#111827" />
              </button>
              <button title="Delete Forever" onClick={permaDelete} style={{ background: '#ff9e9e', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trash2 size={14} />
              </button>
            </>
          ) : (
            <>
              {!note.isArchived ? (
                <button title="Archive" onClick={() => handleUpdateStatus({ isArchived: true })} style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Archive size={14} color="#111827" />
                </button>
              ) : (
                <button title="Unarchive" onClick={() => handleUpdateStatus({ isArchived: false })} style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <RefreshCcw size={14} color="#111827" />
                </button>
              )}
              <button title="Trash" onClick={() => handleUpdateStatus({ isTrashed: true, isArchived: false })} style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trash2 size={14} color="#111827" />
              </button>
            </>
          )}
        </div>
      </div>
      
      <p style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.8, flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', marginTop: '0.5rem' }}>
        {note.content || 'Empty note...'}
      </p>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', fontSize: '0.8rem', opacity: 0.7, fontWeight: '500' }}>
        <Clock size={14} />
        <span>{new Date(note.createdAt).toLocaleString([], { hour: '2-digit', minute: '2-digit', weekday: 'short' })}</span>
      </div>
    </div>
  );
};

export default NoteCard;
