import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MainContent from './components/main-content/MainContent'
import CountryPage from './components/country-page/CountryPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainContent />,
    errorElement: <MainContent />
  },
  {
    path: '/country/:code',
    element: <CountryPage />
  }
])

export default router
