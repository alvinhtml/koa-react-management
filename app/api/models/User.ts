import { Table, Column, Model } from 'sequelize-typescript';
import mySequelize from './db.ts'

@Table({
  tableName: 'users'
})
class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number

  @Column
  name: string

  @Column
  photo: string

  @Column
  email: string

  @Column
  type: number

  @Column
  state: number

  @Column
  remember_token: string
  //
  // @Column
  // created_at: Date
  //
  // @Column
  // updated_at: Date
}

mySequelize.addModels([User]);

export default User;
