import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Restaurante from './Restaurante'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public sobrenome: string

  @column()
  public fone: string

  @column()
  public email: string

  @column()
  public login: string

  @column()
  public senha: string

  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @hasMany(() => Restaurante, {
    foreignKey: 'id_usuario'
  })
  public restaurantes: HasMany<typeof Restaurante>
}
