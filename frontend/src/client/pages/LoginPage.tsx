import React, { FC } from 'react'
import UserProvider from '../contexts/user'
import LoginLayout from '../components/users/LoginLayout'

interface Props {
  currentUrl?: string
}
const LoginPage: FC<Props> = ({ currentUrl }) => {
  return (
    <UserProvider page="login">
      <LoginLayout currentUrl={currentUrl} />
    </UserProvider>
  )
}

export default LoginPage
