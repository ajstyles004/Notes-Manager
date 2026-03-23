import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import api from '../api';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => { fetchTodos(); }, []);

  const fetchTodos = async () => {
    try {
      const { data } = await api.get('/todos');
      setTodos(data);
    } catch (err) { console.error(err); }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const { data } = await api.post('/todos', { text });
      setTodos([data, ...todos]);
      setText('');
    } catch (err) { console.error(err); }
  };

  const toggleComplete = async (todo) => {
    try {
      const { data } = await api.put(`/todos/${todo._id}`, { isCompleted: !todo.isCompleted });
      setTodos(todos.map(t => t._id === todo._id ? data : t));
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter(t => t._id !== id));
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header />
      <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem', letterSpacing: '-0.5px' }}>My Todos</h2>
      
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
        <input 
          type="text" 
          placeholder="What needs to be done?" 
          value={text} 
          onChange={e => setText(e.target.value)}
          style={{ flex: 1, padding: '1.25rem', fontSize: '1.1rem', borderRadius: '1rem', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', outline: 'none' }}
        />
        <button type="submit" className="shadow-hover" style={{ background: 'var(--text-main)', color: 'white', padding: '0 2.5rem', borderRadius: '1rem', fontWeight: 'bold', fontSize: '1.1rem' }}>Add Todo</button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {todos.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No pending tasks!</p>}
        {todos.map(todo => (
          <div key={todo._id} className="glass shadow-hover" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', borderRadius: '1rem', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', flex: 1 }} onClick={() => toggleComplete(todo)}>
              {todo.isCompleted ? <CheckCircle color="var(--note-green)" size={28} /> : <Circle color="var(--text-muted)" size={28} />}
              <span style={{ fontSize: '1.15rem', textDecoration: todo.isCompleted ? 'line-through' : 'none', opacity: todo.isCompleted ? 0.5 : 1, fontWeight: '500' }}>
                {todo.text}
              </span>
            </div>
            <button onClick={() => handleDelete(todo._id)} style={{ color: 'var(--note-red)', padding: '0.5rem', borderRadius: '50%', background: 'rgba(255,158,158,0.1)' }}>
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
