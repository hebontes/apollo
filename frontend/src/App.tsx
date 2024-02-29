import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { render } from 'react-dom'
import * as config from './config'
import AppRoutes from './AppRoutes'
const client = new ApolloClient({
  uri: config.api.uri,
  cache: new InMemoryCache(),
})

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ApolloProvider client={client}>
      <AppRoutes />
    </ApolloProvider>
  )
}

export default App
