import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Pedido from './Pedido'
import Endereco from './Endereco'
import Hash from '@ioc:Adonis/Core/Hash'

export default class Cliente extends BaseModel {
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
  public password: string



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Pedido, {
    foreignKey: 'id_cliente'
  })
  public pedidos: HasMany<typeof Pedido>

  @manyToMany(() => Endereco)
  public enderecos: ManyToMany<typeof Endereco>

  @beforeSave()
  public static async hashPassword(user: Cliente) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

}
