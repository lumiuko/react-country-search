import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './scss/App.scss';

import Navbar from './components/common/Navbar';
import MainContent from './components/main-content/MainContent';
import CountryPage from './components/country-page/CountryPage';

function App() {
  const [isDarkTheme, setDarkTheme] = useState(localStorage.getItem('theme-color') === 'dark');

  function themeEventHandler(event) {
    event.preventDefault();
    setDarkTheme(prevTheme => !prevTheme);
  }

  useEffect(() => {
    isDarkTheme ? document.body.classList.add('theme-dark') : document.body.classList.remove('theme-dark');
    localStorage.setItem('theme-color', isDarkTheme ? 'dark' : 'light');
  });

  return (
    <Router>
      <Navbar themeEventHandler={themeEventHandler} isDarkTheme={isDarkTheme} />
      <Switch>
        <Route path="/country/:code">
          <CountryPage />
        </Route>
        <Route path="/">
          <MainContent isDarkTheme={isDarkTheme} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
