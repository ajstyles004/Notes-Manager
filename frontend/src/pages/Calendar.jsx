import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import api from '../api';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get('/events');
      setEvents(data);
    } catch (err) {
      console.error(err);
    }
  };

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDayClick = async (day) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const title = window.prompt(`Enter event title for ${formattedDate}:`);
    if (title) {
      const colors = ['#fde882', '#ffb499', '#d1f3b3', '#cbb2ff', '#70dfff', '#ff9e9e'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      try {
        await api.post('/events', { title, date: formattedDate, color });
        fetchEvents();
      } catch (err) {
        alert('Failed to save event');
      }
    }
  };

  const getEventsForDay = (day) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === formattedDate);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>Calendar</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={prevMonth} className="shadow-hover" style={{ padding: '0.5rem', borderRadius: '50%', background: 'white' }}><ChevronLeft /></button>
          <span style={{ fontSize: '1.2rem', fontWeight: '600', minWidth: '150px', textAlign: 'center' }}>
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={nextMonth} className="shadow-hover" style={{ padding: '0.5rem', borderRadius: '50%', background: 'white' }}><ChevronRight /></button>
        </div>
      </div>

      <div className="glass shadow-soft" style={{ flex: 1, borderRadius: '1rem', padding: '2rem', display: 'flex', flexDirection: 'column', minHeight: '600px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1rem', textAlign: 'center', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1rem', flex: 1, gridAutoRows: '1fr' }}>
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '0.5rem' }}></div>
          ))}
          {Array.from({ length: days }).map((_, i) => {
            const day = i + 1;
            const dayEvents = getEventsForDay(day);
            const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;
            
            return (
              <div 
                key={day} 
                className="shadow-hover"
                onClick={() => handleDayClick(day)}
                style={{ 
                  background: isToday ? 'var(--text-main)' : Object.keys(dayEvents).length > 0 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)', 
                  color: isToday ? 'white' : 'var(--text-main)',
                  borderRadius: '0.5rem', 
                  padding: '0.5rem', 
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  border: isToday ? 'none' : '1px solid var(--border-light)',
                  minHeight: '80px'
                }}
              >
                <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{day}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', overflowY: 'auto', flex: 1 }}>
                  {dayEvents.map(e => (
                    <div key={e._id} style={{ background: e.color, color: '#111827', fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '600' }}>
                      {e.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default CalendarView;
