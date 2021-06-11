import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/common/Navbar';
import MainContent from './components/main-content/MainContent';
import CountryPage from './components/country-page/CountryPage';

function App() {
  const [isDarkTheme, setTheme] = useState(localStorage.getItem('theme-color') === 'dark');
  const [countriesList, setCountriesData] = useState([]);

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
    <Router>
      <Navbar themeEventHandler={themeEventHandler} isDarkTheme={isDarkTheme} />
      <Switch>
        <Route path="/country/:code">
          <CountryPage countriesList={countriesList} />
        </Route>
        <Route path="/">
          <MainContent sendCountriesList={data => setCountriesData(data)} isDarkTheme={isDarkTheme} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;