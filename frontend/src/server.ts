import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import html from './html'
import * as config from '../config'
import { isConnected } from './lib/middlewares/user'
// Express App
const app: Application = express()
const distDir = resolve('dir')
const staticDir = resolve('src', 'static')
// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(config.secuirty.secretKey))
app.use({ credentials: true, origin: true })
// Static dirs
app.use(express.static(staticDir))
app.use(express.static(distDir))
// Routes
app.get('/login', isConnected(false), (req: Request, res: Response) => {
  res.send(html({ title: 'Home', body: 'Welcome to the home page' }))
})
app.get('/logout', (req: Request, res: Response) => {
  const redirect: any = req.query.redirectTo || '/'
  res.clearCookie('at')
  res.redirect(redirect)
})
app.get('*', (req: Request, res: Response) => {
  res.send(html({ title: 'My Website' }))
})
export default app
