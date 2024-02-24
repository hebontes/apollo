export default {
  Query: {
    getUsers: (_: any, args: any, ctx: { models: Imodels }): Iuser[] => ctx.models.User.findAll(),
    getUser: async (_: any, args: { at: string }, ctx: { models: IModels }): Promise<any> => {
      // Get current connected user
      const connectedUser = await getUserData(ctx.at)
      if (connectedUser) {
        // Validating if the user is still valid
        const user = await getUserBy(
          {
            id: connectedUser.id,
            email: connectedUser.email,
            active: connectedUser.active,
          },
          [connectedUser.role],
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
    createUser: (_: any, { input }: { input: ICreateUserInput }, ctx: { models: IModels }): IUser =>
      ctx.models.User.create({ ...input }),
    login: (_: any, { input }: { input: ILoginInput }, ctx: { models: IModels }): Promise<IToken> =>
      doLogin(input.email, input.password, models),
  },
}
