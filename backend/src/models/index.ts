import { $db } from '../../config'
import { Sequelize } from 'sequelize'
import { IModels } from '../types'
// DB connection
const { dialect, port, host, database, username, password } = $db
// Connecting to the database
const uri = `${dialect}://${username}:${password}@${host}:${port}/${database}`
const sequelize = new Sequelize(uri)
// Models
const models: IModels = {
  User: require('./User').default(sequelize, Sequelize),
  sequelize,
}

export default models
