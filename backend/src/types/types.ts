export type User = {
  username: string
  email: string
  role: string
  password: string
  active: boolean
  id: string
}

export type Sequelize = {
  _defaults?: any
  name?: string
  options?: any
  associate?: any
}
