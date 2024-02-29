import React, { FC, useContext } from 'react'
import { UserContext } from '../../contexts/user'

interface Props {
  currentUrl: string
}
const LoginLayout: FC<Props> = ({ currentUrl }) => {
  const { login } = useContext(UserContext)

  return <Login login={login} currentUrl={currentUrl} />
}

export default LoginLayout
