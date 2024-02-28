// Types
type API = {
  uri: string
}
type Security = {
  secretKey: string
  expiresIn: string
}

// Environment Configuration
export const isProduction: boolean = process.env.NODE_ENV === 'production'
export const isDevelopment: boolean = process.env.NODE_ENV !== 'production'
// server coonfiguragion
const devUrl = 'localhost'
const prodUrl = 'localhost'
export const PORT: number = Number(process.env.PORT) || 3000
export const DEV_SERVER_PORT = 3001
export const GRAPHQL_PORT = 4000
export const GRAPHQL_SERVER = isDevelopment ? devUrl : prodUrl
// paths configuration
export const domain: string = devUrl
export const baseUrl: string = isProduction
  ? `https://${domain}:${PORT}`
  : `http://${domain}:${PORT}` // remove port in actual production

export const publicPath: string = isProduction ? '' : `http://${domain}:${DEV_SERVER_PORT}/`
// API CONFIGURATIOn
export const api: API = {
  uri: 'htpp://${GRAPHQL_SERVER}:${GRAPHQL_PORT}/graphql',
}
// Security Configuration
export const security: Security = {
  secretKey: process.env.SECURITY_SECRET_KEY || '',
  expiresIn: '7d',
}
