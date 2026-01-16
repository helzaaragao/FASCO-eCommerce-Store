import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config';
import User from './User'

const env = process.env.NODE_ENV as keyof typeof config || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password!,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions
  }
);

export const UserModel = User(sequelize);

const db = {
  sequelize,
  Sequelize,
  DataTypes,
  User:UserModel
};

export default db;