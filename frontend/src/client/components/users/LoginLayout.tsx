import React, { FC, useContext } from 'react'
import { UserContext } from '../../contexts/user'
import LoginPage from '../../pages/LoginPage'

interface Props {
  currentUrl: string
}
const LoginLayout: FC<Props> = ({ currentUrl }) => {
  const { login } = useContext(UserContext)

  return <LoginPage login={login} currentUrl={currentUrl} />
}

export default LoginLayout
