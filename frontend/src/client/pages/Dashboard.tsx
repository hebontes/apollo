import React from 'react'
import UserProvider from '../contexts/user'
import DashboardLayout from '../components/dashboard/DashboardLayout'

const DashboardPage = () => {
  return (
    <UserProvider>
      <DashboardLayout />
    </UserProvider>
  )
}

export default DashboardPage
