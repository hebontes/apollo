import { NextFunction, Request, Response } from 'express'
import { getUserData } from '../jwt'

export const isConnected =
  (isLogged = true, roles: ['user'], redirectTo = '/') =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await getUserData(req.cookies.at)
    if (!user && !isLogged) {
      return next()
    }
    if (user && isLogged) {
      if (roles.includes('god') && roles.role === 'god') {
        return next()
      }
      if (roles.includes('admin') && roles.role === 'admin') {
        return next()
      }
      if (roles.includes('user') && roles.role === 'user') {
        return next()
      }
      res.redirect(redirectTo)
    } else {
      res.redirect(redirectTo)
    }
  }
