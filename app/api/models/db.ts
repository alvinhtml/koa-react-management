import path from 'path'
import { Sequelize } from 'sequelize-typescript'

const mySequelize = new Sequelize({
  database: 'lumen',
  dialect: 'mysql',
  username:  'root',
  password: '123456'
});

export default mySequelize;
