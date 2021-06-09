import React, { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import MainContent from './components/MainContent';

function App() {
  const [isDarkTheme, setTheme] = useState(localStorage.getItem('theme-color') === 'dark');

  function themeEventHandler(e) {
    e.preventDefault();
    setTheme(!isDarkTheme);
  }

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }
    localStorage.setItem('theme-color', isDarkTheme ? 'dark' : 'light');
  });

  return (
    <div>
      <Navbar themeEventHandler={themeEventHandler} isDarkTheme={isDarkTheme} />
      <MainContent />
    </div>
  );
}

export default App;
