import { encrypt, isPasswordMatch } from '@contentpi/lib'
import { ModuleResolutionKind } from 'typescript'
import { IModels, IToken } from '../types'
import { createToken } from './jwt'

export const getUserBy = async (where: any, models: IModels) => {
  const user = await models.User.findOne({
    where,
    raw: true,
  })
  return user
}

export const doLogin = async (
  email: string,
  password: string,
  models: IModels
): Promise<IToken> => {
  const user = await getUserBy({ email }, models)
  if (!user) {
    throw new Error('Invalid Login')
  }

  const passwordMatch = isPasswordMatch(encrypt(password), user.password)

  const isActive = user.active

  if (!passwordMatch) {
    throw new Error('Invalid Login')
  }
  if (!isActive) {
    throw new Error('User is not active')
  }

  const [token] = await createToken(user)

  return {
    token,
  }
}
