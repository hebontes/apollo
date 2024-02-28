import { useMutation, useQuery } from '@apollo/client'
import { getGraphQlError, redirectTo } from '@contentpi/lib'
import { createContext, FC, ReactElement, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import GET_USER_QUERY from '../graphql/user/getUser.query'
import LOGIN_MUTATION from '../graphql/user/login.mutation'

//interfaces
interface IUserContext {
  login(input: any): any
  connectedUser: any
}
interface IProps {
  children: ReactElement
  page?: string
}
// Creating Context
export const UserContext = createContext<IUserContext>({
  login: () => null,
  connectedUser: null,
})
const UserProvider: FC<IProps> = ({ page = '', children }) => {
  const [cookies, setCookie] = useCookies()
  const [connectedUser, setConnectedUser] = useState(null)
  // Mutations
  const [loginMutation] = useMutation(LOGIN_MUTATION)
  // Queries
  const { data: dataUser } = useQuery(GET_USER_QUERY, {
    variables: {
      at: cookies.at || '',
    },
  })
  // Effect
  useEffect(() => {
    if (dataUser) {
      if (!dataUser.getUser.id && page !== 'login') {
        // If the user session is invalid and is on a different page
        // than Login
        // We redirect them to Login
        redirectTo('/login?redirectTo=/dashboard')
      } else {
        // If we have the user data available we save it in our
        // ConnectedUser state
        setConnectedUser(dataUser.getUser)
      }
    }
  }, [dataUser, page])
  // Functions
  async function login(input: { email: string; password: string }) {
    try {
      // Executing our LoginMutation passing the email and password
      const { data: dataLogin } = await loginMutation({
        variables: {
          email: input.email,
          password: input.password,
        },
      })
      if (dataLogin) {
        // if the login was success, we save the token in our "at" cookie
        setCookie('at', dataLogin.login.token, { path: '/' })
        return dataLogin.login.token
      }
    } catch (error) {
      // If we have an error we return the error
      return getGraphQlError(error)
    }
  }

  const context = {
    login,
    connectedUser,
  }

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}

export default UserProvider
