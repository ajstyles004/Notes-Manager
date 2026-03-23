import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoteEditor from './pages/NoteEditor';
import Todos from './pages/Todos';
import Archive from './pages/Archive';
import Trash from './pages/Trash';
import CalendarView from './pages/Calendar';
import Sidebar from './components/Sidebar';
import './index.css';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/*" 
            element={
              <PrivateRoute>
                <Sidebar theme={theme} toggleTheme={toggleTheme} />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/new-note" element={<NoteEditor />} />
                    <Route path="/todos" element={<Todos />} />
                    <Route path="/archive" element={<Archive />} />
                    <Route path="/trash" element={<Trash />} />
                    <Route path="/calendar" element={<CalendarView />} />
                  </Routes>
                </main>
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
