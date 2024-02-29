import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Error404 from './client/pages/error404'
import HomePage from './client/pages/Home'
import LoginPage from './client/pages/LoginPage'
import DashboardPage from './client/pages/Dashboard'

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRoutes
