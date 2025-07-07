import React, { useEffect, useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

// Mock WebSocket messages
const WS_MOCK_MESSAGES = [
  'Hello from server!',
  'New notification!',
  'Data updated!',
  'Another message!'
];

// Styles
const sectionStyle = { marginBottom: 24 };
const inputStyle = { padding: 8, fontSize: 16 };
const buttonStyle = { padding: 8, fontSize: 16 };
const wsBoxStyle = {
  border: '1px solid #ccc',
  padding: 12,
  minHeight: 60,
  background: '#fff',
  color: '#222',
};
const animatedBoxBase = {
  width: 100,
  height: 100,
  background: '#4f8cff',
  borderRadius: 16,
  margin: 'auto',
  transition: 'transform 0.5s',
};

// Helper to get and validate theme
const getInitialTheme = () => {
  const stored = localStorage.getItem('theme');
  return stored === 'dark' ? 'dark' : 'light';
};

const UseEffectRealCases = () => {
  // 1. Data Fetching
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Window Resize
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);

  // 3. Timer/Clock
  const [time, setTime] = useState(() => new Date());

  // 4. Input Focus
  const inputRef = useRef(null);

  // 5. Local Storage Sync
  const [theme, setTheme] = useState(getInitialTheme);

  // 6. WebSocket Simulation
  const [wsMessages, setWsMessages] = useState([]);
  const wsIntervalRef = useRef(null);

  // 7. Animation Trigger
  const [animate, setAnimate] = useState(false);

  // --- Effects ---

  // 1. Data Fetching
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        if (isMounted) {
          setUsers(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, []);

  // 2. Window Resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 3. Timer/Clock
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // 4. Input Focus
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // 5. Local Storage Sync
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 6. WebSocket Simulation (mock)
  useEffect(() => {
    wsIntervalRef.current = setInterval(() => {
      setWsMessages(msgs => [
        WS_MOCK_MESSAGES[Math.floor(Math.random() * WS_MOCK_MESSAGES.length)],
        ...msgs
      ].slice(0, 5));
    }, 3000);
    return () => clearInterval(wsIntervalRef.current);
  }, []);

  // 7. Animation Trigger
  useEffect(() => {
    setAnimate(true);
    return () => setAnimate(false);
  }, [users.length]);

  // --- Memoized Styles ---
  const containerStyle = useMemo(() => ({
    fontFamily: 'sans-serif',
    padding: 24,
    background: theme === 'dark' ? '#222' : '#f9f9f9',
    color: theme === 'dark' ? '#fff' : '#222',
    minHeight: '100vh',
    transition: 'background 0.3s, color 0.3s',
  }), [theme]);

  // --- Render ---

  return (
    <div style={containerStyle}>
      <h1>useEffect Real-World Cases</h1>

      {/* 1. Data Fetching */}
      <section style={sectionStyle}>
        <h2>1. Data Fetching (Users)</h2>
        {error ? (
          <div style={{ color: 'red' }}>Error: {error}</div>
        ) : loading ? (
          <div>Loading users...</div>
        ) : (
          <ul>
            {users.slice(0, 3).map(user => (
              <li key={user.id}>{user.name} ({user.email})</li>
            ))}
          </ul>
        )}
      </section>

      {/* 2. Window Resize */}
      <section style={sectionStyle}>
        <h2>2. Window Resize</h2>
        <div>Window width: <b>{windowWidth}px</b></div>
      </section>

      {/* 3. Timer/Clock */}
      <section style={sectionStyle}>
        <h2>3. Timer/Clock</h2>
        <div>Current time: <b>{time.toLocaleTimeString()}</b></div>
      </section>

      {/* 4. Input Focus */}
      <section style={sectionStyle}>
        <h2>4. Input Focus</h2>
        <input ref={inputRef} placeholder="I am auto-focused!" style={inputStyle} />
      </section>

      {/* 5. Local Storage Sync */}
      <section style={sectionStyle}>
        <h2>5. Local Storage Sync (Theme)</h2>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          style={buttonStyle}
          aria-label="Toggle theme"
        >
          Toggle Theme (Current: {theme})
        </button>
      </section>

      {/* 6. WebSocket Simulation */}
      <section style={sectionStyle}>
        <h2>6. WebSocket Simulation (Mock)</h2>
        <div style={wsBoxStyle}>
          {wsMessages.length === 0 ? (
            'No messages yet.'
          ) : (
            <ul>
              {wsMessages.map((msg, idx) => <li key={idx}>{msg}</li>)}
            </ul>
          )}
        </div>
      </section>

      {/* 7. Animation Trigger */}
      <section style={sectionStyle}>
        <h2>7. Animation Trigger</h2>
        <div
          style={{
            ...animatedBoxBase,
            transform: animate ? 'scale(1.1)' : 'scale(1)',
          }}
          aria-label="Animated box"
        />
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          {animate ? 'Animated!' : 'Waiting...'}
        </div>
      </section>
    </div>
  );
};

UseEffectRealCases.propTypes = {};

export default UseEffectRealCases; 