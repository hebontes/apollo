import { encrypt, getBase64, setBase64 } from '@contentpi/lib'
import jwt from 'jsonwebtoken'
import { $security } from '../../config'
import { IUser } from '../types'
const { secretKey } = $security

export function jwtVerify(accessToken: string, cb: any): void {
  // verifying our JWT token using the accessToken and the secret Key
  jwt.verify(
    accessToken,
    secretKey,
    (error: any, accessTokenData: any = {}) => {
      const { data: user } = accessTokenData
      // if we get an error or the user is not found we return false
      if (error || !user) return cb(false)

      // the user data is an base64 and getBase64 will retreive the
      // Information as JSON object
      const userData = getBase64(user)
      return cb(userData)
    }
  )
}

// Get user Data
export async function getUserData(accessToken: string): Promise<any> {
  // we resolve the jwtVerify promise to get the user data
  const UserPromise = new Promise((resolve) =>
    jwtVerify(accessToken, (user: any) => resolve(user))
  )
  // this will get the user data or false (if the user is not connected)
  const user = await UserPromise
  return user
}

export const createToken = async (user: IUser): Promise<string[]> => {
  // Extracting the user data
  const { id, username, password, email, role, active } = user
  // encrypting our password by combining the secretKey and the password
  // and converting it to base64
  const token = setBase64(`${encrypt($security.secretKey)}${password}`)
  // the 'token' is an alias for password in this case
  const userData = {
    id,
    username,
    email,
    role,
    active,
    token,
  }
  // we sign our JWT token and save the data as Base64
  const _createToken = jwt.sign(
    {
      data: setBase64(userData),
    },
    $security.secretKey,
    {
      expiresIn: $security.expiresIn,
    }
  )
  return Promise.all([_createToken])
}
