import React, { useState, useEffect, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './scss/App.scss'

import Navbar from './components/common/Navbar'
import MainContent from './components/main-content/MainContent'
import CountryPage from './components/country-page/CountryPage'

export const ThemeContext = createContext()

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(localStorage.getItem('theme-color') === 'dark')

  function themeEventHandler() {
    setIsDarkTheme(prevTheme => !prevTheme)
  }

  useEffect(() => {
    document.body.className = isDarkTheme ? 'theme-dark' : ''
    localStorage.setItem('theme-color', isDarkTheme ? 'dark' : 'light')
  }, [isDarkTheme])

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
  )
}

export default App
