import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './scss/App.scss';

import Navbar from './components/common/Navbar';
import MainContent from './components/main-content/MainContent';
import CountryPage from './components/country-page/CountryPage';

export const ThemeContext = createContext();

function App() {
  const [isDarkTheme, setDarkTheme] = useState(localStorage.getItem('theme-color') === 'dark');

  function themeEventHandler() {
    setDarkTheme(prevTheme => !prevTheme);
  }

  useEffect(() => {
    isDarkTheme ? document.body.classList.add('theme-dark') : document.body.classList.remove('theme-dark');
    localStorage.setItem('theme-color', isDarkTheme ? 'dark' : 'light');
  });

  return (
    <ThemeContext.Provider value={isDarkTheme}>
      <BrowserRouter>
        <Navbar themeEventHandler={themeEventHandler} />
        <Routes>
          <Route path="/country/:code" element={<CountryPage />} />
          <Route path="/" element={<MainContent />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
