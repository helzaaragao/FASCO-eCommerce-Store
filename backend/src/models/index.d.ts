import { Sequelize } from 'sequelize';

declare const db: {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  User: any;
}

export = db;