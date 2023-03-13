import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MainContent from './components/main-content/MainContent'
import CountryPage, { loader as countryPageLoader } from './components/country-page/CountryPage'
import Error from './components/common/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainContent />,
    errorElement: <MainContent />
  },
  {
    path: '/country/:code',
    element: <CountryPage />,
    loader: countryPageLoader,
    errorElement: <Error />
  }
])

export default router
