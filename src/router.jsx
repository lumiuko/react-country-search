import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MainContent, { loader as mainContentLoader } from './components/main-content/MainContent'
import CountryPage, { loader as countryPageLoader } from './components/country-page/CountryPage'
import Error from './components/common/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainContent />,
    loader: mainContentLoader,
    errorElement: <Error />
  },
  {
    path: '/country/:code',
    element: <CountryPage />,
    loader: countryPageLoader,
    errorElement: <Error />
  }
])

export default router
