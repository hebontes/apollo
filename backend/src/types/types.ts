export type User = {
  username: string
  email: string
  role: string
  password: string
  active: boolean
}

export type Sequelize = {
  _defaults?: any
  name?: string
  options?: any
  associate?: any
}
