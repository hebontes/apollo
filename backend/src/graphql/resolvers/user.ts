import { doLogin, getUserBy } from '../../lib/auth'
import { getUserData } from '../../lib/jwt'
import {
  ILoginInput,
  IModels,
  IToken,
  IUser,
  ICreateUserInput,
  User,
} from '../../types'

export default {
  Query: {
    getUsers: (_: any, args: any, ctx: { models: IModels }): IUser[] =>
      ctx.models.User.findAll(),
    getUser: async (
      _: any,
      args: { at: string },
      { models }: { models: IModels }
    ): Promise<any> => {
      // Get current connected user
      const connectedUser: User = await getUserData(args.at)
      if (connectedUser) {
        // Validating if the user is still valid
        const user = await getUserBy(
          {
            id: connectedUser.id,
            email: connectedUser.email,
            active: connectedUser.active,
            role: connectedUser.role,
          },
          models
        )
        if (user) {
          return connectedUser
        }
      }

      return {
        id: '',
        username: '',
        email: '',
        role: '',
        active: false,
        password: '',
      }
    },
  },
  Mutation: {
    createUser: (
      _: any,
      { input }: { input: ICreateUserInput },
      ctx: { models: IModels }
    ): IUser => ctx.models.User.create({ ...input }),
    login: (
      _: any,
      { input }: { input: ILoginInput },
      ctx: { models: IModels }
    ): Promise<IToken> => doLogin(input.email, input.password, ctx.models),
  },
}
