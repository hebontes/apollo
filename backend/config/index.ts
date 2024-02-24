import dotenv from 'dotenv'
import config from './config.json'
dotenv.config()
type DB = {
  username: string
  password: string
  database: string
  host: string
  dialect: string
  port: string
}
type Security = {
  secretKey: string
  expiresIn: string
}
type Server = {
  port: number
}
const db: DB = {
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || '',
  host: process.env.DB_HOST || '',
  dialect: process.env.DB_DIALECT || '',
  port: process.env.DB_PORT || '',
}
const { security, server } = config

export const $db: DB = db
export const $security: Security = security
export const $server: Server = server
