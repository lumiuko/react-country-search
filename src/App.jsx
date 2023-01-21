import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'

import './scss/App.scss'
import Navbar from './components/common/Navbar'
import router from './router'

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
