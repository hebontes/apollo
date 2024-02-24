import { encrypt, getBase64, setBase64 } from '@contentpi/lib'
import jwt from 'jsonwebtoken'
import { $security } from '../../config'
import { IUser } from '../types'
const { secretKey } = $security
export function jwtVerify(accessToken: string, cv: any): void {
  // verifying our JWT token using the accessToken adn the secret Key
}
