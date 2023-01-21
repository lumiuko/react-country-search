import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import './scss/App.scss'

import Navbar from './components/common/Navbar'
import MainContent from './components/main-content/MainContent'
import CountryPage from './components/country-page/CountryPage'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/country/:code" element={<CountryPage />} />
          <Route path="/" element={<MainContent />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
