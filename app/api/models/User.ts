import { Table, Column, Model } from 'sequelize-typescript';
import mySequelize from './db.ts'

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'

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
  password: string

  @Column
  state: number

  @Column
  remember_token: string
}

mySequelize.addModels([User]);

export default User;
